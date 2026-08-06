"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { locale } = useLanguage();
  const t = uiText[locale].nav;

  const navItems = [
    { label: t.about, href: "#about" },
    { label: t.skills, href: "#skills" },
    { label: t.experience, href: "#experience" },
    { label: t.projects, href: "#projects" },
    { label: t.contact, href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/85">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-semibold tracking-tight">
          Jason Chen
        </a>

        <div className="flex items-center gap-4">
          <div className="hidden gap-6 text-sm text-neutral-600 md:flex dark:text-neutral-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-neutral-900 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <LanguageToggle />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:text-neutral-900 md:hidden dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-neutral-200 px-6 py-4 md:hidden dark:border-neutral-800">
          <div className="flex flex-col gap-4 text-sm text-neutral-600 dark:text-neutral-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="transition hover:text-neutral-900 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
