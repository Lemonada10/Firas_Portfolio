"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/components/providers/language-provider";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";

export const OPEN_RESUME_EVENT = "open-resume-preview";

export function openResumePreview() {
  window.dispatchEvent(new Event(OPEN_RESUME_EVENT));
}

export function openResumeTab() {
  window.open(personal.resumeUrl, "_blank", "noopener,noreferrer");
}

/**
 * Full-viewport PDF viewer portaled to <body> so it is never trapped
 * inside a stacking context or a dialog that refuses to render PDFs.
 */
export function ResumeDialog() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_RESUME_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_RESUME_EVENT, onOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="resume"
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label={t.resume.close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.resume.title}
            className="relative flex h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-base font-semibold">
                  <FileText className="size-4 text-primary" aria-hidden />
                  {t.resume.title}
                </p>
                <p className="text-xs text-muted-foreground">{t.resume.subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
                >
                  <ExternalLink className="size-3.5" aria-hidden />
                  {t.resume.openTab}
                </a>
                <a
                  href={personal.resumeUrl}
                  download="Firas_Al_Haddad_CV.pdf"
                  className={cn(buttonVariants({ size: "sm" }), "gap-2")}
                >
                  <Download className="size-3.5" aria-hidden />
                  {t.resume.download}
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                  aria-label={t.resume.close}
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <iframe
              title={t.resume.title}
              src={`${personal.resumeUrl}#view=FitH`}
              className="min-h-0 w-full flex-1 bg-muted"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
