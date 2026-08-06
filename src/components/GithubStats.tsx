"use client";

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "misterion0206";

type Stats = {
  memberSince: number;
  recentCommits: number;
  lastActiveLabel: string;
  isRecentlyActive: boolean;
};

type GithubEvent = {
  type: string;
  created_at: string;
  repo?: { name: string };
  payload?: { before?: string; head?: string };
};

function relativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function GithubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
          ),
        ]);

        if (!userRes.ok || !eventsRes.ok) throw new Error("request failed");

        const user = await userRes.json();
        const events: GithubEvent[] = await eventsRes.json();

        const pushEvents = events
          .filter(
            (e) =>
              e.type === "PushEvent" &&
              e.repo?.name &&
              e.payload?.before &&
              e.payload?.head
          )
          .slice(0, 15);

        const commitCounts = await Promise.all(
          pushEvents.map(async (e) => {
            try {
              const res = await fetch(
                `https://api.github.com/repos/${e.repo!.name}/compare/${e.payload!.before}...${e.payload!.head}`
              );
              if (!res.ok) return 0;
              const data = await res.json();
              return typeof data.total_commits === "number"
                ? data.total_commits
                : 0;
            } catch {
              return 0;
            }
          })
        );
        const recentCommits = commitCounts.reduce((sum, n) => sum + n, 0);

        const lastEventDate = events[0]
          ? new Date(events[0].created_at)
          : null;

        if (!cancelled) {
          setStats({
            memberSince: new Date(user.created_at).getFullYear(),
            recentCommits,
            lastActiveLabel: lastEventDate
              ? relativeTime(lastEventDate)
              : "—",
            isRecentlyActive: lastEventDate
              ? Date.now() - lastEventDate.getTime() < 24 * 60 * 60 * 1000
              : false,
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
    {
      label: "Status",
      value: stats.isRecentlyActive ? "Active" : stats.lastActiveLabel,
      dot: stats.isRecentlyActive,
    },
    { label: "Recent Commits", value: stats.recentCommits },
    { label: "On GitHub Since", value: stats.memberSince },
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
          <div className="flex items-center justify-center gap-1.5 text-2xl font-bold">
            {item.dot && (
              <span className="h-2 w-2 rounded-full bg-green-500" />
            )}
            {item.value}
          </div>
          <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {item.label}
          </div>
        </a>
      ))}
    </div>
  );
}
