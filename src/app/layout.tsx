import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { ResumeDialog } from "@/components/ui/resume-dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { MotionRoot } from "@/components/ui/motion-root";
import { LocaleFade } from "@/components/ui/locale-fade";
import { SiteAtmosphere } from "@/components/ui/site-atmosphere";
import { CommandPalette } from "@/components/ui/command-palette";
import { ToastHost } from "@/components/ui/toast";
import { RecruiterDock } from "@/components/ui/recruiter-dock";
import { SectionRail } from "@/components/ui/section-rail";
import { ShortcutOverlay } from "@/components/ui/shortcut-overlay";
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

const siteUrl = "https://firas-portfolio-zhdz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} · Software Engineering Student`,
    template: `%s · ${personal.name}`,
  },
  description: `${personal.headline} Based in ${personal.location}.`,
  keywords: [
    "Firas Al Haddad", "Software Engineering", "Concordia University",
    "Montreal", "data engineering", "Pratt & Whitney", "Databricks", "PySpark",
    "internship", "full-stack",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: "Software Engineering Co-op · Data Engineering Intern",
  email: personal.email,
  telephone: personal.phone,
  address: { "@type": "PostalAddress", addressLocality: "Montreal", addressRegion: "QC", addressCountry: "CA" },
  alumniOf: personal.school,
  url: siteUrl,
  sameAs: [personal.linkedInUrl, personal.portfolioUrl].filter(Boolean),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#b4b9c9" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              <SkipLink />

              {/* 1: canvas animation fills the whole page (client-only) */}
              <CanvasBackground />
              {/* 2: CSS dot-grid + vignette on top of canvas */}
              <AmbientBackground />

              {/* 3: all site content above both background layers */}
              <div className="relative z-10 flex min-h-screen flex-col">
                <CursorGlow />
                <SiteAtmosphere />
                <Navbar />
                <SectionRail />
                <CommandPalette />
                <ResumeDialog />
                <RecruiterDock />
                <ShortcutOverlay />
                <ToastHost />
                <MotionRoot>
                  <main id="main-content" className="flex-1">
                    <LocaleFade>{children}</LocaleFade>
                  </main>
                </MotionRoot>
                <Footer />
              </div>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
