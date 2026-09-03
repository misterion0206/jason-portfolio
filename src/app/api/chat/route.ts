import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import type { Content, FunctionDeclaration } from "@google/genai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { SYSTEM_PROMPT, LANGUAGE_NAMES } from "../../../lib/chatContext";

export const runtime = "nodejs";

// Fixed to a Gemini API free-tier model. Do not fall back to a paid model.
// (gemini-2.5-flash-lite is no longer served to new API keys; gemini-3.5-flash-lite
// is its official free-tier successor.)
const GEMINI_MODEL = "gemini-3.5-flash-lite";

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  }),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  prefix: "chatwidget",
});

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 2000;

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;

  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return false;
}

function isValidMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= MAX_MESSAGE_LENGTH
    )
  );
}

// Gemini function declarations. Text generation + function calling only — no
// Search/Maps grounding, code execution, image generation, or other paid tools.
const functionDeclarations: FunctionDeclaration[] = [
  {
    name: "scroll_to_section",
    description:
      "Scroll the visitor's browser to a specific section of the portfolio page. Use this when it would help to show the visitor something relevant to their question, or when they ask to see a section.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        section: {
          type: Type.STRING,
          enum: ["about", "skills", "experience", "projects", "contact"],
          description: "Which section of the page to scroll to.",
        },
      },
      required: ["section"],
    },
  },
  {
    name: "open_link",
    description:
      "Open a specific link in a new tab for the visitor. Use this when they ask to view, see, or download the resume, GitHub profile, or a project demo.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        link: {
          type: Type.STRING,
          enum: ["resume", "github", "live_demo", "admin_demo"],
          description: "Which link to open.",
        },
      },
      required: ["link"],
    },
  },
];

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return new Response("Forbidden", { status: 403 });
  }

  const { success, reset } = await ratelimit.limit(getClientIp(req));
  if (!success) {
    const retryAfterSec = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return new Response("Too many requests. Please try again later.", {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec) },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { messages, language } = body as { messages?: unknown; language?: unknown };
  if (!isValidMessages(messages)) {
    return new Response("Invalid messages", { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Log server-side only — never expose configuration details to the browser.
    console.error("[chat] GEMINI_API_KEY is not configured");
    return new Response("Server misconfiguration", { status: 500 });
  }

  const languageName =
    typeof language === "string" && LANGUAGE_NAMES[language]
      ? LANGUAGE_NAMES[language]
      : LANGUAGE_NAMES.en;
  const systemInstruction = `${SYSTEM_PROMPT}\n\nAlways respond in ${languageName}, regardless of what language the visitor writes in.`;

  // Only send the most recent messages, mapping client roles to Gemini roles
  // (user -> user, assistant -> model).
  const contents: Content[] = messages.slice(-MAX_MESSAGES).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const ai = new GoogleGenAI({ apiKey });
  const abortController = new AbortController();

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const send = (event: object) => {
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      };

      try {
        const stream = await ai.models.generateContentStream({
          model: GEMINI_MODEL,
          contents,
          config: {
            systemInstruction,
            maxOutputTokens: 1024,
            // Keep reasoning cost minimal — this chatbot only needs text + function
            // calling. (Gemini 3.x rejects thinkingBudget: 0; LOW is the floor that
            // still reliably follows the "reply with text when calling a tool" rule.)
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            tools: [{ functionDeclarations }],
            abortSignal: abortController.signal,
          },
        });

        const actions: { name: string; input: unknown }[] = [];

        for await (const chunk of stream) {
          const text = chunk.text;
          if (text) send({ type: "text", text });

          for (const call of chunk.functionCalls ?? []) {
            if (call.name) actions.push({ name: call.name, input: call.args ?? {} });
          }
        }

        for (const action of actions) {
          send({ type: "action", name: action.name, input: action.input });
        }
      } catch (err) {
        console.error("[chat] Gemini request failed:", err);
        send({ type: "error", message: "The assistant is unavailable right now." });
      } finally {
        controller.close();
      }
    },
    cancel() {
      abortController.abort();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
  });
}
