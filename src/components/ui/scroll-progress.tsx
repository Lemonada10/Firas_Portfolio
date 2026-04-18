"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduceMotion) return null;

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-primary/60 via-[color:var(--brand)]/80 to-primary/60"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}

