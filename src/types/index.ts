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
  title: string;
  period: string;
  description: LocalizedText;
  tech: string[];
  github?: string;
  demo?: string;
  adminDemo?: {
    url: string;
    username: string;
    password: string;
  };
};
