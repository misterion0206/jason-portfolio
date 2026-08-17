import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "../../../data/projects";
import ProjectDetail from "../../../components/ProjectDetail";

const siteUrl = "https://www.jasonchen.website";

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects
    .filter((project) => project.slug)
    .map((project) => ({ slug: project.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  const title = `${project.title} | Yu-Chien (Jason) Chen`;
  const description = project.description.en;
  const url = `${siteUrl}/projects/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description.en,
    url: `${siteUrl}/projects/${slug}`,
    keywords: project.tech.join(", "),
    author: { "@type": "Person", name: "Yu-Chien (Jason) Chen", url: siteUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetail project={project} />
    </>
  );
}
