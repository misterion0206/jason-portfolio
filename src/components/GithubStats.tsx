"use client";

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "misterion0206";

type Stats = {
  publicRepos: number;
  followers: number;
  totalStars: number;
};

export default function GithubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("request failed");

        const user = await userRes.json();
        const repos = await reposRes.json();
        const totalStars = Array.isArray(repos)
          ? repos.reduce(
              (sum: number, repo: { stargazers_count?: number }) =>
                sum + (repo.stargazers_count ?? 0),
              0
            )
          : 0;

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos ?? 0,
            followers: user.followers ?? 0,
            totalStars,
          });
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed || !stats) return null;

  const items = [
    { label: "Public Repos", value: stats.publicRepos },
    { label: "Followers", value: stats.followers },
    { label: "Total Stars", value: stats.totalStars },
  ];

  return (
    <div className="mt-10 grid grid-cols-3 gap-4 sm:max-w-md">
      {items.map((item) => (
        <a
          key={item.label}
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-neutral-200 px-4 py-3 text-center transition hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {item.label}
          </div>
        </a>
      ))}
    </div>
  );
}
