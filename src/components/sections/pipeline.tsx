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
    tone: "from-cyan-100/90 to-white dark:from-cyan-900/60 dark:to-teal-800/30",
    ring: "border-cyan-600/40",
    activeShadow: "shadow-[0_0_32px_rgba(6,182,212,0.25)]",
    dot: "bg-cyan-400",
    glow: "rgba(6,182,212,0.3)",
    stages: [0, 1],
  },
  {
    id: "bronze",
    tone: "from-amber-100/90 to-white dark:from-amber-900/60 dark:to-amber-700/30",
    ring: "border-amber-700/40",
    activeShadow: "shadow-[0_0_32px_rgba(217,119,6,0.28)]",
    dot: "bg-amber-400",
    glow: "rgba(217,119,6,0.3)",
    stages: [2],
  },
  {
    id: "silver",
    tone: "from-slate-200/90 to-white dark:from-slate-700/60 dark:to-zinc-600/30",
    ring: "border-slate-400/50",
    activeShadow: "shadow-[0_0_32px_rgba(148,163,184,0.22)]",
    dot: "bg-slate-300",
    glow: "rgba(148,163,184,0.25)",
    stages: [3],
  },
  {
    id: "gold",
    tone: "from-yellow-100/90 to-white dark:from-yellow-900/60 dark:to-amber-700/30",
    ring: "border-yellow-500/40",
    activeShadow: "shadow-[0_0_32px_rgba(234,179,8,0.28)]",
    dot: "bg-yellow-400",
    glow: "rgba(234,179,8,0.3)",
    stages: [4],
  },
  {
    id: "platinum",
    tone: "from-violet-100/90 to-white dark:from-purple-900/60 dark:to-violet-800/30",
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
  const { t, locale } = useI18n();
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

        <article className="mt-10 overflow-hidden rounded-3xl border border-primary/20 bg-card/95 shadow-[0_18px_60px_-30px_rgba(79,70,229,0.35)] dark:bg-[#151625]/95">
          <div className="border-b border-border/50 bg-gradient-to-br from-primary/10 via-transparent to-transparent px-6 py-7 sm:px-8 sm:py-9">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Pratt &amp; Whitney Canada · 2026</p>
            <h3 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
              {locale === "fr" ? "Centraliser les données pour les équipes de gestion des approvisionnements" : "Centralizing data for supply management"}
            </h3>
          </div>
          <div className="grid gap-7 p-6 md:grid-cols-3 md:gap-8 sm:p-8">
            {(
              locale === "fr"
                ? [
                    ["Le défi", "Les données et transformations étaient dispersées entre plusieurs sources et rapports. L'équipe avait besoin d'un emplacement commun et plus facile à maintenir."],
                    ["Ma contribution", "J'ai construit un pipeline ETL Python modulaire : intégration d'API et de fichiers SharePoint, architecture médaillon à cinq couches, orchestration et transformations réutilisables."],
                    ["Ce que cela permet", "Les données préparées sont centralisées dans SharePoint pour alimenter plusieurs produits. Le traitement en Python réduit les transformations nécessaires dans Power BI et facilite la maintenance."],
                  ]
                : [
                    ["The challenge", "Data and transformations were spread across sources and reports. The team needed a shared, more maintainable place for supply-management data."],
                    ["My contribution", "I built a modular Python ETL pipeline integrating APIs and SharePoint files, with five medallion layers, centralized orchestration, and reusable transformations."],
                    ["What it enables", "Prepared data is centralized in SharePoint for multiple products. Moving transformation into Python reduces work in Power BI and makes the data easier to maintain."],
                  ]
            ).map(([title, copy]) => (
              <div key={title} className="border-l-2 border-primary/40 pl-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">{title}</h4>
                <p className="mt-3 text-base leading-relaxed text-foreground/85">{copy}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border/50 px-6 py-6 sm:px-8">
            <h4 className="text-lg font-semibold">{locale === "fr" ? "Les produits alimentés par ces données" : "Products using the shared data"}</h4>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {(
                locale === "fr"
                  ? [
                      ["Prix des métaux", "Intégration d'Argus et de Fastmarkets, conversion des devises et unités, et modèles de données pour les comparaisons de prix et les compositions d'alliages dans Power BI. J'ai aussi présenté une démonstration à l'équipe."],
                      ["Indices économiques", "Travail sur les données et les rapports IPC, IPP et taux de change pour aider à évaluer les risques liés aux pays des fournisseurs et aux transitions."],
                      ["Profils fournisseurs", "Création d'un modèle Excel standardisé et de scripts Python qui lisent les anciens profils fournisseurs et convertissent leurs données vers ce modèle."],
                    ]
                  : [
                      ["Metal indices", "I integrated Argus and Fastmarkets data, standardized currencies and units, and worked on the data model for Power BI price comparisons and custom alloy compositions. I also demoed the dashboard to the team."],
                      ["Economic indices", "I work on CPI, PPI, and exchange-rate data and reporting to support supplier-country risk and transition decisions."],
                      ["Supplier profiles", "I created a standardized Excel template and Python scripts that read legacy supplier profiles and convert their inputs into the new format."],
                    ]
              ).map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-border/60 bg-background/70 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                  <h5 className="text-base font-semibold text-foreground">{title}</h5>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="border-t border-border/50 px-6 py-4 text-sm text-muted-foreground sm:px-8">
            {locale === "fr" ? "Python · API REST · Parquet · SharePoint · Power BI · Excel/VBA · Azure DevOps · Jira" : "Python · REST APIs · Parquet · SharePoint · Power BI · Excel/VBA · Azure DevOps · Jira"}
          </p>
        </article>

        <article className="mt-6 grid overflow-hidden rounded-3xl border border-border/70 bg-card/95 shadow-sm dark:bg-[#151625]/95 md:grid-cols-[14rem_1fr]">
          <div className="flex flex-col justify-center bg-primary/10 p-6 sm:p-8">
            <span className="text-4xl font-bold tracking-tight text-primary">20+</span>
            <span className="mt-2 text-sm font-semibold text-foreground">{locale === "fr" ? "sources Databricks" : "Databricks sources"}</span>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Pratt &amp; Whitney Canada · 2025</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">{locale === "fr" ? "Simplifier les données de ventes" : "Simplifying sales reporting"}</h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/85">
              {locale === "fr" ? "J'ai regroupé plus de 20 sources Databricks en un petit ensemble de tables, organisé l'ingestion et les transformations PySpark en fonctions réutilisables, puis amélioré les vues Power BI pour suivre les tendances quotidiennes, hebdomadaires et mensuelles par rapport aux objectifs." : "I consolidated more than 20 Databricks sources into a small set of tables, organized PySpark ingestion and transformations into reusable functions, and improved Power BI views to show daily, weekly, and monthly trends against targets."}
            </p>
            <p className="mt-4 text-sm font-medium text-muted-foreground">PySpark · Databricks · Power BI</p>
          </div>
        </article>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          {locale === "fr" ? "Schéma illustratif : explorez les couches du pipeline médaillon." : "Illustrative diagram: explore the medallion pipeline layers."}
        </p>

        {/* pipeline body */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">

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
                        : "hover:scale-[1.01]",
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
                              className="pipeline-stage rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
                            >
                              {STAGES[s]}
                            </span>
                          ))}
                        </div>
                      </div>
                      {on && (
                        <p className="mt-3 text-sm leading-relaxed text-foreground lg:hidden">{text.copy}</p>
                      )}
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
            className="sticky top-24 hidden overflow-hidden rounded-3xl border border-border/70 bg-card/50 backdrop-blur-md dark:bg-card/30 lg:block"
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
