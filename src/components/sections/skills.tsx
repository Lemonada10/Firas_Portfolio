"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { BookOpen, Code2, Globe, Layers, Users, Wrench } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { skillGroups } from "@/lib/data";
import type { SkillGroup } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2, layers: Layers, wrench: Wrench,
  book: BookOpen, users: Users, globe: Globe,
};

const tiltReset = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";

const skillCardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const skillGridContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const reducedMotionCardVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

const reducedMotionGridVariants: Variants = {
  hidden: {},
  show: {},
};

function SkillCard({ group }: { group: SkillGroup }) {
  const reduceMotion = useReducedMotion();
  const Icon = iconMap[group.icon];
  const tiltRef = React.useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !tiltRef.current) return;
    const el = tiltRef.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 12}deg) rotateY(${(x - 0.5) * 12}deg) scale3d(1.03,1.03,1.03)`;
  };

  const onLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = tiltReset;
  };

  return (
    <motion.div
      variants={reduceMotion ? reducedMotionCardVariants : skillCardVariants}
      className="h-full"
    >
      {/* No backdrop-blur / hover shadow transition — they recomposite and fight :hover on pills */}
      <div className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card/85 shadow-sm dark:bg-card/40 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_28px_-8px_rgba(0,0,0,0.45)]">
        <div
          ref={tiltRef}
          onMouseMove={reduceMotion ? undefined : onMove}
          onMouseLeave={reduceMotion ? undefined : onLeave}
          style={{
            transform: tiltReset,
            transition: "transform 0.15s ease",
            transformStyle: "preserve-3d",
          }}
          className="px-6 pt-6"
        >
          <div
            className="mb-4 flex items-center gap-3"
            style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          >
            <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
              <Icon className="size-4" aria-hidden />
            </span>
            <h3 className="relative text-base font-semibold text-foreground">
              {group.title}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-[width] duration-300 ease-out group-hover:w-full" />
            </h3>
          </div>
        </div>

        <div className="px-6 pb-6 pt-1" style={{ contain: "layout paint" }}>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={item}
                  className={cn(
                    "inline-flex cursor-default select-none items-center rounded-full border border-border/80 bg-background/90 px-3 py-1 font-mono text-xs text-foreground/90",
                    "outline-none transition-colors duration-150",
                    "hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function SkillGrid() {
  const reduceMotion = useReducedMotion();
  const gridRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.08, margin: "-80px" });

  return (
    <motion.div
      ref={gridRef}
      className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      variants={reduceMotion ? reducedMotionGridVariants : skillGridContainerVariants}
      initial="hidden"
      animate={reduceMotion || inView ? "show" : "hidden"}
    >
      {skillGroups.map((group) => (
        <SkillCard key={group.id} group={group} />
      ))}
    </motion.div>
  );
}

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection id="skills" aria-label="Skills" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.2em] text-primary"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Skills
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            Tools I reach for in real projects
          </motion.h2>
          <motion.p
            className="mt-4 text-muted-foreground"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >

          </motion.p>
        </div>

        <SkillGrid />
      </div>
    </AnimatedSection>
  );
}
