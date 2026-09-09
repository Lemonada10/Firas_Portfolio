"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Cloud, Code2, Layers, Monitor } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { projectLabel } from "@/lib/data";
import type { SkillGroup, SkillRelated } from "@/types";
import { cn } from "@/lib/utils";
import { SplitHeading } from "@/components/ui/text-split";
import { useI18n } from "@/components/providers/language-provider";
import { useContent } from "@/hooks/use-content";

const iconMap: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  layers: Layers,
  wrench: Code2,
  book: Code2,
  users: Code2,
  globe: Code2,
  cloud: Cloud,
  monitor: Monitor,
};

const skillCardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const skillGridContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

function relatedKey(r: SkillRelated | null | undefined) {
  if (!r) return "";
  return `${(r.jobs ?? []).join(",")}|${(r.projects ?? []).join(",")}`;
}

export function Skills() {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const { skillGroups, jobLabel } = useContent();
  const gridRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.08, margin: "-80px" });
  const [active, setActive] = React.useState<SkillRelated | null>(null);
  const [pinned, setPinned] = React.useState(false);

  const highlightedJobs = new Set(active?.jobs ?? []);
  const highlightedProjects = new Set(active?.projects ?? []);
  const hasLinks = highlightedJobs.size > 0 || highlightedProjects.size > 0;

  const select = (related: SkillRelated | undefined, pin: boolean) => {
    if (!related || relatedKey(related) === "") {
      if (pin) {
        setActive(null);
        setPinned(false);
      }
      return;
    }
    if (pin) {
      const same = pinned && relatedKey(active) === relatedKey(related);
      if (same) {
        setPinned(false);
        setActive(null);
        return;
      }
      setActive(related);
      setPinned(true);
      return;
    }
    if (!pinned) setActive(related);
  };

  return (
    <AnimatedSection id="skills" aria-label={t.nav.skills} className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p className="font-mono text-xs uppercase tracking-[0.2em] text-primary" initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            {t.skills.eyebrow}
          </motion.p>
          <SplitHeading className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.skills.heading}
          </SplitHeading>
          <motion.p className="mt-4 text-muted-foreground" initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
            {t.skills.subtitle}
          </motion.p>
        </div>

        <div className="mt-8 flex min-h-[2.25rem] flex-wrap items-center justify-center gap-2" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {hasLinks ? (
              <>
                {Array.from(highlightedJobs).map((id) => (
                  <motion.span key={`j-${id}`} layout initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {jobLabel[id] ?? id}
                  </motion.span>
                ))}
                {Array.from(highlightedProjects).map((id) => (
                  <motion.span key={`p-${id}`} layout initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} className="rounded-full border border-violet-400/35 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-800 dark:text-violet-300">
                    {projectLabel[id] ?? id}
                  </motion.span>
                ))}
              </>
            ) : (
              <motion.span key="idle" className="text-xs text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {t.skills.idle}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          ref={gridRef}
          className="mt-6 grid gap-8 sm:grid-cols-2"
          variants={reduceMotion ? undefined : skillGridContainerVariants}
          initial="hidden"
          animate={reduceMotion || inView ? "show" : "hidden"}
        >
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon];
            return (
              <motion.div key={group.id} variants={reduceMotion ? undefined : skillCardVariants} className="rounded-2xl border border-border/80 bg-card/85 p-6 shadow-sm dark:bg-card/40">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => {
                    const lit = Boolean(active) && relatedKey(item.related) === relatedKey(active);
                    const dimmed =
                      Boolean(active) &&
                      !lit &&
                      ((item.related?.jobs?.some((j) => highlightedJobs.has(j)) ?? false) ||
                        (item.related?.projects?.some((p) => highlightedProjects.has(p)) ?? false));
                    return (
                      <li key={item.name}>
                        <motion.button
                          type="button"
                          initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03, type: "spring", stiffness: 380, damping: 22 }}
                          whileHover={reduceMotion ? undefined : { y: -2, scale: 1.04 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                          onMouseEnter={() => select(item.related, false)}
                          onMouseLeave={() => {
                            if (!pinned) setActive(null);
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            select(item.related, true);
                          }}
                          aria-pressed={lit}
                          className={cn(
                            "inline-flex cursor-pointer items-center rounded-full border px-3 py-1 font-mono text-xs outline-none transition-colors",
                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            lit
                              ? "border-primary/50 bg-primary/15 text-primary"
                              : dimmed
                                ? "border-primary/30 bg-primary/8 text-primary/90"
                                : "border-border/80 bg-background/90 text-foreground/90 hover:border-primary/40"
                          )}
                        >
                          {item.name}
                        </motion.button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
