"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { heroRotatingRoles, personal } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ── CSS-based 3-D tilt hook ─────────────────────────────────── */
function useTilt3D(maxDeg = 10) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !ref.current) return;
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * maxDeg}deg) rotateY(${(x - 0.5) * maxDeg}deg) scale3d(1.03,1.03,1.03)`;
    },
    [reduceMotion, maxDeg]
  );

  const onLeave = React.useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, []);

  return { ref, onMove, onLeave, reduceMotion };
}

/* ─── typewriter ──────────────────────────────────────────────── */
function useTypewriter(words: string[], typingMs = 55, pauseMs = 2000) {
  const [display, setDisplay] = React.useState("");
  const [wordIdx, setWordIdx] = React.useState(0);
  const [phase, setPhase] = React.useState<"typing"|"pausing"|"erasing">("typing");
  const [charIdx, setCharIdx] = React.useState(0);

  React.useEffect(() => {
    const word = words[wordIdx];
    if (phase === "typing") {
      if (charIdx < word.length) {
        const t = setTimeout(() => { setDisplay(word.slice(0, charIdx+1)); setCharIdx(c=>c+1); }, typingMs + Math.random()*30);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pauseMs);
      return () => clearTimeout(t);
    }
    if (phase === "pausing") { const t = setTimeout(() => setPhase("erasing"), 120); return () => clearTimeout(t); }
    if (phase === "erasing") {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplay(word.slice(0, charIdx-1)); setCharIdx(c=>c-1); }, typingMs*0.55);
        return () => clearTimeout(t);
      }
      setWordIdx(i => (i+1) % words.length);
      setPhase("typing");
    }
  }, [phase, charIdx, wordIdx, words, typingMs, pauseMs]);

  return display;
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const typed = useTypewriter(heroRotatingRoles);
  const word = reduceMotion ? heroRotatingRoles[0] : typed;
  const heroRef = React.useRef<HTMLElement>(null);
  const tilt = useTilt3D(9);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);
  const scrollTranslateY = useTransform(scrollYProgress, [0, 0.6], [0, -30]);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Introduction"
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28"
    >
      <motion.div
        className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16"
        style={
          reduceMotion
            ? undefined
            : { opacity: scrollOpacity, y: scrollTranslateY }
        }
      >

        {/* ── LEFT ── */}
        <div className="flex-1 space-y-8">

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Badge className="gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:text-emerald-300">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to internship opportunities
            </Badge>
            <Badge variant="outline" className="gap-1.5 rounded-full text-muted-foreground">
              <Sparkles className="size-3.5" aria-hidden />
              Montreal, QC
            </Badge>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22,1,0.36,1] }}
            className="space-y-4"
          >
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">{personal.name.split(" ")[0]}</span>
              {/* Surname: deep violet in light (readable); soft shimmer in dark */}
              <span
                className={cn(
                  "block bg-clip-text text-transparent",
                  "bg-[linear-gradient(135deg,#312e81_0%,#5b21b6_38%,#4c1d95_52%,#5b21b6_65%,#3730a3_100%)]",
                  "dark:bg-[linear-gradient(135deg,#818cf8_0%,#c4b5fd_25%,#e0d9ff_50%,#c4b5fd_75%,#818cf8_100%)]",
                  !reduceMotion &&
                    "bg-[length:200%_auto] motion-safe:animate-[text-shimmer_5s_linear_infinite]"
                )}
              >
                {personal.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
              {personal.headline}
            </p>

            <p className="font-mono text-sm text-primary sm:text-base" aria-live="polite">
              <span className="text-muted-foreground">Currently: </span>
              <span className="font-semibold text-foreground">{word}</span>
              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse rounded-sm bg-primary" aria-hidden />
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group gap-2 shadow-[0_0_22px_rgba(99,102,241,0.40)] transition-all duration-300 hover:shadow-[0_0_38px_rgba(99,102,241,0.65)] hover:scale-[1.02]"
              )}
            >
              View featured work
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href="/resume.pdf"
              download
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "transition-all duration-300 hover:scale-[1.02]"
              )}
            >
              Download resume
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: floating code card ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22,1,0.36,1] }}
          className="relative flex-1"
          style={{ animation: reduceMotion ? undefined : "float-card 6s ease-in-out infinite" }}
        >
          {/* glow ring — purple only in dark; omitted in light */}
          <div
            className="absolute -inset-3 hidden rounded-3xl opacity-30 dark:block"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.5), transparent 70%)",
              filter: "blur(16px)",
            }}
          />

          <div
            ref={tilt.ref}
            onMouseMove={tilt.reduceMotion ? undefined : tilt.onMove}
            onMouseLeave={tilt.reduceMotion ? undefined : tilt.onLeave}
            style={{
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-xl backdrop-blur-md hover:shadow-[0_20px_50px_rgba(80,90,255,0.30)] dark:bg-card/70"
          >
            {/* inner tint: neutral in light, violet wash in dark */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/[0.07] via-transparent to-slate-600/[0.05] dark:from-primary/6 dark:via-transparent dark:to-violet-500/6" />

            {/* top accent — slate in light, lavender in dark */}
            <div
              className="absolute inset-x-0 top-0 h-px dark:hidden"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(71,85,105,0.35) 45%, rgba(100,116,139,0.45) 50%, rgba(71,85,105,0.35) 55%, transparent)",
              }}
            />
            <div
              className="absolute inset-x-0 top-0 hidden h-px dark:block"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(129,140,248,0.6) 40%, rgba(196,181,253,0.7) 60%, transparent)",
              }}
            />

            <div className="p-6" style={{ transform: "translateZ(28px)", transformStyle: "preserve-3d" }}>
            <div className="space-y-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-yellow-400/80" />
                  <span className="size-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-[11px] text-muted-foreground/60">focus.ts</span>
                <span className="rounded bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wider">portfolio</span>
              </div>
              <pre className="overflow-x-auto text-left">
                <code>
                  <span className="text-indigo-800 dark:text-violet-400">const</span>
                  <span className="text-foreground/90"> engineer </span>
                  <span className="text-indigo-800 dark:text-violet-400">=</span>
                  <span className="text-foreground/90">{" {\n"}</span>
                  <span className="text-foreground/50">{"  "}</span>
                  <span className="text-sky-400">school</span>
                  <span className="text-foreground/70">{": "}</span>
                  <span className="text-emerald-400">&quot;Concordia · Software Eng (Co-op)&quot;</span>
                  <span className="text-foreground/70">{",\n"}</span>
                  <span className="text-foreground/50">{"  "}</span>
                  <span className="text-sky-400">strengths</span>
                  <span className="text-foreground/70">{": ["}</span>
                  <span className="text-emerald-400">&quot;data&quot;</span>
                  <span className="text-foreground/70">{", "}</span>
                  <span className="text-emerald-400">&quot;backend&quot;</span>
                  <span className="text-foreground/70">{", "}</span>
                  <span className="text-emerald-400">&quot;full-stack&quot;</span>
                  <span className="text-foreground/70">{"],\n"}</span>
                  <span className="text-foreground/50">{"  "}</span>
                  <span className="text-sky-400">languages</span>
                  <span className="text-foreground/70">{": ["}</span>
                  <span className="text-emerald-400">&quot;FR&quot;</span>
                  <span className="text-foreground/70">{", "}</span>
                  <span className="text-emerald-400">&quot;EN&quot;</span>
                  <span className="text-foreground/70">{"],\n"}</span>
                  <span className="text-foreground/50">{"  "}</span>
                  <span className="text-sky-400">gpa</span>
                  <span className="text-foreground/70">{": "}</span>
                  <span className="text-orange-400">3.4</span>
                  <span className="text-foreground/70">{",\n"}</span>
                  <span className="text-foreground/50">{"  "}</span>
                  <span className="text-sky-400">goal</span>
                  <span className="text-foreground/70">{": "}</span>
                  <span className="text-emerald-400">&quot;Ship reliable software that scales&quot;</span>
                  <span className="text-foreground/70">{",\n}"}</span>
                </code>
              </pre>
            </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
