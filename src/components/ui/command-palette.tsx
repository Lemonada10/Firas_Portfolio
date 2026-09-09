"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Check,
  Copy,
  Download,
  FileText,
  FolderGit2,
  Home,
  Languages,
  Mail,
  Moon,
  Phone,
  Sparkles,
  Sun,
  User,
  Workflow,
} from "lucide-react";
import { personal } from "@/lib/data";
import { useI18n } from "@/components/providers/language-provider";
import { openResumePreview } from "@/components/ui/resume-dialog";
import { toast } from "@/components/ui/toast";

const SECTIONS = [
  { id: "home", icon: Home },
  { id: "about", icon: User },
  { id: "pipeline", icon: Workflow },
  { id: "skills", icon: Sparkles },
  { id: "experience", icon: Briefcase },
  { id: "projects", icon: FolderGit2 },
  { id: "contact", icon: Mail },
] as const;

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [copied, setCopied] = React.useState<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { t, toggleLocale } = useI18n();

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

  const copy = async (value: string, id: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* still confirm so the click never feels dead */
    }
    setCopied(id);
    toast(message);
    window.setTimeout(() => setCopied(null), 2000);
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
  const sectionHits = SECTIONS.map((s) => ({ ...s, label: t.nav[s.id] })).filter((s) =>
    s.label.toLowerCase().includes(q)
  );

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
            aria-label={t.palette.aria}
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
              placeholder={t.palette.placeholder}
              className="w-full border-b border-border/70 bg-transparent px-4 py-3 text-sm outline-none"
            />
            <div className="max-h-[min(70vh,32rem)] overflow-y-auto p-2">
              <p className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.palette.navigate}</p>
              {sectionHits.map((s) => (
                <button key={s.id} type="button" onClick={() => go(s.id)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/10">
                  <s.icon className="size-4 text-primary" aria-hidden />
                  {s.label}
                </button>
              ))}
              <p className="mt-2 px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.palette.actions}</p>
              <button type="button" onClick={() => copy(personal.email, "email", t.extras.emailCopied)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10">
                <Copy className="size-4 text-primary" aria-hidden /> {t.palette.copyEmail}
                {copied === "email" && (
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <Check className="size-3.5" aria-hidden /> {t.palette.copied}
                  </span>
                )}
              </button>
              <button type="button" onClick={() => copy(personal.phone, "phone", t.extras.phoneCopied)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10">
                <Phone className="size-4 text-primary" aria-hidden /> {t.palette.copyPhone}
                {copied === "phone" && (
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <Check className="size-3.5" aria-hidden /> {t.palette.copied}
                  </span>
                )}
              </button>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10"
              >
                <FileText className="size-4 text-primary" aria-hidden /> {t.hero.openResume}
              </a>
              <a
                href={personal.resumeUrl}
                download="Firas_Al_Haddad_CV.pdf"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10"
              >
                <Download className="size-4 text-primary" aria-hidden /> {t.palette.downloadResume}
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openResumePreview();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10"
              >
                <FileText className="size-4 text-primary" aria-hidden /> {t.palette.previewResume}
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleLocale();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10"
              >
                <Languages className="size-4 text-primary" aria-hidden /> {t.palette.switchLanguage}
              </button>
              <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10">
                {resolvedTheme === "dark" ? <Sun className="size-4 text-primary" aria-hidden /> : <Moon className="size-4 text-primary" aria-hidden />}
                {t.palette.toggleTheme}
              </button>
            </div>
            <p className="border-t border-border/70 px-4 py-2 text-[11px] text-muted-foreground">{t.palette.hint}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandHint() {
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      className="hidden items-center gap-1 rounded-md border border-border/70 px-2 py-1 font-mono text-[10px] text-muted-foreground lg:inline-flex"
      aria-label={t.palette.open}
    >
      <kbd>⌘K</kbd>
    </button>
  );
}
