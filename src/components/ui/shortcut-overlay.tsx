"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/components/providers/language-provider";
import { personal } from "@/lib/data";

export function ShortcutOverlay() {
  const [open, setOpen] = React.useState(false);
  const { t, toggleLocale } = useI18n();
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;
      if (typing) return;

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
      if (e.key.toLowerCase() === "r" && !e.metaKey && !e.ctrlKey) {
        window.open(personal.resumeUrl, "_blank", "noopener,noreferrer");
      }
      if (e.key.toLowerCase() === "l" && !e.metaKey && !e.ctrlKey) {
        toggleLocale();
      }
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleLocale]);

  const rows = [
    { keys: "⌘K", label: t.extras.keyPalette },
    { keys: "R", label: t.extras.keyResume },
    { keys: "L", label: t.extras.keyLang },
    { keys: "G", label: t.extras.keyTop },
    { keys: "?", label: t.extras.keyHelp },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[115] flex items-center justify-center bg-background/70 px-4 backdrop-blur-sm"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label={t.extras.keysTitle}
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-semibold">{t.extras.keysTitle}</p>
            <ul className="mt-4 space-y-2">
              {rows.map((row) => (
                <li key={row.keys} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <kbd className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px]">
                    {row.keys}
                  </kbd>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              {t.extras.keysClose}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
