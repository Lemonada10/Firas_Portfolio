"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/components/providers/language-provider";
import { LOCALES, LOCALE_LABEL, LOCALE_NAME } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className="relative inline-flex items-center rounded-lg border border-border/70 bg-background/60 p-0.5"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={LOCALE_NAME[code]}
            className={cn(
              "relative z-10 rounded-md px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors",
              active
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 -z-10 rounded-md bg-primary"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 32 }
                }
              />
            )}
            {LOCALE_LABEL[code]}
          </button>
        );
      })}
    </div>
  );
}
