"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SplitHeading } from "@/components/ui/text-split";

const PATH = "M40 140 C 140 140, 180 40, 280 80 S 420 220, 520 140 H 600";

const LAYERS = [
  {
    id: "bronze",
    name: "Bronze",
    tone: "from-amber-800/80 to-amber-600/50",
    ring: "border-amber-700/40",
    stages: [0, 1],
    copy: "Ingest raw finance, supplier, parts, and commodity sources — 10+ datasets landing in reusable bronze tables.",
  },
  {
    id: "silver",
    name: "Silver",
    tone: "from-slate-400/70 to-zinc-300/40",
    ring: "border-slate-400/50",
    stages: [2],
    copy: "Validate, deduplicate, and standardize units, prices, and mappings from market-data APIs.",
  },
  {
    id: "gold",
    name: "Gold",
    tone: "from-yellow-500/80 to-amber-300/50",
    ring: "border-yellow-500/40",
    stages: [3, 4],
    copy: "Publish Parquet models and Power BI views — 10 years of metals pricing, alloy costs, and cost drivers.",
  },
] as const;

const STAGES = ["Ingest", "Validate", "Model", "Parquet", "Power BI"];

export function Pipeline() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = React.useState<(typeof LAYERS)[number]["id"]>("gold");
  const detail = LAYERS.find((l) => l.id === active) ?? LAYERS[2];

  return (
    <AnimatedSection
      id="pipeline"
      aria-label="Medallion data pipeline"
      className="overflow-hidden py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">02 · Signature</p>
          <SplitHeading className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Medallion pipeline
          </SplitHeading>
          <p className="mt-4 text-muted-foreground">
            How I think about production data at Pratt & Whitney — hover Bronze, Silver, or Gold to see each layer.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/50 p-4 dark:bg-card/30">
            <svg viewBox="0 0 640 280" className="h-auto w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="pipe" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.3" />
                </linearGradient>
                <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path d={PATH} fill="none" stroke="url(#pipe)" strokeWidth="3" strokeLinecap="round" />
              {!reduceMotion && (
                <path
                  d={PATH}
                  fill="none"
                  stroke="rgba(99,102,241,0.55)"
                  strokeWidth="1.5"
                  strokeDasharray="6 10"
                  className="motion-safe:animate-[pipe-dash_1.1s_linear_infinite]"
                />
              )}
              {!reduceMotion && (
                <>
                  <circle
                    r="8"
                    fill="#6366f1"
                    filter="url(#packet-glow)"
                    style={{ offsetPath: `path('${PATH}')` }}
                    className="motion-safe:animate-[packet-run_5s_linear_infinite]"
                  />
                  <circle
                    r="5"
                    fill="#818cf8"
                    style={{ offsetPath: `path('${PATH}')` }}
                    className="motion-safe:animate-[packet-run_5s_linear_infinite] [animation-delay:-1.6s]"
                  />
                  <circle
                    r="3.5"
                    fill="#a78bfa"
                    style={{ offsetPath: `path('${PATH}')` }}
                    className="motion-safe:animate-[packet-run_5s_linear_infinite] [animation-delay:-3.2s]"
                  />
                </>
              )}
            </svg>
            <div className="mt-1 flex flex-wrap justify-between gap-2">
              {STAGES.map((s, i) => (
                <span
                  key={s}
                  className={`rounded-full border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                    detail.stages.some((n) => n === i)
                      ? "border-primary/50 text-primary"
                      : "border-border/70 text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {LAYERS.map((layer) => {
              const on = active === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onMouseEnter={() => setActive(layer.id)}
                  onFocus={() => setActive(layer.id)}
                  className={`w-full rounded-2xl border bg-gradient-to-r p-4 text-left transition-all ${layer.tone} ${layer.ring} ${
                    on ? "scale-[1.015] border-primary/40 shadow-[0_12px_40px_rgba(99,102,241,0.18)]" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/80">{layer.name} layer</p>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        key={layer.id}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 overflow-hidden text-sm leading-relaxed text-foreground"
                      >
                        {layer.copy}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
