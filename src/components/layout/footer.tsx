"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe, Mail } from "lucide-react";
import { IconLinkedIn } from "@/components/icons/social";
import { personal } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative border-t border-border/70 bg-muted/40 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/18 before:to-transparent dark:border-white/[0.07] dark:bg-black/20 dark:before:via-primary/35">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-semibold text-foreground">{personal.name}</p>
          <p className="text-sm text-muted-foreground">
            Software Engineering Co-op · {personal.school}
          </p>
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4" aria-hidden />
            Email
          </a>
          <a
            href={personal.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconLinkedIn className="size-4" />
            LinkedIn
          </a>
          <a
            href={personal.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Globe className="size-4" aria-hidden />
            Portfolio
          </a>
        </motion.div>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs text-muted-foreground sm:text-right"
        >
          © {year} {personal.name.split(" ")[0]} Al Haddad. Built with Next.js.
        </motion.p>
      </div>
    </footer>
  );
}
