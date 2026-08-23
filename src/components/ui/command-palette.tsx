"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Copy,
  Download,
  FolderGit2,
  Home,
  Mail,
  Moon,
  Phone,
  Sparkles,
  Sun,
  User,
  Workflow,
} from "lucide-react";
import { personal } from "@/lib/data";

const SECTIONS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "pipeline", label: "Pipeline", icon: Workflow },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: Mail },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [copied, setCopied] = React.useState<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      /* ignore */
    }
  };

  const go = (id: string) => {
    setOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      history.replaceState(null, "", `/#${id}`);
      return;
    }
    router.push(`/#${id}`);
  };

  const q = query.toLowerCase();
  const sectionHits = SECTIONS.filter((s) => s.label.toLowerCase().includes(q));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-background/70 px-4 pt-[12vh] backdrop-blur-sm"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jump, copy, or toggle…"
              className="w-full border-b border-border/70 bg-transparent px-4 py-3 text-sm outline-none"
            />
            <div className="max-h-[min(60vh,22rem)] overflow-y-auto p-2">
              <p className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Navigate</p>
              {sectionHits.map((s) => (
                <button key={s.id} type="button" onClick={() => go(s.id)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/10">
                  <s.icon className="size-4 text-primary" aria-hidden />
                  {s.label}
                </button>
              ))}
              <p className="mt-2 px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Actions</p>
              <button type="button" onClick={() => copy(personal.email, "Email")} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10">
                <Copy className="size-4 text-primary" aria-hidden /> Copy email
              </button>
              <button type="button" onClick={() => copy(personal.phone, "Phone")} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10">
                <Phone className="size-4 text-primary" aria-hidden /> Copy phone
              </button>
              <a href={personal.resumeUrl} download onClick={() => setOpen(false)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10">
                <Download className="size-4 text-primary" aria-hidden /> Download resume
              </a>
              <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10">
                {resolvedTheme === "dark" ? <Sun className="size-4 text-primary" aria-hidden /> : <Moon className="size-4 text-primary" aria-hidden />}
                Toggle theme
              </button>
              {copied && (
                <p className="px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400" role="status">
                  Copied {copied}
                </p>
              )}
            </div>
            <p className="border-t border-border/70 px-4 py-2 text-[11px] text-muted-foreground">Esc to close · ⌘K / Ctrl+K to toggle</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandHint() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      className="hidden items-center gap-1 rounded-md border border-border/70 px-2 py-1 font-mono text-[10px] text-muted-foreground lg:inline-flex"
      aria-label="Open command palette"
    >
      <kbd>⌘K</kbd>
    </button>
  );
}
