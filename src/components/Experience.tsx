"use client";

import { experiences } from "../data/experience";
import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";

export default function Experience() {
  const { locale } = useLanguage();
  const t = uiText[locale].experience;

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
        {t.eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold">{t.heading}</h2>

      <div className="mt-10 space-y-8">
        {experiences.map((job) => (
          <div
            key={job.company}
            className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold">{job.role[locale]}</h3>
                <p className="mt-1 text-lg text-neutral-600 dark:text-neutral-300">{job.company}</p>
                <p className="mt-1 text-sm text-neutral-500">{job.location[locale]}</p>
              </div>

              <p className="text-sm text-neutral-500 dark:text-neutral-400">{job.period}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <ul className="mt-6 space-y-3 text-neutral-600 dark:text-neutral-300">
              {job.highlights.map((highlight) => (
                <li key={highlight.en} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-blue-400" />
                  <span className="flex-1 leading-7">{highlight[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
