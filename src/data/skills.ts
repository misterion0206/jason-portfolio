import type { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    title: { en: "Backend", zh: "後端", es: "Backend" },
    items: [".NET Core", "ASP.NET Core", "Spring Boot", "Node.js", "Express"],
  },
  {
    title: { en: "Frontend", zh: "前端", es: "Frontend" },
    items: ["Angular", "JavaScript", "TypeScript", "HTML5", "CSS", "Tailwind CSS"],
  },
  {
    title: { en: "Database", zh: "資料庫", es: "Base de Datos" },
    items: ["Microsoft SQL Server", "MongoDB", "SQL"],
  },
  {
    title: { en: "Cloud & DevOps", zh: "雲端與 DevOps", es: "Cloud y DevOps" },
    items: ["Microsoft Azure", "Azure DevOps", "CI/CD", "Git", "GitHub"],
  },
  {
    title: { en: "Languages", zh: "程式語言", es: "Lenguajes" },
    items: ["C#", "Java", "JavaScript", "TypeScript", "SQL"],
  },
];
