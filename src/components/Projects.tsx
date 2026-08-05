import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        Projects
      </p>
      <h2 className="mt-3 text-3xl font-bold">Featured Work</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex h-full flex-col rounded-3xl border border-neutral-800 bg-neutral-900 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <span className="text-sm whitespace-nowrap text-neutral-500">
                {project.period}
              </span>
            </div>

            <p className="mt-4 flex-1 leading-7 text-neutral-300">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {(project.github || project.demo) && (
              <div className="mt-6 flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                  >
                    View on GitHub →
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}