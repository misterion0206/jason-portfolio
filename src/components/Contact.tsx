export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 md:p-12 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          Contact
        </p>
        <h2 className="mt-3 text-3xl font-bold">Let&apos;s Connect</h2>
        <p className="mt-4 max-w-2xl leading-8 text-neutral-600 dark:text-neutral-300">
          I am open to software engineering, backend, full-stack, and cloud-related
          opportunities. Feel free to reach out if you would like to connect,
          collaborate, or discuss a role.
        </p>

        <div className="mt-8 flex flex-col gap-4 text-neutral-700 dark:text-neutral-200">
          <a
            href="mailto:qaz12345tt99@gmail.com"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            qaz12345tt99@gmail.com
          </a>
          <a
            href="https://github.com/misterion0206"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            GitHub
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}