"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Mode = "idle" | "hover" | "text";

export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [coarsePointer, setCoarsePointer] = React.useState(true);
  const [mode, setMode] = React.useState<Mode>("idle");
  const [label, setLabel] = React.useState<string | null>(null);
  const [pressed, setPressed] = React.useState(false);
  const [onPage, setOnPage] = React.useState(false);

  // Positioned by hand: framer layout animations on project cards hijack motion-value transforms.
  const posRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const enabled = !coarsePointer && !reduceMotion;

  React.useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add("has-custom-cursor");
    else root.classList.remove("has-custom-cursor");
    return () => root.classList.remove("has-custom-cursor");
  }, [enabled]);

  React.useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      if (posRef.current) {
        posRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      setOnPage(true);
      const node = e.target as HTMLElement | null;
      if (node?.closest?.("input, textarea, select, [contenteditable='true']")) {
        setMode("text");
        setLabel(null);
        return;
      }
      const el = node?.closest?.(
        "a, button, [data-magnetic], [data-cursor], [role='button']"
      ) as HTMLElement | null;
      if (el) {
        setMode("hover");
        setLabel(el.getAttribute("data-cursor"));
      } else {
        setMode("idle");
        setLabel(null);
      }
    };
    const onLeave = () => setOnPage(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  const hover = mode === "hover";
  const show = onPage && mode !== "text";

  return createPortal(
    <div
      className="pointer-events-none fixed inset-0 z-[2147483647] transition-opacity duration-150"
      style={{ opacity: show ? 1 : 0 }}
      aria-hidden
    >
      <div
        ref={posRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ transform: "translate3d(-200px, -200px, 0)" }}
      >
        {/* Inverted plus — always opposite the pixels under it, never a circle */}
        <div
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
          style={{ mixBlendMode: "difference" }}
        >
          <motion.div
            className="relative"
            animate={{
              rotate: hover ? 45 : 0,
              scale: pressed ? 0.78 : 1,
            }}
            transition={{ type: "spring", stiffness: 480, damping: 26 }}
          >
            <motion.span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
              animate={{
                width: hover ? 34 : 20,
                height: 4,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
              animate={{
                width: 4,
                height: hover ? 34 : 20,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            />
          </motion.div>
        </div>

        {/* Lime hotspot — color that does not exist on the page */}
        <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
          <motion.span
            className="block h-[7px] w-[7px]"
            style={{
              background: "#123A8C",
              boxShadow: "0 0 0 2px #ffffff, 0 0 10px rgba(18,58,140,0.55)",
            }}
            animate={{ scale: pressed ? 0.7 : hover ? 1.15 : 1 }}
            transition={{ type: "spring", stiffness: 520, damping: 28 }}
          />
        </div>

        <div className="absolute left-0 top-[22px] -translate-x-1/2">
          <AnimatePresence>
            {label ? (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="block whitespace-nowrap rounded-sm bg-[#0b0b12] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D4FF00] shadow-[0_0_0_1px_#D4FF00]"
              >
                {label}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>,
    document.body
  );
}
