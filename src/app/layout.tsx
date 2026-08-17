import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ThemeProvider from "../components/ThemeProvider";
import LanguageProvider from "../components/LanguageProvider";
import ChatWidget from "../components/ChatWidget";
import { skillCategories } from "../data/skills";
import { experiences } from "../data/experience";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://www.jasonchen.website";
const title = "Yu-Chien (Jason) Chen | Software Engineer";
const description =
  "Software engineer specializing in ASP.NET Core, Angular, Azure, and full-stack development with Next.js and React. Portfolio featuring enterprise ERP systems and a full-stack e-commerce platform.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Yu-Chien Chen",
    "Jason Chen",
    "Software Engineer",
    "Full-Stack Developer",
    "ASP.NET Core",
    "Next.js",
    "Angular",
    "Azure",
  ],
  authors: [{ name: "Yu-Chien (Jason) Chen" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Yu-Chien (Jason) Chen",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yu-Chien (Jason) Chen",
  alternateName: "Jason Chen",
  url: siteUrl,
  image: `${siteUrl}/avatar-light.jpg`,
  jobTitle: "Software Engineer",
  email: "mailto:qaz12345tt99@gmail.com",
  sameAs: ["https://github.com/misterion0206"],
  knowsAbout: Array.from(new Set(skillCategories.flatMap((category) => category.items))),
  alumniOf: [
    ...experiences.map((experience) => ({
      "@type": "Organization" as const,
      name: experience.company,
    })),
    { "@type": "CollegeOrUniversity" as const, name: "Stevens Institute of Technology" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
            <ChatWidget />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}