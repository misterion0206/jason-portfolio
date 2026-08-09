import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ThemeProvider from "../components/ThemeProvider";
import LanguageProvider from "../components/LanguageProvider";
import ChatWidget from "../components/ChatWidget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://www.jasonchen.website";
const title = "Yu-Chien (Jason) Chen | Software Engineer";
const description =
  "Portfolio of Yu-Chien (Jason) Chen - Software Engineer focused on backend, cloud, and enterprise systems.";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
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