"use client";

// Plain HTML/CSS diagram (no SVG, no image) so it stays legible to screen
// readers and never breaks on narrow viewports — each tier just wraps.
const TIERS: { label: string; boxes: string[] }[] = [
  { label: "Client Apps", boxes: ["Next.js Storefront", "Next.js Admin"] },
  { label: "API", boxes: ["ASP.NET Core Web API"] },
  {
    label: "Data & Integrations",
    boxes: ["Azure SQL", "Azure Blob Storage", "Stripe", "SignalR"],
  },
];

const DELIVERY: { label: string; boxes: string[] }[] = [
  { label: "CI/CD", boxes: ["GitHub Actions"] },
  { label: "Hosting", boxes: ["Azure App Service", "Vercel"] },
];

function Box({ children }: { children: string }) {
  return (
    <span className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
      {children}
    </span>
  );
}

function Tier({ label, boxes }: { label: string; boxes: string[] }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <div className="flex flex-wrap justify-center gap-3">
        {boxes.map((box) => (
          <Box key={box}>{box}</Box>
        ))}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="text-xl leading-none text-neutral-400 dark:text-neutral-600">
      ↓
    </div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <figure
      role="img"
      aria-label="Next.js Storefront and Next.js Admin both call the ASP.NET Core Web API, which talks to Azure SQL, Azure Blob Storage, Stripe, and SignalR. Separately, GitHub Actions deploys the API to Azure App Service and the storefront/admin apps to Vercel."
      className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50"
    >
      <div className="flex flex-col items-center gap-3">
        {TIERS.map((tier, i) => (
          <div key={tier.label} className="flex flex-col items-center gap-3">
            {i > 0 && <Connector />}
            <Tier label={tier.label} boxes={tier.boxes} />
          </div>
        ))}
      </div>

      <div className="my-6 border-t border-dashed border-neutral-300 dark:border-neutral-700" />

      <div className="flex flex-col items-center gap-3">
        {DELIVERY.map((tier, i) => (
          <div key={tier.label} className="flex flex-col items-center gap-3">
            {i > 0 && <Connector />}
            <Tier label={tier.label} boxes={tier.boxes} />
          </div>
        ))}
      </div>
    </figure>
  );
}
