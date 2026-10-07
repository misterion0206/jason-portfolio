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
   * Admin demo link only. Credentials are deliberately NOT part of this type —
   * this repository is public, so anything stored here is published. Access is
   * arranged on request instead.
   */
  adminDemo?: {
    url: string;
  };
};
