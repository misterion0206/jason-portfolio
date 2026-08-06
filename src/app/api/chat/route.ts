import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam, ToolUnion } from "@anthropic-ai/sdk/resources/messages";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { SYSTEM_PROMPT, LANGUAGE_NAMES } from "../../../lib/chatContext";

export const runtime = "nodejs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

const tools: ToolUnion[] = [
  {
    name: "scroll_to_section",
    description:
      "Scroll the visitor's browser to a specific section of the portfolio page. Use this when it would help to show the visitor something relevant to their question, or when they ask to see a section.",
    input_schema: {
      type: "object",
      properties: {
        section: {
          type: "string",
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
    input_schema: {
      type: "object",
      properties: {
        link: {
          type: "string",
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

  const languageName =
    typeof language === "string" && LANGUAGE_NAMES[language]
      ? LANGUAGE_NAMES[language]
      : LANGUAGE_NAMES.en;
  const system = `${SYSTEM_PROMPT}\n\nAlways respond in ${languageName}, regardless of what language the visitor writes in.`;

  const trimmed = messages.slice(-MAX_MESSAGES) as MessageParam[];

  const stream = anthropic.messages.stream({
    model: "claude-opus-5",
    max_tokens: 1024,
    system,
    output_config: { effort: "low" },
    tools,
    messages: trimmed,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const send = (event: object) => {
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      };

      stream.on("text", (delta) => {
        send({ type: "text", text: delta });
      });

      try {
        const finalMessage = await stream.finalMessage();
        for (const block of finalMessage.content) {
          if (block.type === "tool_use") {
            send({ type: "action", name: block.name, input: block.input });
          }
        }
      } catch (err) {
        send({ type: "error", message: (err as Error).message });
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
  });
}
