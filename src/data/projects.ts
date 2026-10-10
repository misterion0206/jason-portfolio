import type { ProjectItem } from "../types";

// Technologies listed here are limited to ones verified in the corresponding
// source repositories. Do not add a technology because it is planned or
// mentioned in design notes — only if it is actually wired up.
//
// Homepage cards (Projects.tsx) render `highlightTech` when present (a 5-7
// item subset for a long `tech` list) and fall back to `tech` otherwise.
// `caseStudy` only renders on projects with a `slug` — homepage cards never
// show it.
export const projects: ProjectItem[] = [
  {
    id: "ecommerce-platform",
    title: "Product Creation & E-Commerce Platform",
    slug: "ecommerce-platform",
    period: "2026 - Present",
    description: {
      en: "A full-stack product creation and e-commerce platform: a Next.js/React storefront with a live Konva/react-konva customization studio, a separate Next.js/React admin app, and an ASP.NET Core Web API on Azure SQL and Blob Storage. Stripe checkout, JWT auth with role-based authorization, and SignalR notifications are shipped through a gated GitHub Actions/Playwright pipeline to staging and production.",
      zh: "一套全端的商品創作與電商平台:前台為搭載 Konva/react-konva 即時客製化工作室的 Next.js/React 商店，後台是另一個獨立的 Next.js/React 管理應用程式，後端則是建構於 Azure SQL 與 Blob Storage 之上的 ASP.NET Core Web API。Stripe 結帳、JWT 角色權限驗證與 SignalR 即時通知，皆透過有關卡控管的 GitHub Actions/Playwright 流程部署至測試與正式環境。",
      es: "Una plataforma full-stack de creación de productos y comercio electrónico: una tienda en Next.js/React con un estudio de personalización en vivo con Konva/react-konva, una aplicación de administración separada en Next.js/React, y una Web API en ASP.NET Core sobre Azure SQL y Blob Storage. El pago con Stripe, la autenticación JWT con autorización basada en roles y las notificaciones con SignalR se entregan mediante un pipeline de GitHub Actions/Playwright con control de calidad hacia staging y producción.",
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
    highlightTech: [
      "Next.js",
      "React",
      "ASP.NET Core",
      "Entity Framework Core",
      "Azure SQL",
      "Stripe",
      "SignalR",
    ],
    demo: "https://ecommerce-platform-storefront-staging.vercel.app",
    // Intentionally public read-only demo account — confirmed by the project owner.
    adminDemo: {
      url: "https://ecommerce-platform-admin-staging.vercel.app",
      username: "staging-demo",
      password: "StagingDemo2026",
    },
    caseStudy: {
      problem: {
        en: "Sellers of customizable products need two things most off-the-shelf storefronts don't offer together: a design studio where a buyer can personalize a base product in real time, and an operations side where staff can manage base products, design assets, shipping/production rules, and orders without touching the database directly. This platform covers both halves end to end, not just the customer-facing storefront.",
        zh: "想販售可客製化商品的賣家，通常同時需要兩件現成電商方案很少一起提供的東西:一個能讓買家即時個人化商品的設計工作室，以及一套讓營運人員能管理底板商品、設計素材、出貨/生產規則與訂單，而不用直接碰資料庫的後台。這套平台從頭到尾涵蓋了這兩個面向，而不只是面向顧客的前台商店。",
        es: "Los vendedores de productos personalizables suelen necesitar dos cosas que la mayoría de las plataformas de comercio listas para usar no ofrecen juntas: un estudio de diseño donde el comprador pueda personalizar un producto base en tiempo real, y un lado operativo donde el personal pueda gestionar productos base, recursos de diseño, reglas de envío/producción y pedidos sin tocar la base de datos directamente. Esta plataforma cubre ambas partes de principio a fin, no solo la tienda de cara al cliente.",
      },
      myRole: {
        en: "Responsible for the full stack: the Next.js/React storefront and the separate Next.js/React admin application, the ASP.NET Core Web API and its EF Core data layer, the Azure infrastructure (SQL, Blob Storage, App Service), the CI/CD pipeline, and the Playwright test suite.",
        zh: "負責整個技術棧:Next.js/React 前台商店與另一個獨立的 Next.js/React 管理後台、ASP.NET Core Web API 與其 EF Core 資料層、Azure 基礎設施(SQL、Blob Storage、App Service)、CI/CD 流程，以及 Playwright 測試套件。",
        es: "Responsable de toda la pila: la tienda en Next.js/React y la aplicación de administración separada en Next.js/React, la Web API en ASP.NET Core y su capa de datos con EF Core, la infraestructura de Azure (SQL, Blob Storage, App Service), el pipeline de CI/CD y la suite de pruebas con Playwright.",
      },
      decisions: [
        {
          en: "Storefront and admin are split into two separate Next.js apps sharing one ASP.NET Core API, so each can be deployed, scaled, and rolled back independently.",
          zh: "前台與後台拆成兩個各自獨立的 Next.js 應用程式，共用同一個 ASP.NET Core API，讓兩邊可以各自部署、擴展與回滾，互不影響。",
          es: "La tienda y la administración están divididas en dos aplicaciones Next.js separadas que comparten una misma API de ASP.NET Core, de modo que cada una se puede desplegar, escalar y revertir de forma independiente.",
        },
        {
          en: "JWT access tokens with refresh tokens and role-based authorization protect both the customer-facing API and the admin API, with separate account and role models for customers versus internal staff.",
          zh: "JWT access token 搭配 refresh token 與角色權限控管，同時保護面向顧客的 API 與後台 API，顧客與內部員工各自使用獨立的帳號與角色模型。",
          es: "Los tokens de acceso JWT con refresh tokens y autorización basada en roles protegen tanto la API de cara al cliente como la API de administración, con modelos de cuenta y rol separados para clientes y personal interno.",
        },
        {
          en: "Azure SQL stores relational data (products, orders, accounts); Azure Blob Storage stores uploaded design assets and generated previews, keeping large binary files out of the database.",
          zh: "Azure SQL 存放關聯式資料(商品、訂單、帳號);Azure Blob Storage 則存放上傳的設計素材與產生的預覽圖，讓大型二進位檔案不必塞進資料庫。",
          es: "Azure SQL almacena los datos relacionales (productos, pedidos, cuentas); Azure Blob Storage almacena los recursos de diseño subidos y las vistas previas generadas, manteniendo los archivos binarios grandes fuera de la base de datos.",
        },
        {
          en: "Every pull request runs the Playwright end-to-end suite before merge, and promotion from staging to production is a separate, gated GitHub Actions workflow rather than an automatic push.",
          zh: "每個 pull request 合併前都會先跑過 Playwright 端對端測試套件，而從測試環境晉升到正式環境則是另一個需要人工關卡確認的 GitHub Actions 流程，而非自動推送。",
          es: "Cada pull request ejecuta la suite end-to-end de Playwright antes de fusionarse, y la promoción de staging a producción es un workflow de GitHub Actions separado y con control de aprobación, no un despliegue automático.",
        },
      ],
      challenges: {
        en: "Splitting storefront and admin into separate apps duplicates some infrastructure and auth plumbing, but was chosen over a single monolith so admin tooling changes can't accidentally break the public storefront, and the two can scale independently.",
        zh: "把前台與後台拆成兩個應用程式，會重複一部分基礎設施與驗證邏輯的建置成本，但相較於單一整合式應用，這個取捨換來的是後台功能的異動不會意外弄壞對外的商店，且兩邊能各自獨立擴展。",
        es: "Separar la tienda y la administración en aplicaciones distintas duplica parte de la infraestructura y la lógica de autenticación, pero se eligió frente a un monolito único para que los cambios en las herramientas de administración no puedan romper accidentalmente la tienda pública, y para que ambas puedan escalar de forma independiente.",
      },
      testing: {
        en: "Pull requests run lint, type checking, the build, and the Playwright end-to-end suite via GitHub Actions before merge. Scheduled and on-demand workflows add a nightly regression pass and WebKit-specific smoke tests. Deploys to staging and production are separate, gated workflows targeting Azure App Service (API) and Vercel (storefront and admin), so a release only reaches production after passing staging.",
        zh: "Pull request 合併前，GitHub Actions 會先跑 lint、型別檢查、build 與 Playwright 端對端測試;另外排程與可手動觸發的流程還包含每日夜間迴歸測試與 WebKit 專屬的 smoke test。測試環境與正式環境的部署是各自獨立、需要關卡確認的流程，分別部署到 Azure App Service(API)與 Vercel(前台與後台)，確保版本一定先通過測試環境驗證才會上正式環境。",
        es: "Antes de cada fusión, GitHub Actions ejecuta lint, verificación de tipos, el build y la suite end-to-end de Playwright. Workflows programados y bajo demanda añaden una pasada de regresión nocturna y pruebas de humo específicas para WebKit. Los despliegues a staging y producción son workflows separados y con control de aprobación hacia Azure App Service (API) y Vercel (tienda y administración), de modo que una versión solo llega a producción tras pasar por staging.",
      },
      results: {
        en: "Feature-complete for the core flow — product customization, cart, Stripe checkout, order management, and the admin back office — and running on staging, including the public read-only admin demo linked above. It has not yet opened to paying customers in production, so there are no live usage or revenue numbers to report; the current focus is finishing production rollout.",
        zh: "核心流程已開發完成——商品客製化、購物車、Stripe 結帳、訂單管理與後台管理——並已部署在測試環境上，包含上方連結的公開唯讀後台展示。目前尚未對一般付費顧客開放正式環境，因此還沒有實際使用量或營收數據可以回報;目前的重點是完成正式環境的上線。",
        es: "Funcionalmente completo para el flujo principal —personalización de productos, carrito, pago con Stripe, gestión de pedidos y back office de administración— y en ejecución en staging, incluyendo la demo pública de administración de solo lectura enlazada arriba. Todavía no se ha abierto a clientes de pago en producción, por lo que no hay cifras de uso real o ingresos que reportar; el enfoque actual es completar el despliegue a producción.",
      },
    },
  },
  {
    id: "ai-powered-portfolio",
    title: "AI-Powered Portfolio",
    period: "2026",
    description: {
      en: "This portfolio site: a multilingual Next.js, React, TypeScript, and Tailwind CSS application with English, Traditional Chinese, and Spanish support. It integrates the Google Gemini API with Function Calling over typed portfolio data so visitors can explore experience, projects, resume links, and page sections, and the public chat endpoint is protected with same-origin validation and Upstash Redis sliding-window rate limiting.",
      zh: "即本作品集網站:以 Next.js、React、TypeScript 與 Tailwind CSS 打造的多語系應用程式，支援英文、繁體中文與西班牙文。網站整合 Google Gemini API，透過 Function Calling 存取型別化的作品集資料，讓訪客能探索經歷、專案、履歷連結與頁面區塊;公開的聊天 API 則以同源驗證與 Upstash Redis 滑動視窗速率限制加以保護。",
      es: "Este sitio de portafolio: una aplicación multilingüe en Next.js, React, TypeScript y Tailwind CSS con soporte para inglés, chino tradicional y español. Integra la API de Google Gemini con Function Calling sobre datos tipados del portafolio para que los visitantes exploren experiencia, proyectos, enlaces del currículum y secciones de la página, y el endpoint público de chat está protegido con validación de mismo origen y limitación de velocidad por ventana deslizante con Upstash Redis.",
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
    id: "enterprise-systems-chenglin",
    title: "Enterprise Procurement & ERP Modernization",
    period: "Nov 2022 - Aug 2024",
    description: {
      en: "Two enterprise systems delivered for Chenglin Innovation: a procurement notification platform for Taipei 101 built with a five-person team in two months, and an Angular/ASP.NET Core ERP modernization that added multilingual support and cut page-load time by 25%.",
      zh: "為 Chenglin Innovation 交付的兩套企業系統:與 5 人團隊在 2 個月內完成的台北 101 採購通知平台，以及以 Angular、ASP.NET Core 現代化 ERP、加入多語系支援並將頁面載入時間縮短 25%。",
      es: "Dos sistemas empresariales entregados para Chenglin Innovation: una plataforma de notificación de adquisiciones para el Taipei 101 construida con un equipo de cinco personas en dos meses, y una modernización de ERP con Angular/ASP.NET Core que añadió soporte multilingüe y redujo el tiempo de carga de página en un 25%.",
    },
    tech: ["ASP.NET Core MVC", "Angular", "SQL Server", "Azure DevOps"],
  },
];
