"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = NAV.map((n) => n.id);

function NavLinks({
  activeId,
  onNavigate,
  className,
}: {
  activeId: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav
      className={cn(
        "flex flex-col gap-1 md:flex-row md:items-center md:gap-1",
        className
      )}
      aria-label="Primary"
    >
      {NAV.map((item) => {
        const active = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={onNavigate}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/12 text-primary"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export function Navbar() {
  const activeId = useActiveSection(SECTION_IDS);
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/75 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="#home"
          className="group flex shrink-0 items-center gap-2 font-semibold tracking-tight text-foreground"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/12 text-sm font-bold text-primary ring-1 ring-primary/20">
            FA
          </span>
          <span className="hidden sm:inline">
            {personal.name.split(" ")[0]}
          </span>
        </Link>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavLinks activeId={activeId} />
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "hidden sm:inline-flex"
            )}
          >
            Resume
          </a>
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "md:hidden"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <NavLinks
                  activeId={activeId}
                  onNavigate={() => setOpen(false)}
                  className="gap-0"
                />
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "default" }), "w-full text-center")}
                >
                  Download resume
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
