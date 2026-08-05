import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/85">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-semibold tracking-tight">
          Jason Chen
        </a>

        <div className="flex items-center gap-6">
          <div className="hidden gap-6 text-sm text-neutral-600 md:flex dark:text-neutral-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-neutral-900 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}