"use client";

import { motion } from "framer-motion";
import GithubStats from "./GithubStats";
import Avatar from "./Avatar";
import { RESUME_HREF, RESUME_DOWNLOAD_NAME } from "../data/resume";

export default function Hero() {
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
            Software Engineer · Full-Stack · Cloud
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Yu-Chien (Jason) Chen
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-600 sm:text-xl dark:text-neutral-300">
            I build scalable systems end to end — from enterprise backends with
            ASP.NET Core, Angular, SQL Server, and Azure DevOps, to full-stack
            products with Next.js and React. My focus is practical software
            that ships, scales, and improves how a business actually runs.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-2xl bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              View Projects
            </a>

            <a
              href={RESUME_HREF}
              download={RESUME_DOWNLOAD_NAME}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-neutral-300 px-6 py-3 font-medium text-neutral-900 transition hover:border-neutral-500 dark:border-neutral-700 dark:text-white dark:hover:border-neutral-400"
            >
              Download Resume
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-800">
              Next.js
            </span>
            <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-800">
              React
            </span>
            <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-800">
              ASP.NET Core
            </span>
            <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-800">
              Angular
            </span>
            <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-800">
              Azure DevOps
            </span>
            <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-800">
              SQL Server
            </span>
          </div>

          <GithubStats />
        </div>
      </motion.div>
    </section>
  );
}
