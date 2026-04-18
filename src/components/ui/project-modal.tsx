"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { IconGithub } from "@/components/icons/social";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type ProjectModalProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: ProjectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {project ? (
      <DialogContent
        showCloseButton
        className="max-h-[min(90vh,860px)] max-w-3xl overflow-y-auto p-0 sm:max-w-3xl"
      >
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
          <Image
            src={`https://placehold.co/1200x400/1e1b4b/818cf8/png?text=${encodeURIComponent(
              project.title
            )}`}
            alt={project.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>

        <div className="space-y-6 px-6 pb-6 pt-2">
          <DialogHeader className="text-left">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="secondary" className="font-mono text-[11px]">
                  {t}
                </Badge>
              ))}
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {project.tagline}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "default", size: "sm" }), "gap-2")}
            >
              <IconGithub className="size-4" />
              GitHub
            </a>
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-2"
                )}
              >
                <ExternalLink className="size-4" aria-hidden />
                Live demo
              </a>
            ) : (
              <Button variant="outline" size="sm" disabled className="gap-2">
                <ExternalLink className="size-4" aria-hidden />
                Demo (soon)
              </Button>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-primary"
              )}
            >
              Full case study page
            </Link>
          </div>

          <Separator />

          <section>
            <h4 className="text-sm font-semibold text-foreground">Overview</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.overview}
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-foreground">My role</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.role}
            </p>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <section>
              <h4 className="text-sm font-semibold text-foreground">
                Key features
              </h4>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-primary">
                {project.keyFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4 className="text-sm font-semibold text-foreground">
                Challenges
              </h4>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-primary">
                {project.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <h4 className="text-sm font-semibold text-foreground">
              What I learned
            </h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-primary">
              {project.learnings.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-foreground">Gallery</h4>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-lg border border-border/80 bg-muted"
                >
                  <Image
                    src={`https://placehold.co/400x225/312e81/a5b4fc/png?text=Screenshot+${i}`}
                    alt={`${project.title} screenshot placeholder ${i}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
      ) : null}
    </Dialog>
  );
}
