"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { IconLinkedIn } from "@/components/icons/social";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Magnetic } from "@/components/ui/magnetic-button";
import { SplitHeading } from "@/components/ui/text-split";
import { useI18n } from "@/components/providers/language-provider";
import { useContent } from "@/hooks/use-content";
import { copyText } from "@/components/ui/toast";

/* reusable mouse-tilt hook */
function useTilt(maxDeg = 7) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) scale(1.02)`;
    },
    [reduceMotion, maxDeg]
  );

  const onLeave = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  }, []);

  return { ref, onMove, onLeave };
}

/* shared card depth style */
const depthStyle: React.CSSProperties = {
  transformStyle: "preserve-3d",
  transition: "transform 0.18s ease, box-shadow 0.18s ease",
  boxShadow: "0 8px 0 0 rgba(99,102,241,0.08), 0 12px 48px -10px rgba(0,0,0,0.28)",
};

export function Contact() {
  const [status, setStatus] = React.useState<"idle" | "opened" | "copied">("idle");
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const { personal } = useContent();
  const leftTilt  = useTilt(6);
  const rightTilt = useTilt(6);

  const contactRows = [
    {
      Icon: Mail, label: t.contact.labels.email,
      content: (
        <span className="flex flex-wrap items-center gap-2">
          <a href={`mailto:${personal.email}`} className="break-all text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
            {personal.email}
          </a>
          <button
            type="button"
            onClick={() => copyText(personal.email, t.extras.emailCopied)}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-primary/10 hover:text-primary"
            aria-label={`${t.contact.copyValue} ${t.contact.labels.email}`}
          >
            <Copy className="size-3" aria-hidden />
            {t.contact.copyValue}
          </button>
        </span>
      ),
    },
    {
      Icon: Phone, label: t.contact.labels.phone,
      content: (
        <span className="flex flex-wrap items-center gap-2">
          <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
            {personal.phone}
          </a>
          <button
            type="button"
            onClick={() => copyText(personal.phone, t.extras.phoneCopied)}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-primary/10 hover:text-primary"
            aria-label={`${t.contact.copyValue} ${t.contact.labels.phone}`}
          >
            <Copy className="size-3" aria-hidden />
            {t.contact.copyValue}
          </button>
        </span>
      ),
    },
    {
      Icon: IconLinkedIn, label: t.contact.labels.linkedin,
      content: (
        <a href={personal.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
          {t.contact.linkedinProfile}
        </a>
      ),
    },
    {
      Icon: MapPin, label: t.contact.labels.location,
      content: <span className="text-muted-foreground">{personal.location}</span>,
    },
  ];

  const formFields = [
    { id: "name", label: t.contact.form.name, type: "text", autoComplete: "name", colSpan: 1 },
    { id: "email", label: t.contact.form.email, type: "email", autoComplete: "email", colSpan: 1 },
    { id: "message", label: t.contact.form.message, type: "area", colSpan: 2 },
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`${t.contact.form.subject} ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
    window.setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <AnimatedSection id="contact" aria-label={t.nav.contact} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.2em] text-primary"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {t.contact.eyebrow}
          </motion.p>
          <SplitHeading className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.contact.heading}
          </SplitHeading>
          <motion.p
            className="mt-4 text-muted-foreground"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

          {/* ── Left card: rotates in from left, tilts on hover ── */}
          <motion.div
            ref={leftTilt.ref}
            onMouseMove={leftTilt.onMove}
            onMouseLeave={leftTilt.onLeave}
            style={{
              ...depthStyle,
              transformPerspective: "1000px",
            }}
            className="relative space-y-6 overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-8 dark:bg-card/40"
            initial={reduceMotion ? false : { opacity: 0, rotateY: -18, x: -30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* top-edge highlight */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.55) 35%, rgba(196,181,253,0.65) 60%, transparent)" }}
            />
            {/* left-edge highlight */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-px"
              style={{ background: "linear-gradient(180deg, rgba(129,140,248,0.5), transparent 75%)" }}
            />

            <h3 className="text-lg font-semibold text-foreground">{t.contact.contactMe}</h3>
            <ul className="space-y-4 text-sm">
              {contactRows.map(({ Icon, label, content }, i) => (
                <motion.li
                  key={label}
                  className="flex gap-3"
                  initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.36, delay: i * 0.09 + 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.span
                    className="mt-0.5 shrink-0"
                    initial={reduceMotion ? false : { scale: 0 }}
                    whileInView={reduceMotion ? undefined : { scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.09 + 0.35, type: "spring", stiffness: 260, damping: 14 }}
                    whileHover={reduceMotion ? undefined : { scale: 1.25, rotate: 10 }}
                  >
                    <Icon className="size-4 text-primary" aria-hidden />
                  </motion.span>
                  <div>
                    <p className="font-medium text-foreground">{label}</p>
                    {content}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right form: rotates in from right, tilts on hover ── */}
          <motion.div
            ref={rightTilt.ref}
            onMouseMove={rightTilt.onMove}
            onMouseLeave={rightTilt.onLeave}
            style={{
              ...depthStyle,
              transformPerspective: "1000px",
            }}
            className="relative overflow-hidden rounded-2xl border border-border/80 bg-muted/20 p-8"
            initial={reduceMotion ? false : { opacity: 0, rotateY: 18, x: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* top-edge highlight */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.45) 40%, rgba(196,181,253,0.55) 60%, transparent)" }}
            />
            {/* right-edge highlight */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-px"
              style={{ background: "linear-gradient(180deg, rgba(129,140,248,0.4), transparent 75%)" }}
            />

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                {formFields.map(({ id, label, type, autoComplete, colSpan }, fi) => (
                  <motion.div
                    key={id}
                    className={`space-y-2 ${colSpan === 2 ? "sm:col-span-2" : "sm:col-span-1"}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.34, delay: fi * 0.09 + 0.3, ease: "easeOut" }}
                  >
                    <Label htmlFor={id}>{label}</Label>
                    {type === "area" ? (
                      <Textarea
                        id={id} name={id} rows={5} required
                        className="transition-shadow duration-200 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.30)]"
                      />
                    ) : (
                      <Input
                        id={id}
                        name={id}
                        type={type}
                        autoComplete={autoComplete}
                        required
                        className="transition-shadow duration-200 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.30)]"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.16}>
                  <Button type="submit" className="group relative gap-2 overflow-hidden">
                    <span className="flex items-center gap-2">
                      <Send className="size-4" aria-hidden />
                      {t.contact.form.submit}
                    </span>
                  </Button>
                </Magnetic>
                {status !== "idle" && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400" role="status">
                    {t.contact.form.status}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
