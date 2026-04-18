"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { IconLinkedIn } from "@/components/icons/social";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { personal } from "@/lib/data";

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

const contactRows = [
  {
    Icon: Mail, label: "Email",
    content: (
      <a href={`mailto:${personal.email}`} className="break-all text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
        {personal.email}
      </a>
    ),
  },
  {
    Icon: Phone, label: "Phone",
    content: (
      <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
        {personal.phone}
      </a>
    ),
  },
  {
    Icon: IconLinkedIn, label: "LinkedIn",
    content: (
      <a href={personal.linkedInUrl} target="_blank" rel="noopener noreferrer" className="break-all text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
        {personal.linkedInUrl}
      </a>
    ),
  },
  {
    Icon: MapPin, label: "Location",
    content: <span className="text-muted-foreground">{personal.location}</span>,
  },
];

const formFields = [
  { id: "name",    label: "Name",    type: "text",  placeholder: "Alex Recruiter",   autoComplete: "name",  colSpan: 1 },
  { id: "email",   label: "Email",   type: "email", placeholder: "you@company.com",  autoComplete: "email", colSpan: 1 },
  { id: "message", label: "Message", type: "area",  placeholder: "Tell me about the team, stack, and timeline…", colSpan: 2 },
];

export function Contact() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");
  const reduceMotion = useReducedMotion();
  const leftTilt  = useTilt(6);
  const rightTilt = useTilt(6);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      window.setTimeout(() => setStatus("idle"), 4000);
    }, 900);
  }

  return (
    <AnimatedSection id="contact" aria-label="Contact" className="py-24 sm:py-32">
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
            Contact
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.07 }}
          >
            Let&apos;s build something solid
          </motion.h2>
          <motion.p
            className="mt-4 text-muted-foreground"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            Recruiters: I&apos;m actively seeking{" "}
            <strong className="text-foreground">2025–2026 internships</strong>{" "}
            in software engineering, data engineering, and full-stack roles.
            Reach out — I usually respond within a day.
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

            <h3 className="text-lg font-semibold text-foreground">Direct lines</h3>
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
                {formFields.map(({ id, label, type, placeholder, autoComplete, colSpan }, fi) => (
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
                        id={id} name={id} rows={5} placeholder={placeholder} required
                        className="transition-shadow duration-200 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.30)]"
                      />
                    ) : (
                      <Input
                        id={id} name={id} type={type} autoComplete={autoComplete}
                        placeholder={placeholder} required
                        className="transition-shadow duration-200 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.30)]"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <motion.div whileTap={reduceMotion ? undefined : { scale: 0.95 }}>
                  <Button type="submit" className="group relative gap-2 overflow-hidden" disabled={status !== "idle"}>
                    <AnimatePresence mode="wait" initial={false}>
                      {status === "idle" && (
                        <motion.span key="idle" className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.span
                            whileHover={reduceMotion ? undefined : { x: 3, y: -3, rotate: -30 }}
                            transition={{ type: "spring", stiffness: 400, damping: 12 }}
                          >
                            <Send className="size-4" aria-hidden />
                          </motion.span>
                          Send message
                        </motion.span>
                      )}
                      {status === "sending" && (
                        <motion.span key="sending" className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="inline-block">
                            <Send className="size-4" aria-hidden />
                          </motion.span>
                          Sending…
                        </motion.span>
                      )}
                      {status === "sent" && (
                        <motion.span key="sent" className="flex items-center gap-2"
                          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, type: "spring", stiffness: 260 }}
                        >
                          <CheckCircle2 className="size-4" aria-hidden />
                          Sent!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {status === "sent" && (
                    <motion.p className="text-sm text-emerald-600 dark:text-emerald-400" role="status"
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      Thanks — connect via email for a real reply.
                    </motion.p>
                  )}
                  {status === "idle" && (
                    <motion.p className="text-xs text-muted-foreground"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Frontend demo — connect via email for a guaranteed response.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
