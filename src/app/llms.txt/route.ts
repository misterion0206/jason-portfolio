import { experiences } from "../../data/experience";
import { projects } from "../../data/projects";
import { skillCategories } from "../../data/skills";

const siteUrl = "https://www.jasonchen.website";

export const dynamic = "force-static";

function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push("# Yu-Chien (Jason) Chen");
  lines.push("");
  lines.push(
    "> Software engineer focused on backend, cloud, and enterprise systems. This file summarizes the portfolio at " +
      siteUrl +
      " for language models and AI assistants.",
  );
  lines.push("");
  lines.push(
    "I build scalable systems end to end — from enterprise backends with ASP.NET Core, Angular, SQL Server, and Azure DevOps, to full-stack products with Next.js and React. I am currently pursuing an M.S. in Computer Science at Stevens Institute of Technology and am open to software engineering, backend, full-stack, and cloud-related opportunities.",
  );
  lines.push("");

  lines.push("## Profile");
  lines.push("- Name: Yu-Chien (Jason) Chen");
  lines.push("- Role: Software Engineer");
  lines.push("- Email: qaz12345tt99@gmail.com");
  lines.push("- GitHub: https://github.com/misterion0206");
  lines.push(`- Resume (PDF): ${siteUrl}/resume.pdf`);
  lines.push(`- Website: ${siteUrl}`);
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
      project.demo ? `Demo: ${project.demo}` : null,
      project.github ? `GitHub: ${project.github}` : null,
    ]
      .filter(Boolean)
      .join(" | ");
    lines.push(
      `- ${project.title} (${project.tech.join(", ")}): ${project.description.en}${links ? ` — ${links}` : ""}`,
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
