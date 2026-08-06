"use client";

import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";

export default function About() {
  const { locale } = useLanguage();
  const t = uiText[locale].about;

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold">{t.heading}</h2>
        </div>

        <div className="space-y-6 leading-8 text-neutral-600 dark:text-neutral-300">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </div>
      </div>
    </section>
  );
}
