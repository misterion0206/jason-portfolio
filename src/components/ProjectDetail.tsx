"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";
import type { ProjectItem } from "../types";

const TECH_GROUPS: Record<"frontend" | "backend" | "realtime" | "payments", string[]> = {
  frontend: ["Next.js", "React"],
  backend: ["ASP.NET Core", ".NET", "SQL Server", "Azure Blob Storage"],
  realtime: ["SignalR"],
  payments: ["Stripe"],
};

export default function ProjectDetail({ project }: { project: ProjectItem }) {
  const { locale } = useLanguage();
  const t = uiText[locale].projectDetail;
  const pt = uiText[locale].projects;

  const groupedTech = (
    [
      ["frontend", t.frontend],
      ["backend", t.backend],
      ["realtime", t.realtime],
      ["payments", t.payments],
    ] as const
  )
    .map(([key, label]) => ({
      label,
      items: project.tech.filter((tech) => TECH_GROUPS[key].includes(tech)),
    }))
    .filter((group) => group.items.length > 0);

  const groupedItems = groupedTech.flatMap((group) => group.items);
  const otherTech = project.tech.filter((tech) => !groupedItems.includes(tech));

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/85">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/#projects"
            className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            {t.backToProjects}
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <span className="whitespace-nowrap text-sm text-neutral-500">{project.period}</span>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {t.overview}
          </h2>
          <p className="mt-3 leading-8 text-neutral-600 dark:text-neutral-300">
            {project.description[locale]}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {t.keyFeatures}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-neutral-600 dark:text-neutral-300">
            {t.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {t.techStack}
          </h2>
          <div className="mt-3 space-y-3">
            {groupedTech.map((group) => (
              <p key={group.label} className="text-neutral-600 dark:text-neutral-300">
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {group.label}:{" "}
                </span>
                {group.items.join(", ")}
              </p>
            ))}
            {otherTech.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {otherTech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {(project.github || project.demo || project.adminDemo) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {pt.viewGithub}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {pt.liveDemo}
              </a>
            )}
            {project.adminDemo && (
              <a
                href={project.adminDemo.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {pt.adminDemo}
              </a>
            )}
          </div>
        )}

        {project.adminDemo && (
          <div className="mt-4 max-w-sm rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
            <span className="font-semibold text-neutral-700 dark:text-neutral-200">
              {pt.readOnlyDemo}
            </span>{" "}
            <code>{project.adminDemo.username}</code> / <code>{project.adminDemo.password}</code>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
