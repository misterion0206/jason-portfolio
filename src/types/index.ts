export type SkillCategory = {
  title: string;
  items: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  highlights: string[];
};

export type ProjectItem = {
  title: string;
  period: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  adminDemo?: {
    url: string;
    username: string;
    password: string;
  };
};