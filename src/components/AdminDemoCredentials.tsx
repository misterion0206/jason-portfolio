"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";

// The read-only admin demo login is intentionally public, but it should only
// render after a visitor asks for it — not sit in the page's initial HTML,
// where it would also get indexed and picked up by scrapers by default.
export default function AdminDemoCredentials({
  username,
  password,
  className = "",
}: {
  username: string;
  password: string;
  className?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const { locale } = useLanguage();
  const t = uiText[locale].projects;

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className={`text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 ${className}`}
      >
        {t.showDemoCredentials}
      </button>
    );
  }

  return (
    <div
      className={`rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 ${className}`}
    >
      <span className="font-semibold text-neutral-700 dark:text-neutral-200">{t.readOnlyDemo}</span>{" "}
      <code>{username}</code> / <code>{password}</code>
    </div>
  );
}
