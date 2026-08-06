"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";
import { RESUME_HREF } from "../data/resume";
import { projects } from "../data/projects";

type Message = { role: "user" | "assistant"; content: string };

const ecommerceProject = projects.find((p) => p.title === "Ecommerce Platform");

const LINKS: Record<string, string | undefined> = {
  resume: RESUME_HREF,
  github: "https://github.com/misterion0206",
  live_demo: ecommerceProject?.demo,
  admin_demo: ecommerceProject?.adminDemo?.url,
};

function runAction(name: string, input: unknown) {
  if (name === "scroll_to_section") {
    const section = (input as { section?: string })?.section;
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else if (name === "open_link") {
    const link = (input as { link?: string })?.link;
    const url = link ? LINKS[link] : undefined;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={2} />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const { locale } = useLanguage();
  const t = uiText[locale].chat;

  const SEND_COOLDOWN_MS = 3000;

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggle() {
    setOpen((v) => !v);
    setHasOpened(true);
  }

  async function sendMessage(e?: React.FormEvent, presetText?: string) {
    e?.preventDefault();
    const text = (presetText ?? input).trim();
    if (!text || loading || cooldown) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    setCooldown(true);
    setTimeout(() => setCooldown(false), SEND_COOLDOWN_MS);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, language: locale }),
      });

      if (res.status === 429) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: t.rateLimited };
          return updated;
        });
        return;
      }

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as
            | { type: "text"; text: string }
            | { type: "action"; name: string; input: unknown }
            | { type: "error"; message: string };

          if (event.type === "text") {
            assistantText += event.text;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: assistantText };
              return updated;
            });
            listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
          } else if (event.type === "action") {
            runAction(event.name, event.input);
          }
        }
      }

      if (!assistantText) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: t.done };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: t.genericError };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-white dark:border-neutral-800">
              <span className="text-sm font-semibold">{t.title}</span>
              <div className="flex items-center gap-1">
                {mounted && (
                  <button
                    type="button"
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    aria-label="Toggle light/dark mode"
                    className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.emptyState}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendMessage(undefined, s)}
                        disabled={loading || cooldown}
                        className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs text-neutral-600 transition hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    m.role === "user"
                      ? "ml-auto bg-neutral-900 text-white dark:bg-white dark:text-black"
                      : "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100"
                  }`}
                >
                  {m.content || "…"}
                </div>
              ))}
            </div>

            <form
              onSubmit={sendMessage}
              className="flex gap-2 border-t border-neutral-200 p-3 dark:border-neutral-800"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                disabled={loading || cooldown}
                maxLength={2000}
                className="flex-1 rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-neutral-700"
              />
              <button
                type="submit"
                disabled={loading || cooldown || !input.trim()}
                className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-40"
              >
                {t.send}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/30 transition-shadow hover:shadow-xl hover:shadow-blue-600/40"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {!open && !hasOpened && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-amber-400" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
