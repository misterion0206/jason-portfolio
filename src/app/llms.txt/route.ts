import { experiences } from "../../data/experience";
import { projects } from "../../data/projects";
import { skillCategories } from "../../data/skills";
import { education, professionalSummary, profile } from "../../data/profile";

const siteUrl = profile.siteUrl;

export const dynamic = "force-static";

function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${profile.fullName}`);
  lines.push("");
  lines.push(
    `> ${profile.title} focused on C#, ASP.NET Core, React/Next.js, SQL Server, and Azure. ` +
      `This file summarizes the portfolio at ${siteUrl} for language models and AI assistants.`,
  );
  lines.push("");
  lines.push(professionalSummary);
  lines.push("");
  lines.push(
    "Open to .NET software engineer, application developer, full-stack developer, software engineer II, and backend/cloud engineer roles in the United States.",
  );
  lines.push("");

  lines.push("## Profile");
  lines.push(`- Name: ${profile.fullName}`);
  lines.push(`- Title: ${profile.title}`);
  lines.push(`- Location: ${profile.location}`);
  lines.push(`- Email: ${profile.email}`);
  lines.push(`- Phone: ${profile.phone}`);
  lines.push(`- Website: ${siteUrl}`);
  lines.push(`- LinkedIn: ${profile.linkedinUrl}`);
  lines.push(`- GitHub: ${profile.githubUrl}`);
  lines.push(`- Resume (PDF): ${siteUrl}/resume.pdf`);
  lines.push("");

  lines.push("## Education");
  for (const item of education) {
    lines.push(`- ${item.degree}, ${item.school}, ${item.location} (completed ${item.graduation})`);
  }
  lines.push("");

  lines.push("## Skills");
  for (const category of skillCategories) {
    lines.push(`- ${category.title.en}: ${category.items.join(", ")}`);
  }
  lines.push("");

  lines.push("## Experience");
  for (const experience of experiences) {
    lines.push(
      `- ${experience.company} — ${experience.role.en} (${experience.period}), ${experience.location.en}`,
    );
    for (const highlight of experience.highlights) {
      lines.push(`  - ${highlight.en}`);
    }
  }
  lines.push("");

  lines.push("## Projects");
  for (const project of projects) {
    const links = [
      project.slug ? `Case study: ${siteUrl}/projects/${project.slug}` : null,
      project.demo ? `Demo: ${project.demo}` : null,
      project.github ? `GitHub: ${project.github}` : null,
    ]
      .filter(Boolean)
      .join(" | ");
    lines.push(
      `- ${project.title} (${project.period}) [${project.tech.join(", ")}]: ${project.description.en}${links ? ` — ${links}` : ""}`,
    );
  }
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
