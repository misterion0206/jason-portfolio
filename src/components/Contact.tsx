"use client";

import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";
import { RESUME_HREF, RESUME_DOWNLOAD_NAME } from "../data/resume";
import { contactLinks, profile } from "../data/profile";

export default function Contact() {
  const { locale } = useLanguage();
  const t = uiText[locale].contact;

  // Label/value pairs come from the central profile module so the email and
  // phone are never written down in a component.
  const details = [
    { key: "email", label: t.email, value: profile.email, href: contactLinks.email },
    { key: "phone", label: t.phone, value: profile.phoneDisplay, href: contactLinks.phone },
    {
      key: "linkedin",
      label: t.linkedin,
      value: profile.linkedinDisplay,
      href: contactLinks.linkedin,
      external: true,
    },
    {
      key: "github",
      label: t.github,
      value: profile.githubDisplay,
      href: contactLinks.github,
      external: true,
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 md:p-12 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {t.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold">{t.heading}</h2>
        <p className="mt-4 max-w-2xl leading-8 text-neutral-600 dark:text-neutral-300">
          {t.description}
        </p>

        <div className="mt-8 flex flex-col gap-4 text-neutral-700 dark:text-neutral-200">
          {details.map((detail) => (
            <a
              key={detail.key}
              href={detail.href}
              {...(detail.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex flex-col gap-0.5 transition hover:text-blue-600 sm:flex-row sm:items-baseline sm:gap-3 dark:hover:text-blue-400"
            >
              <span className="w-24 shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
                {detail.label}
              </span>
              <span className="break-all">{detail.value}</span>
            </a>
          ))}

          <a
            href={RESUME_HREF}
            download={RESUME_DOWNLOAD_NAME}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col gap-0.5 transition hover:text-blue-600 sm:flex-row sm:items-baseline sm:gap-3 dark:hover:text-blue-400"
          >
            <span className="w-24 shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
              {t.resume}
            </span>
            <span>{`${profile.siteDisplay}/resume.pdf`}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
