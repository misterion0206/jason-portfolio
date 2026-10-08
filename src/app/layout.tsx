import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ThemeProvider from "../components/ThemeProvider";
import LanguageProvider from "../components/LanguageProvider";
import ChatWidget from "../components/ChatWidget";
import { skillCategories } from "../data/skills";
import { experiences } from "../data/experience";
import { education, profile } from "../data/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = profile.siteUrl;
const title = `${profile.fullName} | ${profile.title}`;
const description =
  "Yu-Chien (Jason) Chen is a .NET full-stack software engineer with 3+ years of experience in C#, ASP.NET Core, Angular/React, SQL Server, and Azure. Portfolio featuring enterprise ERP work and a full-stack product creation and e-commerce platform.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Yu-Chien Chen",
    "Jason Chen",
    ".NET Software Engineer",
    ".NET Full-Stack Software Engineer",
    "Application Developer",
    "Full-Stack Developer",
    "Software Engineer II",
    "Backend Engineer",
    "Cloud Engineer",
    "C#",
    "ASP.NET Core",
    "Entity Framework Core",
    "React",
    "Next.js",
    "Angular",
    "SQL Server",
    "Azure",
    "CI/CD",
  ],
  authors: [{ name: profile.fullName }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: profile.fullName,
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
  name: profile.fullName,
  alternateName: "Jason Chen",
  url: siteUrl,
  image: `${siteUrl}/avatar-light.jpg`,
  jobTitle: profile.title,
  description,
  email: `mailto:${profile.email}`,
  telephone: profile.phoneE164,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jersey City",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  sameAs: [profile.githubUrl, profile.linkedinUrl],
  knowsAbout: Array.from(new Set(skillCategories.flatMap((category) => category.items))),
  // alumniOf is for schools only. Employers belong under workedFor/worksFor —
  // putting them in alumniOf misrepresents them as educational institutions.
  alumniOf: education.map((item) => ({
    "@type": "CollegeOrUniversity" as const,
    name: item.school,
  })),
  workedFor: experiences.map((experience) => ({
    "@type": "Organization" as const,
    name: experience.company,
  })),
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