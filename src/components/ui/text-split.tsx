"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SplitHeadingProps = {
  children: string;
  className?: string;
};

export function SplitHeading({ children, className }: SplitHeadingProps) {
  const reduceMotion = useReducedMotion();
  const chars = Array.from(children);

  if (reduceMotion) {
    return <h2 className={className}>{children}</h2>;
  }

  return (
    <h2 className={cn("overflow-hidden", className)} aria-label={children}>
      <span aria-hidden className="inline">
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block"
            initial={{ y: "0.45em", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.38,
              delay: Math.min(i * 0.018, 0.45),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </h2>
  );
}
