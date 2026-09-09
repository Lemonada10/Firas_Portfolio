"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/components/providers/language-provider";

const KEY = "firas-boot-line";

export function BootLine() {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (reduceMotion) return;
    try {
      if (sessionStorage.getItem(KEY) === "1") return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      return;
    }
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 600);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="boot"
          className="pointer-events-none fixed inset-x-0 top-16 z-[60] flex justify-center px-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <p className="overflow-hidden rounded-full border border-border/70 bg-background/90 px-3 py-1 font-mono text-[11px] text-muted-foreground shadow-sm backdrop-blur">
            <motion.span
              className="inline-block"
              initial={{ x: "-110%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.boot.line}
            </motion.span>
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
