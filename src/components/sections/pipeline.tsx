"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SplitHeading } from "@/components/ui/text-split";
import { useI18n } from "@/components/providers/language-provider";

/** Visual identity of each medallion layer; the copy comes from the dictionary. */
const LAYERS = [
  {
    id: "landing",
    tone: "from-cyan-900/60 to-teal-800/30",
    ring: "border-cyan-600/40",
    activeShadow: "shadow-[0_0_32px_rgba(6,182,212,0.25)]",
    dot: "bg-cyan-400",
    glow: "rgba(6,182,212,0.3)",
    stages: [0, 1],
  },
  {
    id: "bronze",
    tone: "from-amber-900/60 to-amber-700/30",
    ring: "border-amber-700/40",
    activeShadow: "shadow-[0_0_32px_rgba(217,119,6,0.28)]",
    dot: "bg-amber-400",
    glow: "rgba(217,119,6,0.3)",
    stages: [2, 3],
  },
  {
    id: "silver",
    tone: "from-slate-700/60 to-zinc-600/30",
    ring: "border-slate-400/50",
    activeShadow: "shadow-[0_0_32px_rgba(148,163,184,0.22)]",
    dot: "bg-slate-300",
    glow: "rgba(148,163,184,0.25)",
    stages: [4],
  },
  {
    id: "gold",
    tone: "from-yellow-900/60 to-amber-700/30",
    ring: "border-yellow-500/40",
    activeShadow: "shadow-[0_0_32px_rgba(234,179,8,0.28)]",
    dot: "bg-yellow-400",
    glow: "rgba(234,179,8,0.3)",
    stages: [5],
  },
  {
    id: "platinum",
    tone: "from-purple-900/60 to-violet-800/30",
    ring: "border-purple-500/40",
    activeShadow: "shadow-[0_0_32px_rgba(168,85,247,0.30)]",
    dot: "bg-purple-400",
    glow: "rgba(168,85,247,0.3)",
    stages: [5, 6],
  },
] as const;

type LayerId = (typeof LAYERS)[number]["id"];

/** A single animated data-packet travelling down a connector */
function DataPacket({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 size-[7px] rounded-full"
      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      initial={{ top: "0%", opacity: 0 }}
      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 1.1,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        times: [0, 0.1, 0.9, 1],
      }}
    />
  );
}

export function Pipeline() {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const [active, setActive] = React.useState<LayerId>("bronze");
  const STAGES = t.pipeline.stages;

  const activeLayer = LAYERS.find((l) => l.id === active) ?? LAYERS[1];
  const activeText = t.pipeline.layers[active];

  return (
    <AnimatedSection
      id="pipeline"
      aria-label={t.pipeline.aria}
      className="overflow-hidden py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {t.pipeline.eyebrow}
          </p>
          <SplitHeading className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.pipeline.heading}
          </SplitHeading>
          <p className="mt-4 text-muted-foreground">{t.pipeline.subtitle}</p>
        </div>

        {/* pipeline body */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">

          {/* ── LEFT: vertical layer flow ── */}
          <div className="relative flex flex-col">
            {/* background connector line */}
            <div
              className="pointer-events-none absolute bottom-0 top-0 w-px bg-gradient-to-b from-cyan-500/20 via-primary/15 to-purple-500/20"
              style={{ left: "1.05rem" }}
              aria-hidden
            />

            {LAYERS.map((layer, idx) => {
              const on = active === layer.id;
              const text = t.pipeline.layers[layer.id];
              const isLast = idx === LAYERS.length - 1;

              return (
                <React.Fragment key={layer.id}>
                  {/* Layer button */}
                  <button
                    type="button"
                    onMouseEnter={() => setActive(layer.id)}
                    onFocus={() => setActive(layer.id)}
                    onClick={() => setActive(layer.id)}
                    className={[
                      "group relative flex items-start gap-4 rounded-2xl border bg-gradient-to-r p-4 text-left transition-all duration-300",
                      layer.tone,
                      layer.ring,
                      on
                        ? `scale-[1.02] border-opacity-80 ${layer.activeShadow}`
                        : "opacity-70 hover:opacity-90 hover:scale-[1.01]",
                    ].join(" ")}
                    aria-pressed={on}
                  >
                    {/* animated dot */}
                    <span className="relative mt-0.5 shrink-0" aria-hidden>
                      <span className={`block size-3.5 rounded-full ${layer.dot} transition-transform duration-200 ${on ? "scale-125" : ""}`} />
                      {on && !reduceMotion && (
                        <motion.span
                          className={`absolute inset-0 rounded-full ${layer.dot}`}
                          initial={{ scale: 1, opacity: 0.7 }}
                          animate={{ scale: 2.4, opacity: 0 }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                    </span>

                    {/* text + stage chips */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/90">
                          {text.name}
                          {" "}
                          <span className="text-foreground/50">{t.pipeline.layerSuffix}</span>
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {layer.stages.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/70"
                            >
                              {STAGES[s]}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* animated connector between layers */}
                  {!isLast && (
                    <div
                      className="relative ml-[1.05rem] h-10"
                      aria-hidden
                    >
                      <div className="absolute left-0 top-0 h-full w-px -translate-x-1/2 bg-border/40" />
                      {!reduceMotion && (
                        <DataPacket delay={idx * 0.22} color={layer.glow} />
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* ── RIGHT: detail panel ── */}
          <div
            className="sticky top-24 overflow-hidden rounded-3xl border border-border/70 bg-card/50 backdrop-blur-md dark:bg-card/30"
            style={{ minHeight: "18rem" }}
          >
            {/* glow strip at top matching active layer */}
            <motion.div
              className="absolute inset-x-0 top-0 h-px"
              animate={{ background: `linear-gradient(90deg, transparent, ${activeLayer.glow} 40%, ${activeLayer.glow} 60%, transparent)` }}
              transition={{ duration: 0.4 }}
              aria-hidden
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col gap-5 p-7 sm:p-8"
              >
                {/* layer badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`size-3.5 rounded-full ${activeLayer.dot}`}
                    aria-hidden
                  />
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {activeText.name} {t.pipeline.layerSuffix}
                  </p>
                </div>

                {/* description */}
                <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {activeText.copy}
                </p>

                {/* stage chips */}
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {activeLayer.stages.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
                    >
                      {STAGES[s]}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ambient glow */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-10"
              animate={{
                background: `radial-gradient(ellipse 70% 50% at 80% 80%, ${activeLayer.glow}, transparent)`,
              }}
              transition={{ duration: 0.5 }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
