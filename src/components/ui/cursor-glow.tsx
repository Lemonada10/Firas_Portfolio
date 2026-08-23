"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [coarsePointer, setCoarsePointer] = React.useState(true);
  const [hovering, setHovering] = React.useState(false);
  const [label, setLabel] = React.useState<string | null>(null);
  const [dot, setDot] = React.useState({ x: -9999, y: -9999 });
  const [ring, setRing] = React.useState({ x: -9999, y: -9999 });

  const glowX = useMotionValue(-9999);
  const glowY = useMotionValue(-9999);
  const gx = useSpring(glowX, { stiffness: 180, damping: 28, mass: 0.4 });
  const gy = useSpring(glowY, { stiffness: 180, damping: 28, mass: 0.4 });

  const target = React.useRef({ x: -9999, y: -9999 });
  const ringPos = React.useRef({ x: -9999, y: -9999 });

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (coarsePointer || reduceMotion) return;
    let raf = 0;
    const tick = () => {
      const t = target.current;
      const r = ringPos.current;
      r.x += (t.x - r.x) * 0.15;
      r.y += (t.y - r.y) * 0.15;
      setRing({ x: r.x, y: r.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setDot({ x: e.clientX, y: e.clientY });
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest?.(
        "a, button, [data-magnetic], [data-cursor]"
      ) as HTMLElement | null;
      if (el) {
        setHovering(true);
        setLabel(el.getAttribute("data-cursor"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [coarsePointer, reduceMotion, glowX, glowY]);

  if (coarsePointer || reduceMotion) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[5] h-[300px] w-[300px] rounded-[20px] mix-blend-multiply opacity-[0.82] will-change-transform dark:mix-blend-screen dark:opacity-100"
        style={{
          left: gx,
          top: gy,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle closest-side, rgba(129, 140, 248, 0.26) 0%, rgba(139, 92, 246, 0.15) 36%, transparent 72%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed z-[90] mix-blend-difference"
        style={{
          left: ring.x,
          top: ring.y,
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden
      >
        <div
          className={`flex items-center justify-center rounded-full border border-white transition-[width,height] duration-200 ${
            hovering ? "h-12 w-12" : "h-8 w-8"
          }`}
        >
          {label ? (
            <span className="font-mono text-[8px] uppercase tracking-wider text-white">
              {label}
            </span>
          ) : null}
        </div>
      </div>
      <div
        className="pointer-events-none fixed z-[91] size-1.5 rounded-full bg-white mix-blend-difference"
        style={{
          left: dot.x,
          top: dot.y,
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden
      />
    </>
  );
}
