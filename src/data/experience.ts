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
      zh: "台灣,台北",
      es: "Taipéi, Taiwán",
    },
    stack: ["ASP.NET Core MVC", "Angular", "SQL Server", "Azure DevOps"],
    highlights: [
      {
        en: "Led a five-person engineering team to deliver a procurement notification platform for Taipei 101 in two months using ASP.NET Core MVC and SQL Server, improving cross-team communication efficiency by 30%.",
        zh: "帶領 5 人工程團隊,以 ASP.NET Core MVC 與 SQL Server 於 2 個月內為台北 101 交付採購通知平台,將跨部門溝通效率提升 30%。",
        es: "Lideré un equipo de cinco ingenieros para entregar una plataforma de notificación de adquisiciones para el Taipei 101 en dos meses con ASP.NET Core MVC y SQL Server, mejorando la eficiencia de comunicación entre equipos en un 30%.",
      },
      {
        en: "Developed tender and bidding workflows, role-based menu access, and API integrations with the client's internal systems.",
        zh: "開發招標與投標流程、角色權限選單控管,並與客戶內部系統進行 API 整合。",
        es: "Desarrollé flujos de licitación y ofertas, acceso a menús basado en roles e integraciones de API con los sistemas internos del cliente.",
      },
      {
        en: "Modernized an ERP application using Angular, ASP.NET Core, and SQL Server, adding multilingual support and reducing page-load time by 25%.",
        zh: "以 Angular、ASP.NET Core 與 SQL Server 現代化 ERP 應用程式,加入多語系支援並將頁面載入時間縮短 25%。",
        es: "Modernicé una aplicación ERP con Angular, ASP.NET Core y SQL Server, añadiendo soporte multilingüe y reduciendo el tiempo de carga de página en un 25%.",
      },
      {
        en: "Built a corporate information portal for project, cost, and revenue tracking.",
        zh: "建置企業資訊入口網站,用於專案、成本與營收追蹤。",
        es: "Construí un portal de información corporativa para el seguimiento de proyectos, costos e ingresos.",
      },
      {
        en: "Introduced Azure DevOps CI/CD pipelines, reducing release-cycle time by 40%.",
        zh: "導入 Azure DevOps CI/CD 流水線,將發佈週期縮短 40%。",
        es: "Introduje pipelines de CI/CD en Azure DevOps, reduciendo el tiempo del ciclo de lanzamiento en un 40%.",
      },
    ],
  },
  {
    company: "Digihua Intelligent Systems Co., Ltd.",
    role: {
      en: "Technical R&D Engineer",
      zh: "技術研發工程師",
      es: "Ingeniero de I+D Técnico",
    },
    period: "Dec 2020 - Mar 2022",
    location: {
      en: "Taichung, Taiwan",
      zh: "台灣,台中",
      es: "Taichung, Taiwán",
    },
    stack: ["C#", "WinForms", "SQL Server", "DevExpress", "NPOI"],
    highlights: [
      {
        en: "Built multilingual import/export modules using C#, WinForms, and SQL, supporting more than five languages and improving operational efficiency by 40%.",
        zh: "以 C#、WinForms 與 SQL 建置多語系匯入/匯出模組,支援 5 種以上語言,並將營運效率提升 40%。",
        es: "Construí módulos de importación/exportación multilingües con C#, WinForms y SQL, compatibles con más de cinco idiomas y mejorando la eficiencia operativa en un 40%.",
      },
      {
        en: "Delivered more than ten customized workflow, validation, reporting, and import features using DevExpress and NPOI.",
        zh: "使用 DevExpress 與 NPOI 交付超過 10 項客製化的流程、驗證、報表與匯入功能。",
        es: "Entregué más de diez funciones personalizadas de flujo de trabajo, validación, informes e importación usando DevExpress y NPOI.",
      },
      {
        en: "Deployed APS solutions for more than five enterprise clients and supported customized requirements and integrations for more than fifteen clients.",
        zh: "為 5 家以上企業客戶部署 APS 解決方案,並為 15 家以上客戶支援客製化需求與系統整合。",
        es: "Implementé soluciones APS para más de cinco clientes empresariales y atendí requisitos personalizados e integraciones para más de quince clientes.",
      },
      {
        en: "Collaborated with a cross-regional team of more than ten members and presented technical solutions to executive stakeholders.",
        zh: "與超過 10 人的跨地區團隊協作,並向高階主管簡報技術解決方案。",
        es: "Colaboré con un equipo interregional de más de diez miembros y presenté soluciones técnicas a directivos.",
      },
    ],
  },
];
