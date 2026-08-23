"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectModal } from "@/components/ui/project-modal";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { personal, projects } from "@/lib/data";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { SplitHeading } from "@/components/ui/text-split";

function TechMarquee() {
  const names = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);
  const loop = [...names, ...names];

  return (
    <div className="group mt-5 hidden overflow-hidden sm:block" aria-hidden>
      <div className="flex w-max gap-3 motion-safe:animate-[tech-marquee_28s_linear_infinite] motion-safe:group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="rounded-full border border-border/70 bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

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
                05 · Featured work
              </p>
              <SplitHeading className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Projects that show how I build
              </SplitHeading>
              <p className="mt-4 text-muted-foreground">
                Campus Guide and Focus Tracker from the CV, plus Peer Review as additional shipped work.
              </p>
              <TechMarquee />
            </div>
            {personal.githubUrl ? (
            <Link
              href={personal.githubUrl}
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
            ) : null}
          </div>

          <motion.div
            layout
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            {techOptions.map((t) => {
              const active = t === activeTech;
              return (
                <motion.button
                  key={t}
                  layout
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
                </motion.button>
              );
            })}
            <motion.div layout className="ml-auto hidden sm:block">
              <Badge
                variant="outline"
                className="font-mono text-[11px] text-muted-foreground"
              >
                {visible.length} shown
              </Badge>
            </motion.div>
          </motion.div>

          <motion.div
            layout
            className="mt-10 grid gap-8 lg:grid-cols-2"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  index={i}
                  onOpen={() => handleOpen(p)}
                />
              ))}
            </AnimatePresence>
            {/*
              Extra project cards: add entries to `projects` in src/lib/data.ts
              (same Project shape). They render in this grid automatically.
            */}
          </motion.div>
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
