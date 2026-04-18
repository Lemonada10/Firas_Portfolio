"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { experience } from "@/lib/data";

/* mouse-tracking tilt shared hook */
function useTilt(strength = 8) {
  const ref = React.useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale(1.02)`;
    },
    [reduceMotion, strength]
  );

  const onLeave = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  }, []);

  return { ref, onMove, onLeave };
}

export function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection
      id="experience"
      aria-label="Experience"
      className="bg-muted/10 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.2em] text-primary"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Experience
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.07 }}
          >
            Internships with measurable impact
          </motion.h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* timeline line */}
          <motion.div
            className="absolute bottom-4 top-2 w-px bg-gradient-to-b from-primary/70 via-primary/30 to-transparent sm:left-4"
            style={{ left: "0.65rem" }}
            initial={reduceMotion ? false : { scaleY: 0, originY: 0 }}
            whileInView={reduceMotion ? undefined : { scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />

          <ul className="space-y-12">
            {experience.map((job, index) => (
              <ExperienceCard key={job.id} job={job} index={index} reduceMotion={!!reduceMotion} />
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}

type Job = (typeof experience)[number];

function ExperienceCard({ job, index, reduceMotion }: { job: Job; index: number; reduceMotion: boolean }) {
  const { ref, onMove, onLeave } = useTilt(6);

  return (
    <motion.li
      className="relative pl-10 sm:pl-12"
      initial={reduceMotion ? false : { opacity: 0, y: 40, rotateX: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: "1000px", transformOrigin: "bottom center" }}
    >
      {/* dot + ripple */}
      <span className="absolute left-0 top-1.5 sm:left-1" aria-hidden>
        <motion.span
          className="flex size-[1.35rem] items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-sm"
          initial={reduceMotion ? false : { scale: 0 }}
          whileInView={reduceMotion ? undefined : { scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.2 + 0.25, type: "spring", stiffness: 220 }}
        >
          <Briefcase className="size-3.5" />
        </motion.span>
        <motion.span
          className="absolute inset-0 rounded-full border border-primary/50"
          initial={reduceMotion ? false : { scale: 1, opacity: 0.9 }}
          whileInView={reduceMotion ? undefined : { scale: 2.6, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: index * 0.2 + 0.55, ease: "easeOut" }}
        />
      </span>

      {/* 3-D tiltable card */}
      <article
        ref={ref as React.Ref<HTMLElement>}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
          transformStyle: "preserve-3d",
          /* thick bottom shadow = "resting on a surface" depth */
          boxShadow: "0 8px 0 0 rgba(99,102,241,0.10), 0 10px 40px -8px rgba(0,0,0,0.25)",
        }}
        className="rounded-2xl border border-border/80 bg-card/70 p-6 dark:bg-card/50"
      >
        {/* top highlight edge */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.5) 40%, rgba(196,181,253,0.6) 60%, transparent)" }}
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
              {job.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Current
                </span>
              )}
            </div>
            <motion.p
              className="text-sm font-medium"
              initial={reduceMotion ? false : { backgroundSize: "0% 100%" }}
              whileInView={reduceMotion ? undefined : { backgroundSize: "100% 100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: index * 0.2 + 0.4, ease: "easeOut" }}
              style={{
                backgroundImage: "linear-gradient(90deg, #818cf8, #a78bfa)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {job.company}
            </motion.p>
          </div>
          <div className="text-left text-xs text-muted-foreground sm:text-right">
            <p className="font-mono">{job.period}</p>
            <p>{job.location}</p>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {job.bullets.map((b, bi) => (
            <motion.li
              key={b}
              className="flex gap-2"
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.32, delay: index * 0.2 + bi * 0.07 + 0.4, ease: "easeOut" }}
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>

        {index === experience.length - 1 && (
          <p className="mt-4 text-xs text-muted-foreground">References available upon request.</p>
        )}
      </article>
    </motion.li>
  );
}
