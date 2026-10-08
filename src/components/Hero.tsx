"use client";

import { motion } from "framer-motion";
import GithubStats from "./GithubStats";
import Avatar from "./Avatar";
import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";
import { RESUME_HREF, RESUME_DOWNLOAD_NAME } from "../data/resume";
import { profile } from "../data/profile";

// Lead with the .NET stack so the first impression matches the resume's
// ".NET Full-Stack Software Engineer" positioning.
const HERO_TAGS = [
  "C#",
  ".NET",
  "ASP.NET Core",
  "React",
  "Next.js",
  "Angular",
  "SQL Server",
  "Azure",
];

export default function Hero() {
  const { locale } = useLanguage();
  const t = uiText[locale].hero;

  return (
    <section className="mx-auto flex min-h-[88vh] max-w-6xl items-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex max-w-4xl flex-col items-start gap-8 sm:flex-row sm:items-center"
      >
        <Avatar />

        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {t.eyebrow}
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">{profile.fullName}</h1>

          <p className="mt-6 text-lg leading-8 text-neutral-600 sm:text-xl dark:text-neutral-300">
            {t.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-2xl bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              {t.viewProjects}
            </a>

            <a
              href={RESUME_HREF}
              download={RESUME_DOWNLOAD_NAME}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-neutral-300 px-6 py-3 font-medium text-neutral-900 transition hover:border-neutral-500 dark:border-neutral-700 dark:text-white dark:hover:border-neutral-400"
            >
              {t.downloadResume}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            {HERO_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <GithubStats />
        </div>
      </motion.div>
    </section>
  );
}
