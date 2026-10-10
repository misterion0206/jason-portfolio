"use client";

import { useLanguage } from "./LanguageProvider";
import { uiText } from "../i18n/ui";
import { profile } from "../data/profile";

// Figures must trace to data already stated in experience.ts/profile.ts — see
// the Digihua Intelligent Systems bullets for the client counts. Replaced the
// old live GitHub activity widget (commit count, last-active time) because
// those numbers don't signal anything about professional experience.
const ENTERPRISE_CLIENTS = "5+";
const CLIENTS_SUPPORTED = "15+";

export default function CareerStats() {
  const { locale } = useLanguage();
  const t = uiText[locale].hero;

  const items = [
    { value: profile.yearsOfExperience, label: t.statsYears },
    { value: ENTERPRISE_CLIENTS, label: t.statsEnterpriseClients },
    { value: CLIENTS_SUPPORTED, label: t.statsClientsSupported },
  ];

  return (
    <div className="mt-10 grid grid-cols-3 gap-4 sm:max-w-md">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-neutral-200 px-4 py-3 text-center dark:border-neutral-800"
        >
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
