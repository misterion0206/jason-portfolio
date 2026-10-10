import type { SkillCategory } from "../types";

// Ordered for .NET/full-stack positioning: languages and backend first.
// Every entry must be traceable to real work in experience.ts or projects.ts —
// no aspirational technologies. Each item appears in exactly one category.
export const skillCategories: SkillCategory[] = [
  {
    title: { en: "Languages", zh: "程式語言", es: "Lenguajes" },
    items: ["C#", "TypeScript", "JavaScript", "SQL", "Java"],
  },
  {
    title: { en: "Backend", zh: "後端", es: "Backend" },
    items: [
      ".NET",
      "ASP.NET Core",
      "Entity Framework Core",
      "REST APIs",
      "JWT",
      "Swagger/OpenAPI",
      "SignalR",
    ],
  },
  {
    title: { en: "Frontend", zh: "前端", es: "Frontend" },
    items: ["React", "Next.js", "Angular", "Tailwind CSS", "Konva/react-konva"],
  },
  {
    title: { en: "Cloud & DevOps", zh: "雲端與 DevOps", es: "Cloud y DevOps" },
    items: [
      "Azure App Service",
      "Azure SQL",
      "Azure Blob Storage",
      "Azure DevOps",
      "GitHub Actions",
      "Vercel",
      "CI/CD",
    ],
  },
  {
    // Node.js/Express/MongoDB are deliberately omitted here: they map to one
    // academic group project (still listed in projects.ts) and dilute the .NET
    // positioning this site is aimed at.
    title: { en: "Databases", zh: "資料庫", es: "Bases de Datos" },
    items: ["SQL Server", "Redis"],
  },
  {
    title: { en: "Testing & Tools", zh: "測試與工具", es: "Pruebas y Herramientas" },
    items: ["Playwright", "xUnit", "Git", "GitHub", "DevExpress", "NPOI"],
  },
  {
    title: { en: "Integrations", zh: "整合服務", es: "Integraciones" },
    items: ["Stripe", "Google Gemini API", "Function Calling"],
  },
];
