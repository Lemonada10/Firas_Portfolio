"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";
import { useI18n } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const IDS = ["home", "about", "pipeline", "skills", "experience", "projects", "contact"] as const;
const SECTION_IDS: string[] = [...IDS];

function go(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

export function SectionRail() {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const activeId = useActiveSection(SECTION_IDS);
  const reduceMotion = useReducedMotion();
  const onHome = pathname === "/";

  if (!onHome) return null;

  return (
    <nav
      aria-label={t.nav.primary}
      className="fixed left-4 top-1/2 z-[40] hidden -translate-y-1/2 xl:block"
    >
      <ul className="space-y-3">
        {IDS.map((id) => {
          const active = activeId === id;
          return (
            <li key={id}>
              <a
                href={`/#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onHome) {
                    go(id);
                    history.replaceState(null, "", `/#${id}`);
                  } else {
                    router.push(`/#${id}`);
                  }
                }}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    "block h-px rounded-full transition-all duration-300",
                    active
                      ? "w-7 bg-primary"
                      : "w-3 bg-foreground/25 group-hover:w-5 group-hover:bg-foreground/60"
                  )}
                />
                <motion.span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
                    active ? "text-primary" : "text-transparent group-hover:text-muted-foreground"
                  )}
                  animate={
                    reduceMotion || !active
                      ? undefined
                      : { opacity: [0.7, 1, 0.7] }
                  }
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  {t.nav[id]}
                </motion.span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
