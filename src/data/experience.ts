import type { ExperienceItem } from "../types";

// Bullets here mirror resume/resume.html so the site, the PDF, llms.txt, and the
// chatbot never disagree. Technology names stay in English in every locale.
export const experiences: ExperienceItem[] = [
  {
    company: "Chenglin Innovation Co., Ltd.",
    role: {
      en: "Software Development Engineer",
      zh: "軟體開發工程師",
      es: "Ingeniero de Desarrollo de Software",
    },
    period: "Nov 2022 - Aug 2024",
    location: {
      en: "Taipei, Taiwan",
      zh: "台北，台灣",
      es: "Taipéi, Taiwán",
    },
    stack: ["ASP.NET Core MVC", "Angular", "SQL Server", "Azure DevOps"],
    highlights: [
      {
        en: "Led a five-person team that built the notification system and message board for Taipei 101's procurement portal in two months using ASP.NET Core MVC and SQL Server, letting suppliers message Taipei 101's managers in the system.",
        zh: "帶領 5 人團隊，以 ASP.NET Core MVC 與 SQL Server 在 2 個月內完成台北 101 採購平台的通知系統與留言板，讓供應商能直接在系統內聯絡台北 101 的管理人員。",
        es: "Lideré un equipo de cinco personas que construyó en dos meses el sistema de notificaciones y el tablón de mensajes del portal de compras del Taipei 101 con ASP.NET Core MVC y SQL Server, para que los proveedores pudieran comunicarse directamente con los gerentes del Taipei 101 dentro del sistema.",
      },
      {
        en: "Developed tender and bidding workflows, role-based menu access, and API integrations with the client's internal systems.",
        zh: "開發招標與投標流程、角色權限選單控管，並與客戶內部系統進行 API 整合。",
        es: "Desarrollé flujos de licitación y ofertas, acceso a menús basado en roles e integraciones de API con los sistemas internos del cliente.",
      },
      {
        en: "Added multilingual support to a client's Angular/ASP.NET Core ERP system and improved its page load times.",
        zh: "為客戶以 Angular 與 ASP.NET Core 開發的 ERP 系統加入多語系支援，並改善頁面載入速度。",
        es: "Añadí soporte multilingüe al sistema ERP de un cliente en Angular y ASP.NET Core, y mejoré los tiempos de carga de sus páginas.",
      },
      {
        en: "Built a portal in ASP.NET Core and SQL Server in three months to track project progress, income, and costs.",
        zh: "以 ASP.NET Core 與 SQL Server 在 3 個月內建置入口網站，用來追蹤專案進度、收入與成本。",
        es: "Construí en tres meses un portal con ASP.NET Core y SQL Server para dar seguimiento al avance, los ingresos y los costos de los proyectos.",
      },
      {
        en: "Introduced CI/CD pipelines in Azure DevOps to automate the team's builds and deployments.",
        zh: "在 Azure DevOps 導入 CI/CD 流水線，自動化團隊的建置與部署。",
        es: "Introduje pipelines de CI/CD en Azure DevOps para automatizar las compilaciones y los despliegues del equipo.",
      },
    ],
  },
  {
    company: "Digihua Intelligent Systems Co., Ltd.",
    role: {
      en: "R&D Engineer",
      zh: "研發工程師",
      es: "Ingeniero de I+D",
    },
    period: "Dec 2020 - Mar 2022",
    location: {
      en: "Taichung, Taiwan",
      zh: "台中，台灣",
      es: "Taichung, Taiwán",
    },
    stack: ["C#", "WinForms", "SQL Server", "DevExpress", "NPOI"],
    highlights: [
      {
        en: "Built multilingual import/export modules in C#, WinForms, and SQL so the ERP product could display data in 5+ languages, including Chinese, English, and Vietnamese.",
        zh: "以 C#、WinForms 與 SQL 建置多語系匯入/匯出模組，讓 ERP 產品能以中文、英文、越南文等 5 種以上語言顯示資料。",
        es: "Construí módulos de importación/exportación multilingües con C#, WinForms y SQL para que el producto ERP mostrara datos en más de cinco idiomas, entre ellos chino, inglés y vietnamita.",
      },
      {
        en: "Developed 10+ custom features for the APS product, including field formatting, report syntax checks, and data import settings, using DevExpress and NPOI.",
        zh: "使用 DevExpress 與 NPOI 為 APS 產品開發 10 項以上客製功能，包括欄位格式設定、報表語法檢查與資料匯入設定。",
        es: "Desarrollé más de diez funciones personalizadas para el producto APS, como formato de campos, verificación de sintaxis de informes y configuración de importación de datos, usando DevExpress y NPOI.",
      },
      {
        en: "Rolled out the APS system for 5+ clients and handled customization and data integration requests from 15+ clients.",
        zh: "為 5 家以上客戶導入 APS 系統，並處理 15 家以上客戶的客製化與資料整合需求。",
        es: "Implanté el sistema APS en más de cinco clientes y atendí solicitudes de personalización e integración de datos de más de quince clientes.",
      },
      {
        en: "Worked with 10+ colleagues across regions and demoed new features to executives.",
        zh: "與 10 位以上跨地區同事合作，並向高階主管展示新功能。",
        es: "Trabajé con más de diez colegas de distintas regiones y presenté nuevas funciones a directivos.",
      },
    ],
  },
];
