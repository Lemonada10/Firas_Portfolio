"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IconGithub } from "@/components/icons/social";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  onOpen: () => void;
  index: number;
};

export function ProjectCard({ project, onOpen, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const cardRef = React.useRef<HTMLElement>(null);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const card = cardRef.current;
      if (!card || reduceMotion) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotY = (x - 0.5) * 10;
      const rotX = -(y - 0.5) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`;
      card.style.setProperty("--x", `${x * 100}%`);
      card.style.setProperty("--y", `${y * 100}%`);
    },
    [reduceMotion]
  );

  const handleMouseLeave = React.useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return (
    <motion.article
      ref={cardRef as React.Ref<HTMLElement>}
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.18s ease, box-shadow 0.18s ease" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/60 shadow-sm backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_16px_48px_rgba(99,102,241,0.18)] dark:bg-card/40"
    >
      {/* cursor spotlight */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,50%),rgba(99,102,241,0.16),transparent_60%)]" />
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open details for ${project.title}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={`https://placehold.co/800x500/1e1b4b/818cf8/png?text=${encodeURIComponent(
              project.title
            )}`}
            alt={project.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
          <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur">
            {project.location}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="border-primary/20 font-mono text-[10px] text-foreground/90"
              >
                {t}
              </Badge>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/80" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </button>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-muted/30 px-6 py-4">
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "gap-1.5"
                  )}
                />
              }
            >
              <IconGithub className="size-3.5" />
              Repo
            </TooltipTrigger>
            <TooltipContent>View repository</TooltipContent>
          </Tooltip>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              Demo
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ) : (
            <Button size="sm" variant="secondary" disabled>
              Demo soon
            </Button>
          )}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="text-xs font-medium text-primary underline-offset-4 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Case study
        </Link>
      </div>
    </motion.article>
  );
}
