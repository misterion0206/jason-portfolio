export type Locale = "en" | "zh" | "es";

export type LocalizedText = Record<Locale, string>;

export type SkillCategory = {
  title: LocalizedText;
  items: string[];
};

export type ExperienceItem = {
  company: string;
  role: LocalizedText;
  period: string;
  location: LocalizedText;
  stack: string[];
  highlights: LocalizedText[];
};

export type ProjectItem = {
  /** Stable identifier used for lookups; `title` is display copy and may change. */
  id: string;
  title: string;
  slug?: string;
  period: string;
  description: LocalizedText;
  tech: string[];
  github?: string;
  demo?: string;
  /**
   * Read-only admin demo. Intentionally public — these credentials gate a
   * seeded staging account meant for recruiters/visitors to explore, not a
   * secret. Confirmed non-sensitive by the project owner.
   */
  adminDemo?: {
    url: string;
    username: string;
    password: string;
  };
};
