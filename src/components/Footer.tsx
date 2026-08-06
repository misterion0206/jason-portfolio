"use client";

import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";

export default function Footer() {
  const { locale } = useLanguage();
  const t = uiText[locale].footer;

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Yu-Chien (Jason) Chen</p>
        <p>{t.builtWith}</p>
      </div>
    </footer>
  );
}
