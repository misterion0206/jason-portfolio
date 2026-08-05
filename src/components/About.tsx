export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            About
          </p>
          <h2 className="mt-3 text-3xl font-bold">Professional Summary</h2>
        </div>

        <div className="space-y-6 leading-8 text-neutral-600 dark:text-neutral-300">
          <p>
            I am a software engineer with experience building enterprise systems,
            ERP features, internal portals, and cloud-based business applications.
            My background combines backend development, system integration, and
            practical delivery for real business environments.
          </p>

          <p>
            I previously worked on ASP.NET Core, Angular, SQL Server, and Azure
            DevOps projects, including procurement systems, ERP modernization, and
            internal information platforms. I enjoy building maintainable systems
            that connect engineering execution with business value.
          </p>

          <p>
            I am currently pursuing an M.S. in Computer Science at Stevens Institute
            of Technology, where I am continuing to strengthen my skills in software
            engineering, web development, and data-driven applications.
          </p>
        </div>
      </div>
    </section>
  );
}