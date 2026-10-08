/**
 * Single source of truth for profile, contact, and education facts.
 *
 * Everything here is rendered in the UI, the resume PDF source, llms.txt, the
 * JSON-LD block, and the AI chatbot's system prompt. Change a value once here
 * and every surface follows — in particular, `profile.email` is the only place
 * the contact address is written down.
 */

export const profile = {
  // Name
  fullName: "Yu-Chien (Jason) Chen",
  legalName: "Yu-Chien Chen",
  preferredName: "Jason",

  // Positioning
  title: ".NET Full-Stack Software Engineer",
  titleUpper: ".NET FULL-STACK SOFTWARE ENGINEER",
  yearsOfExperience: "3+",

  // Contact — replace `email` here and every surface updates.
  email: "yuchien26.chen@gmail.com",
  phone: "+1 734-210-9691",
  phoneDisplay: "734-210-9691",
  phoneE164: "+17342109691",
  location: "Jersey City, NJ",

  // Links. `*Display` values are the short, human-readable forms printed on
  // the resume and in the UI; the full URLs are what we actually link to.
  siteUrl: "https://www.jasonchen.website",
  siteDisplay: "jasonchen.website",
  linkedinUrl: "https://www.linkedin.com/in/yu-chien-chen-99a013329/",
  linkedinDisplay: "linkedin.com/in/yu-chien-chen-99a013329",
  githubUrl: "https://github.com/misterion0206",
  githubDisplay: "github.com/misterion0206",
} as const;

export type EducationItem = {
  school: string;
  location: string;
  degree: string;
  graduation: string;
};

export const education: EducationItem[] = [
  {
    school: "Stevens Institute of Technology",
    location: "Hoboken, NJ",
    degree: "M.S. in Computer Science",
    graduation: "May 2026",
  },
  {
    school: "National Chung Cheng University",
    location: "Chiayi, Taiwan",
    degree: "B.S. in Mathematics",
    graduation: "May 2019",
  },
];

/** Graduate degree, used for copy that mentions the completed M.S. */
export const graduateDegree = education[0];

/**
 * Professional summary used on the resume and as the chatbot's "About" blurb.
 * Kept in one place so the PDF and the AI assistant can never drift apart.
 */
export const professionalSummary =
  "Full-stack software engineer with 3+ years of experience delivering enterprise and cloud applications with C#, ASP.NET Core, Angular/React, SQL Server, and Azure. Led a five-person engineering team, deployed ERP/APS solutions for enterprise clients, and built production-ready web applications with CI/CD and end-to-end testing.";

export const contactLinks = {
  email: `mailto:${profile.email}`,
  phone: `tel:${profile.phoneE164}`,
  linkedin: profile.linkedinUrl,
  github: profile.githubUrl,
} as const;
