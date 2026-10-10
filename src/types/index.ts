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
  /**
   * Curated subset (5-7 items) of `tech` for the homepage card, which has no
   * room for the full stack. Falls back to `tech` when omitted — only set
   * this on projects whose `tech` list is long enough to need trimming.
   */
  highlightTech?: string[];
  github?: string;
  demo?: string;
  /**
   * Read-only admin demo. Intentionally public — these credentials gate a
   * seeded staging account meant for recruiters/visitors to explore, not a
   * secret. Confirmed non-sensitive by the project owner. The UI only
   * reveals them after a visitor clicks to expand (see AdminDemoCredentials),
   * and they are never sent to the chatbot's model.
   */
  adminDemo?: {
    url: string;
    username: string;
    password: string;
  };
  /**
   * Extended engineering case-study content for the project's detail page.
   * Only set for projects with a `slug` — homepage cards never render this.
   */
  caseStudy?: {
    problem: LocalizedText;
    myRole: LocalizedText;
    /** Short, localized bullet points — key engineering decisions and why. */
    decisions: LocalizedText[];
    challenges: LocalizedText;
    testing: LocalizedText;
    results: LocalizedText;
  };
};
