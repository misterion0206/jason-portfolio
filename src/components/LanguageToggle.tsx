"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { localeNames } from "../i18n/ui";
import type { Locale } from "../types";

const LOCALES: Locale[] = ["en", "zh", "es"];

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
          <path
            d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
            stroke="currentColor"
            strokeWidth={2}
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                l === locale ? "font-semibold text-blue-600 dark:text-blue-400" : "text-neutral-700 dark:text-neutral-300"
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
