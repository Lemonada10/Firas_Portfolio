"use client";

import * as React from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useI18n } from "@/components/providers/language-provider";

/**
 * Softens the EN/FR swap: content dips out and settles back in instead of
 * snapping. Opacity only — a filter or transform here would create a
 * containing block and break the shared-element project transitions.
 */
export function LocaleFade({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const firstRun = React.useRef(true);

  React.useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (reduceMotion) return;
    controls.set({ opacity: 0.3 });
    controls.start({
      opacity: 1,
      transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
    });
  }, [locale, controls, reduceMotion]);

  return <motion.div animate={controls}>{children}</motion.div>;
}
