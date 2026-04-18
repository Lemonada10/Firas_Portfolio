import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { IconGithub } from "@/components/icons/social";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug, personal, projects } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.title} | ${personal.name}`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <article className="mx-auto min-h-screen max-w-3xl px-4 pb-24 pt-28 sm:px-6">
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

      <div className="relative mb-10 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border/80 bg-muted">
        <Image
          src={`https://placehold.co/1200x400/1e1b4b/818cf8/png?text=${encodeURIComponent(
            project.title
          )}`}
          alt={project.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <header className="space-y-4">
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
      </header>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "sm" }), "gap-2")}
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
            Demo
          </a>
        ) : null}
      </div>

      <Separator className="my-10" />

      <div className="max-w-none space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <p className="mt-3 text-muted-foreground">{project.overview}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">My role</h2>
          <p className="mt-3 text-muted-foreground">{project.role}</p>
        </section>
        <section className="grid gap-8 sm:grid-cols-2">
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
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            What I learned
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
            {project.learnings.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Gallery</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 not-prose">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-video overflow-hidden rounded-xl border border-border/80"
              >
                <Image
                  src={`https://placehold.co/400x225/312e81/a5b4fc/png?text=Shot+${i}`}
                  alt={`Screenshot ${i}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
