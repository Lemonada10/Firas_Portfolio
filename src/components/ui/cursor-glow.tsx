"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [coarsePointer, setCoarsePointer] = React.useState(true);
  const cursorX = useMotionValue(-9999);
  const cursorY = useMotionValue(-9999);
  const spring = {
    stiffness: 520,
    damping: 44,
    mass: 0.28,
    restDelta: 0.5,
    restSpeed: 0.5,
  } as const;
  const x = useSpring(cursorX, spring);
  const y = useSpring(cursorY, spring);

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (coarsePointer) return;
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [coarsePointer, cursorX, cursorY]);

  if (coarsePointer) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[5] h-[300px] w-[300px] rounded-[20px] mix-blend-multiply opacity-75 will-change-transform dark:mix-blend-screen dark:opacity-100"
      style={{
        left: x,
        top: y,
        x: "-50%",
        y: "-50%",
        background:
          "radial-gradient(circle closest-side, rgba(129, 140, 248, 0.22) 0%, rgba(139, 92, 246, 0.12) 35%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}
