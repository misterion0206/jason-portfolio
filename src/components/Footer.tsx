export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Yu-Chien (Jason) Chen</p>
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
      </div>
    </footer>
  );
}