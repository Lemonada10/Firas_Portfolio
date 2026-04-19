import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { SiteAtmosphere } from "@/components/ui/site-atmosphere";
import { personal } from "@/lib/data";

/* Canvas background — client only, no SSR → no hydration mismatch */
const CanvasBackground = dynamic(
  () =>
    import("@/components/ui/canvas-background").then(
      (m) => ({ default: m.CanvasBackground })
    ),
  { ssr: false }
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://firas-portfolio.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} · Software Engineering Student`,
    template: `%s · ${personal.name}`,
  },
  description: `${personal.headline} Based in ${personal.location}.`,
  keywords: [
    "Firas Al Haddad", "Software Engineering", "Concordia University",
    "Montreal", "internship", "full-stack", "data engineering",
  ],
  authors: [{ name: personal.name }],
  openGraph: {
    type: "website", locale: "en_CA", url: siteUrl,
    siteName: `${personal.name} · Portfolio`,
    title: `${personal.name} · Software Engineering Co-op`,
    description: personal.headline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} · Portfolio`,
    description: personal.headline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#09090f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden font-sans antialiased [text-rendering:optimizeLegibility]">
        <ThemeProvider>
          <TooltipProvider>
            <a
              href="#home"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
            >
              Skip to content
            </a>

            {/* 1: canvas animation fills the whole page (client-only) */}
            <CanvasBackground />
            {/* 2: CSS dot-grid + vignette on top of canvas */}
            <AmbientBackground />

            {/* 3: all site content above both background layers */}
            <div className="relative z-10 flex min-h-screen flex-col">
              <CursorGlow />
              <SiteAtmosphere />
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
