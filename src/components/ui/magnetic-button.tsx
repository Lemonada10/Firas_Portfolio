"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function useMagnetic<T extends HTMLElement>(strength = 0.15) {
  const ref = React.useRef<T>(null);
  const reduceMotion = useReducedMotion();

  const onMove = (e: React.MouseEvent<T>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return { ref, onMove, onLeave };
}

export function Magnetic({
  children,
  className,
  strength = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const { ref, onMove, onLeave } = useMagnetic<HTMLDivElement>(strength);

  return (
    <div
      ref={ref}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-flex transition-transform duration-150 ease-out", className)}
    >
      {children}
    </div>
  );
}

export function MagneticButton({
  children,
  className,
  href,
  download,
  target,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  download?: boolean | string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const { ref, onMove, onLeave } = useMagnetic<HTMLAnchorElement>(0.15);

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      data-magnetic
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-flex transition-transform duration-150 ease-out", className)}
    >
      {children}
    </a>
  );
}
