"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Code2, Globe, Layers, Users, Wrench } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { skillGroups } from "@/lib/data";
import type { SkillGroup } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2, layers: Layers, wrench: Wrench,
  book: BookOpen, users: Users, globe: Globe,
};

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
            Grouped for scanability — optimized for how recruiters and engineers skim portfolios.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = iconMap[group.icon];
            return (
              <motion.div
                key={group.id}
                /* flip-up from surface on entrance */
                initial={reduceMotion ? false : { opacity: 0, y: 28, rotateX: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: "900px", transformOrigin: "bottom center" }}
                whileHover={reduceMotion ? undefined : { y: -5, scale: 1.015 }}
                className="group rounded-2xl border border-border/80 bg-card/60 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-[0_12px_36px_rgba(99,102,241,0.15)] dark:bg-card/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  {/* icon spring-jiggle on hover */}
                  <motion.span
                    className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
                    whileHover={reduceMotion ? undefined : {
                      scale: 1.22,
                      rotate: [0, -12, 12, -6, 0],
                      transition: { duration: 0.45, ease: "easeInOut" },
                    }}
                  >
                    <Icon className="size-4" aria-hidden />
                  </motion.span>

                  {/* title with animated underline on hover */}
                  <h3 className="relative text-base font-semibold text-foreground">
                    {group.title}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <motion.li
                      key={item}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: i * 0.05 + j * 0.04, ease: "backOut" }}
                      whileHover={reduceMotion ? undefined : { y: -3 }}
                    >
                      <span className={cn(
                        "inline-flex cursor-default items-center rounded-full border border-border/80 bg-background/80 px-3 py-1 font-mono text-xs text-foreground/90 shadow-sm",
                        "transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_rgba(99,102,241,0.20)]"
                      )}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
