"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function AnimatedSection({
  id,
  children,
  className,
  "aria-label": ariaLabel,
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-label={ariaLabel}
      className={cn("scroll-mt-24 relative", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-[1] h-px w-[min(100%,42rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/18 to-transparent opacity-60 dark:via-primary/35 dark:opacity-70"
      />
      {children}
    </motion.section>
  );
}
