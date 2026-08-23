"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { IconGithub } from "@/components/icons/social";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GalleryLightbox } from "@/components/ui/gallery-lightbox";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectArticle({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease },
        };

  return (
    <article className="mx-auto min-h-screen max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <motion.div {...fade(0)}>
        <Link
          href="/#projects"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-10 gap-2 pl-0 text-muted-foreground hover:text-foreground"
          )}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to projects
        </Link>
      </motion.div>

      <motion.div
        layoutId={`project-image-${project.slug}`}
        className="relative mb-10 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border/80 bg-muted"
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
      >
        <Image
          src={
            project.image ??
            `https://placehold.co/1200x400/1e1b4b/818cf8/png?text=${encodeURIComponent(
              project.title
            )}`
          }
          alt={project.imageAlt}
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
      </motion.div>

      <motion.header className="space-y-4" {...fade(0.12)}>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="font-mono text-[11px]">
              {t}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground">{project.tagline}</p>
        <p className="text-sm text-muted-foreground">{project.location}</p>
      </motion.header>

      <motion.div className="mt-8 flex flex-wrap gap-3" {...fade(0.18)}>
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <IconGithub className="size-4" />
            GitHub
          </a>
        ) : null}
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
            Demo
          </a>
        ) : null}
      </motion.div>

      <Separator className="my-10" />

      <div className="max-w-none space-y-10">
        <motion.section {...fade(0.22)}>
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <p className="mt-3 text-muted-foreground">{project.overview}</p>
        </motion.section>
        <motion.section {...fade(0.28)}>
          <h2 className="text-xl font-semibold text-foreground">My role</h2>
          <p className="mt-3 text-muted-foreground">{project.role}</p>
        </motion.section>
        <motion.section className="grid gap-8 sm:grid-cols-2" {...fade(0.34)}>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Key features</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
              {project.keyFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Challenges</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
              {project.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </motion.section>
        <motion.section {...fade(0.4)}>
          <h2 className="text-xl font-semibold text-foreground">
            What I learned
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
            {project.learnings.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </motion.section>
        {(project.gallery ?? []).length > 0 && (
          <motion.section {...fade(0.46)}>
            <h2 className="text-xl font-semibold text-foreground">Gallery</h2>
            <GalleryLightbox
              images={project.gallery!}
              thumbAspect="9/16"
              gridClassName="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4"
            />
          </motion.section>
        )}
      </div>
    </article>
  );
}
