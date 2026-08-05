"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required to avoid SSR/client theme hydration mismatch
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-[124px]" />;
  }

  return (
    <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-100 p-1 text-sm dark:border-neutral-800 dark:bg-neutral-900">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setTheme(option.value)}
          aria-pressed={theme === option.value}
          className={`rounded-full px-3 py-1 transition ${
            theme === option.value
              ? "bg-white text-black shadow dark:bg-neutral-700 dark:text-white"
              : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
