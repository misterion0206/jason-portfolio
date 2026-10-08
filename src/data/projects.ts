import type { ProjectItem } from "../types";

// Technologies listed here are limited to ones verified in the corresponding
// source repositories. Do not add a technology because it is planned or
// mentioned in design notes — only if it is actually wired up.
export const projects: ProjectItem[] = [
  {
    id: "ecommerce-platform",
    title: "Product Creation & E-Commerce Platform",
    slug: "ecommerce-platform",
    period: "2026 - Present",
    description: {
      en: "A full-stack product creation and e-commerce platform. The Next.js/React storefront and administration apps run against an ASP.NET Core Web API using Entity Framework Core, Azure SQL, and Azure Blob Storage. It features a Konva/react-konva customization studio with saved designs, cart, Stripe checkout, and order workflows, secured by JWT authentication with refresh tokens and role-based authorization, and shipped through GitHub Actions CI/CD with Playwright end-to-end tests and gated staging/production deployments to Azure App Service and Vercel.",
      zh: "一套全端的商品創作與電商平台。前台與後台以 Next.js/React 建置,後端為 ASP.NET Core Web API,搭配 Entity Framework Core、Azure SQL 與 Azure Blob Storage。平台提供以 Konva/react-konva 打造的客製化工作室,包含設計稿儲存、購物車、Stripe 結帳與訂單流程,並以 JWT 驗證、refresh token 與角色權限控管保護;交付流程採 GitHub Actions CI/CD,含 Playwright 端對端測試,以及部署至 Azure App Service 與 Vercel 的測試/正式環境控管。",
      es: "Una plataforma full-stack de creación de productos y comercio electrónico. Las apps de tienda y administración en Next.js/React se apoyan en una Web API de ASP.NET Core con Entity Framework Core, Azure SQL y Azure Blob Storage. Incluye un estudio de personalización con Konva/react-konva con diseños guardados, carrito, pago con Stripe y flujos de pedidos, protegidos por autenticación JWT con refresh tokens y autorización basada en roles, y se entrega mediante CI/CD con GitHub Actions, pruebas end-to-end con Playwright e implementaciones controladas de staging y producción en Azure App Service y Vercel.",
    },
    tech: [
      "Next.js",
      "React",
      "ASP.NET Core",
      ".NET",
      "Entity Framework Core",
      "SQL Server",
      "Azure SQL",
      "Azure Blob Storage",
      "Konva/react-konva",
      "Stripe",
      "SignalR",
      "JWT",
      "GitHub Actions",
      "Playwright",
      "Azure App Service",
      "Vercel",
    ],
    demo: "https://ecommerce-platform-storefront-staging.vercel.app",
    // Intentionally public read-only demo account — confirmed by the project owner.
    adminDemo: {
      url: "https://ecommerce-platform-admin-staging.vercel.app",
      username: "staging-demo",
      password: "StagingDemo2026",
    },
  },
  {
    id: "ai-powered-portfolio",
    title: "AI-Powered Portfolio",
    period: "2026",
    description: {
      en: "This portfolio site: a multilingual Next.js, React, TypeScript, and Tailwind CSS application with English, Traditional Chinese, and Spanish support. It integrates the Google Gemini API with function calling over typed portfolio data so visitors can explore experience, projects, resume links, and page sections, and the public chat endpoint is protected with same-origin validation and Upstash Redis sliding-window rate limiting.",
      zh: "即本作品集網站:以 Next.js、React、TypeScript 與 Tailwind CSS 打造的多語系應用程式,支援英文、繁體中文與西班牙文。網站整合 Google Gemini API,透過 function calling 存取型別化的作品集資料,讓訪客能探索經歷、專案、履歷連結與頁面區塊;公開的聊天 API 則以同源驗證與 Upstash Redis 滑動視窗速率限制加以保護。",
      es: "Este sitio de portafolio: una aplicación multilingüe en Next.js, React, TypeScript y Tailwind CSS con soporte para inglés, chino tradicional y español. Integra la API de Google Gemini con function calling sobre datos tipados del portafolio para que los visitantes exploren experiencia, proyectos, enlaces del currículum y secciones de la página, y el endpoint público de chat está protegido con validación de mismo origen y limitación de velocidad por ventana deslizante con Upstash Redis.",
    },
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Google Gemini API",
      "Upstash Redis",
      "Vercel",
    ],
    github: "https://github.com/misterion0206/jason-portfolio",
    demo: "https://www.jasonchen.website",
  },
  {
    id: "procurement-notification-system",
    title: "Procurement Notification System",
    period: "Nov 2022 - Aug 2024",
    description: {
      en: "A procurement notification platform delivered for Taipei 101 with a five-person team, covering tender and bidding workflows, role-based menu access, status tracking, and API integrations with the client's internal systems.",
      zh: "與 5 人團隊為台北 101 交付的採購通知平台,涵蓋招標與投標流程、角色權限選單控管、狀態追蹤,以及與客戶內部系統的 API 整合。",
      es: "Una plataforma de notificación de adquisiciones entregada para el Taipei 101 con un equipo de cinco personas, que abarca flujos de licitación y ofertas, acceso a menús basado en roles, seguimiento de estado e integraciones de API con los sistemas internos del cliente.",
    },
    tech: ["ASP.NET Core MVC", "SQL Server", "Azure DevOps"],
  },
  {
    id: "enterprise-erp-modernization",
    title: "Enterprise ERP Modernization",
    period: "Nov 2022 - Aug 2024",
    description: {
      en: "Modernization of a large ERP application with Angular, ASP.NET Core, and SQL Server, adding multilingual support and reducing page-load time by 25%.",
      zh: "以 Angular、ASP.NET Core 與 SQL Server 現代化大型 ERP 應用程式,加入多語系支援並將頁面載入時間縮短 25%。",
      es: "Modernización de una gran aplicación ERP con Angular, ASP.NET Core y SQL Server, añadiendo soporte multilingüe y reduciendo el tiempo de carga de página en un 25%.",
    },
    tech: ["Angular", "ASP.NET Core", "SQL Server"],
  },
  {
    id: "cs546-full-stack-web-application",
    title: "Full-Stack Web Application",
    period: "Dec 2025",
    description: {
      en: "Developed a full-stack web application with authentication, session management, and RESTful APIs in a collaborative team setting.",
      zh: "在團隊協作環境中開發全端網頁應用程式,包含身份驗證、工作階段管理與 RESTful API。",
      es: "Desarrollé una aplicación web full-stack con autenticación, gestión de sesiones y APIs RESTful en un entorno de equipo colaborativo.",
    },
    tech: ["Node.js", "Express", "MongoDB", "Handlebars", "Git"],
    github: "https://github.com/nickkogut/CS546-Group24-Project",
  },
];
