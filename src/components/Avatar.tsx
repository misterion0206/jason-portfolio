"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Avatar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required to avoid SSR/client theme hydration mismatch
    setMounted(true);
  }, []);

  const src =
    mounted && resolvedTheme === "dark"
      ? "/avatar-dark.jpg"
      : "/avatar-light.jpg";

  return (
    <div className="h-40 w-40 shrink-0 overflow-hidden rounded-full border border-neutral-200 sm:h-48 sm:w-48 dark:border-neutral-800">
      <Image
        src={src}
        alt="Yu-Chien (Jason) Chen"
        width={192}
        height={192}
        priority
        className="h-full w-full object-cover"
      />
    </div>
  );
}
