"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { GraduationCap, Languages, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { education, personal } from "@/lib/data";

/* ── Animated counter ─────────────────────────────────────────── */
function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = React.useState(0);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!inView || reduceMotion) { setValue(to); return; }
    const duration = 1400;
    const start = performance.now();
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(eased * to);
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, to, reduceMotion]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}{suffix}
    </span>
  );
}

const STATS = [
  { value: 3.4, suffix: "", decimals: 1, label: "GPA", sub: "Concordia University" },
  { value: 2,   suffix: "+", decimals: 0, label: "Internships", sub: "Industry experience" },
  { value: 4,   suffix: "",  decimals: 0, label: "Projects", sub: "Built & shipped" },
  { value: 2,   suffix: "",  decimals: 0, label: "Languages", sub: "French & English" },
];

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection
      id="about"
      aria-label="About"
      className="bg-muted/10 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">About</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Engineering background, product-minded execution
          </h2>
        </div>

        {/* ── Animated stats row ── */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl border border-border/80 bg-card/60 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.14)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99,102,241,0.10), transparent)" }}
              />
              <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-1 text-sm font-semibold text-primary">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I&apos;m an undergraduate{" "}
              <strong className="font-medium text-foreground">Software Engineering Co-op</strong>{" "}
              student at{" "}
              <strong className="font-medium text-foreground">Concordia University</strong>{" "}
              (GPA{" "}
              <strong
                className="font-bold"
                style={{
                  background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                3.4
              </strong>
              ) with a foundation spanning software development, analytics, backend systems, and full-stack applications.
            </p>
            <p>
              My experience sits at the intersection of{" "}
              <strong className="text-foreground">data engineering</strong>,{" "}
              <strong className="text-foreground">dashboards</strong>, and{" "}
              <strong className="text-foreground">communication-heavy backends</strong>
              —from modular PySpark pipelines to BLE-backed tooling—plus AI-related projects that emphasize performance and usability in the browser.
            </p>
            <p>
              I care most about{" "}
              <strong className="text-foreground">clarity, reliability, and measurable impact</strong>
              : software that teams can maintain and users can trust.
              <span className="mt-2 block text-sm text-muted-foreground">
                Bilingual: <span className="text-foreground">French</span> &amp;{" "}
                <span className="text-foreground">English</span>.
              </span>
            </p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
          >
            <Card className="border-border/80">
              <CardContent className="space-y-4 p-6">
                {[
                  { Icon: MapPin, label: "Location", text: personal.location },
                  {
                    Icon: GraduationCap,
                    label: "Education",
                    custom: (
                      <ul className="mt-2 space-y-3 text-sm text-muted-foreground">
                        {education.map((e) => (
                          <li key={e.id}>
                            <span className="font-medium text-foreground">{e.degree}</span><br />
                            {e.school} · {e.start}–{e.end}{e.details ? ` · ${e.details}` : ""}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  { Icon: Languages, label: "Languages", text: "French & English — professional proficiency" },
                ].map(({ Icon, label, text, custom }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      {text && <p className="text-sm text-muted-foreground">{text}</p>}
                      {custom}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
