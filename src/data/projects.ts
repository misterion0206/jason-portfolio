import type { ProjectItem } from "../types";

export const projects: ProjectItem[] = [
  {
    title: "Full-Stack Web Application",
    period: "Dec 2025",
    description:
      "Developed a full-stack web application with authentication, session management, and RESTful APIs in a collaborative team setting.",
    tech: ["Node.js", "Express", "MongoDB", "Handlebars", "Git", "GitHub"],
    github: "https://github.com/nickkogut/CS546-Group24-Project",
  },
  {
    title: "Procurement Notification System",
    period: "Professional Project",
    description:
      "Built a cloud-based procurement notification platform for enterprise use, with backend workflows, status tracking, and delivery coordination.",
    tech: ["ASP.NET Core MVC", "SQL Server", "Azure DevOps"],
  },
  {
    title: "Enterprise ERP Modernization",
    period: "Professional Project",
    description:
      "Enhanced a large ERP platform with multilingual support, performance optimization, and improved user accessibility.",
    tech: ["Angular", "ASP.NET Core", "Microsoft SQL Server"],
  },
  {
    title: "Ecommerce Platform",
    period: "Personal Project",
    description:
      "A full-stack e-commerce platform with a canvas-based product customization studio, shopping cart, Stripe checkout, membership system, and an operations admin dashboard. Storefront and admin apps are built with Next.js and React; the API runs on ASP.NET Core (.NET) with SQL Server and Azure Blob Storage, backed by CI/CD pipelines with E2E testing and staged Azure/Vercel deployments.",
    tech: [
      "Next.js",
      "React",
      "ASP.NET Core",
      ".NET",
      "SQL Server",
      "Azure Blob Storage",
      "Stripe",
      "SignalR",
    ],
    demo: "https://ecommerce-platform-storefront-staging.vercel.app",
  },
];