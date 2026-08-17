import type { ProjectItem } from "../types";

export const projects: ProjectItem[] = [
  {
    title: "Ecommerce Platform",
    slug: "ecommerce-platform",
    period: "Personal Project",
    description: {
      en: "A full-stack e-commerce platform with a canvas-based product customization studio, shopping cart, Stripe checkout, membership system, and an operations admin dashboard. Storefront and admin apps are built with Next.js and React; the API runs on ASP.NET Core (.NET) with SQL Server and Azure Blob Storage, backed by CI/CD pipelines with E2E testing and staged Azure/Vercel deployments.",
      zh: "一套支援商品客製化工作室、購物車、Stripe 結帳、會員系統與營運後台的全端電商平台。前台與後台採用 Next.js 與 React 建置;API 使用 ASP.NET Core(.NET)搭配 SQL Server 與 Azure Blob Storage,並有 CI/CD 流水線、端對端測試與 Azure/Vercel 分階段部署支援。",
      es: "Una plataforma de comercio electrónico full-stack con un estudio de personalización de productos basado en canvas, carrito de compras, pago con Stripe, sistema de membresías y un panel de administración operativo. Las apps de tienda y administración están construidas con Next.js y React; la API funciona con ASP.NET Core (.NET) con SQL Server y Azure Blob Storage, respaldada por pipelines de CI/CD con pruebas E2E e implementaciones escalonadas en Azure/Vercel.",
    },
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
    adminDemo: {
      url: "https://ecommerce-platform-admin-staging.vercel.app",
      username: "staging-demo",
      password: "StagingDemo2026",
    },
  },
  {
    title: "Full-Stack Web Application",
    period: "Dec 2025",
    description: {
      en: "Developed a full-stack web application with authentication, session management, and RESTful APIs in a collaborative team setting.",
      zh: "在團隊協作環境中開發全端網頁應用程式,包含身份驗證、工作階段管理與 RESTful API。",
      es: "Desarrollé una aplicación web full-stack con autenticación, gestión de sesiones y APIs RESTful en un entorno de equipo colaborativo.",
    },
    tech: ["Node.js", "Express", "MongoDB", "Handlebars", "Git", "GitHub"],
    github: "https://github.com/nickkogut/CS546-Group24-Project",
  },
  {
    title: "Procurement Notification System",
    period: "Professional Project",
    description: {
      en: "Built a cloud-based procurement notification platform for enterprise use, with backend workflows, status tracking, and delivery coordination.",
      zh: "為企業建置雲端採購通知平台,包含後端工作流程、狀態追蹤與交付協調。",
      es: "Construí una plataforma de notificación de adquisiciones basada en la nube para uso empresarial, con flujos de trabajo backend, seguimiento de estado y coordinación de entregas.",
    },
    tech: ["ASP.NET Core MVC", "SQL Server", "Azure DevOps"],
  },
  {
    title: "Enterprise ERP Modernization",
    period: "Professional Project",
    description: {
      en: "Enhanced a large ERP platform with multilingual support, performance optimization, and improved user accessibility.",
      zh: "強化大型 ERP 平台,加入多語系支援、效能優化與更完善的使用者無障礙功能。",
      es: "Mejoré una gran plataforma ERP con soporte multilingüe, optimización de rendimiento y mayor accesibilidad para los usuarios.",
    },
    tech: ["Angular", "ASP.NET Core", "Microsoft SQL Server"],
  },
];
