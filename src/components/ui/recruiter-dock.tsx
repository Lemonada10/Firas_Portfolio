"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, FileText, Mail } from "lucide-react";
import { IconLinkedIn } from "@/components/icons/social";
import { useI18n } from "@/components/providers/language-provider";
import { personal } from "@/lib/data";
import { copyText } from "@/components/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function RecruiterDock() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const items = [
    {
      id: "top",
      label: t.extras.backToTop,
      icon: ArrowUp,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      id: "email",
      label: t.extras.dockEmail,
      icon: Mail,
      onClick: () => copyText(personal.email, t.extras.emailCopied),
    },
    {
      id: "resume",
      label: t.extras.dockResume,
      icon: FileText,
      href: personal.resumeUrl,
    },
    {
      id: "linkedin",
      label: t.extras.dockLinkedin,
      icon: IconLinkedIn,
      href: personal.linkedInUrl,
    },
  ];

  return (
    <motion.nav
      aria-label={t.extras.dockAria}
      className="fixed bottom-5 right-5 z-[70] hidden sm:block"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
    >
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-card/90 p-1.5 shadow-lg backdrop-blur-md">
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const Icon = item.icon;
            const inner = (
              <span className="inline-flex size-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                <Icon className="size-4" />
              </span>
            );
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger
                  render={
                    item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                      />
                    ) : (
                      <button type="button" onClick={item.onClick} aria-label={item.label} />
                    )
                  }
                >
                  {inner}
                </TooltipTrigger>
                <TooltipContent side="top">{item.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
