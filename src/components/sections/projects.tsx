"use client";

import * as React from "react";
import Link from "next/link";
import { FolderGit2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectModal } from "@/components/ui/project-modal";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

export function Projects() {
  const [selected, setSelected] = React.useState<Project | null>(null);
  const [open, setOpen] = React.useState(false);
  const [activeTech, setActiveTech] = React.useState<string>("All");

  const handleOpen = (p: Project) => {
    setSelected(p);
    setOpen(true);
  };

  const techOptions = React.useMemo(() => {
    const all = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => all.add(t)));
    return ["All", ...Array.from(all).sort((a, b) => a.localeCompare(b))];
  }, []);

  const visible = React.useMemo(() => {
    if (activeTech === "All") return projects;
    return projects.filter((p) => p.tech.includes(activeTech));
  }, [activeTech]);

  return (
    <>
      <AnimatedSection
        id="projects"
        aria-label="Featured projects"
        className="py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Featured work
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Projects that show how I build
              </h2>
              <p className="mt-4 text-muted-foreground">
                Deep dives on architecture, constraints, and outcomes — not
                just tech stacks. Tap a card for the full story.
              </p>
            </div>
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "shrink-0 gap-2 self-start lg:self-auto"
              )}
            >
              <FolderGit2 className="size-4" aria-hidden />
              More on GitHub
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            {techOptions.map((t) => {
              const active = t === activeTech;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTech(t)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    active
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border/80 bg-background/70 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  aria-pressed={active}
                >
                  {t}
                </button>
              );
            })}
            <Badge
              variant="outline"
              className="ml-auto hidden font-mono text-[11px] text-muted-foreground sm:inline-flex"
            >
              {visible.length} shown
            </Badge>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                onOpen={() => handleOpen(p)}
              />
            ))}

            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/30 p-8 text-center">
              <p className="text-sm font-medium text-foreground">
                Slot reserved for your next build
              </p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Add another entry in{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  src/lib/data.ts
                </code>{" "}
                — same shape, new slug.
              </p>
              <a
                href="mailto:Firas.haddad.h@gmail.com?subject=Project%20idea"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "mt-6"
                )}
              >
                Collaborate
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <ProjectModal
        project={selected}
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setSelected(null);
        }}
      />
    </>
  );
}
