"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Download, FileText, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { personal } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CommandHint } from "@/components/ui/command-palette";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Magnetic } from "@/components/ui/magnetic-button";
import { useI18n } from "@/components/providers/language-provider";

const NAV_IDS = [
  "home",
  "about",
  "pipeline",
  "skills",
  "experience",
  "projects",
  "contact",
] as const;

type NavId = (typeof NAV_IDS)[number];

const SECTION_IDS: string[] = [...NAV_IDS];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

function NavLinkItem({
  id,
  label,
  i,
  active,
  showLayoutIndicator,
  reduceMotion,
  onHome,
  onNavigate,
}: {
  id: NavId;
  label: string;
  i: number;
  active: boolean;
  showLayoutIndicator: boolean;
  reduceMotion: boolean | null;
  onHome: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();

  return (
    <motion.a
      href={`/#${id}`}
      initial={reduceMotion ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
        if (onHome) {
          scrollToId(id);
          history.replaceState(null, "", `/#${id}`);
        } else {
          router.push(`/#${id}`);
        }
      }}
      className={cn(
        "relative z-0 overflow-hidden rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active && showLayoutIndicator && "text-primary",
        active && !showLayoutIndicator && "bg-primary/12 text-primary",
        !active && "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      )}
    >
      {active && showLayoutIndicator && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute inset-0 z-0 rounded-lg bg-primary/12"
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.a>
  );
}

function NavLinks({
  activeId,
  onNavigate,
  className,
  showLayoutIndicator = false,
}: {
  activeId: string;
  onNavigate?: () => void;
  className?: string;
  showLayoutIndicator?: boolean;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const onHome = pathname === "/";

  return (
    <nav
      className={cn(
        "flex flex-col gap-1 md:flex-row md:items-center md:gap-1",
        className
      )}
      aria-label={t.nav.primary}
    >
      {NAV_IDS.map((id, i) => (
        <NavLinkItem
          key={id}
          id={id}
          label={t.nav[id]}
          i={i}
          active={onHome && activeId === id}
          showLayoutIndicator={showLayoutIndicator}
          reduceMotion={reduceMotion}
          onHome={onHome}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

export function Navbar() {
  const activeId = useActiveSection(SECTION_IDS);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 shadow-[inset_0_1px_0_0_rgba(15,23,42,0.05)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/70 dark:border-white/[0.06] dark:bg-background/80 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset] dark:supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <motion.div whileTap={reduceMotion ? undefined : { scale: 0.96 }}>
          <Link
            href="/#home"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToId("home");
              }
            }}
            className="group flex shrink-0 items-center gap-2 font-semibold tracking-tight text-foreground"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/12 text-sm font-bold text-primary ring-1 ring-primary/20 transition-[box-shadow,transform] duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_0_24px_rgba(99,102,241,0.28)] dark:group-hover:shadow-[0_0_28px_rgba(129,140,248,0.22)]">
              FA
            </span>
            <span className="hidden sm:inline">
              {personal.name.split(" ")[0]}
            </span>
          </Link>
        </motion.div>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavLinks activeId={activeId} showLayoutIndicator />
        </div>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.14} className="hidden sm:inline-flex">
            <motion.a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "gap-1.5")}
            >
              <FileText className="size-3.5" aria-hidden />
              {t.nav.resume}
            </motion.a>
          </Magnetic>
          <LanguageToggle />
          <CommandHint />
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "md:hidden"
              )}
              aria-label={t.nav.openMenu}
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">{t.nav.menu}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <NavLinks
                  activeId={activeId}
                  onNavigate={() => setOpen(false)}
                  className="gap-0"
                />
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "default" }), "w-full gap-2")}
                >
                  <FileText className="size-4" aria-hidden />
                  {t.nav.resume}
                </a>
                <a
                  href={personal.resumeUrl}
                  download="Firas_Al_Haddad_CV.pdf"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
                >
                  <Download className="size-4" aria-hidden />
                  {t.nav.downloadResume}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
