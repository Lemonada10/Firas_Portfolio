"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SplitHeadingProps = {
  children: string;
  className?: string;
};

export function SplitHeading({ children, className }: SplitHeadingProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");

  if (reduceMotion) {
    return <h2 className={className}>{children}</h2>;
  }

  let charOffset = 0;

  return (
    <h2 className={cn("text-balance", className)} aria-label={children}>
      <span aria-hidden>
        {words.map((word, wi) => {
          const delayBase = charOffset;
          charOffset += word.length + 1;
          return (
            <span key={`${word}-${wi}`}>
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    className="inline-block"
                    initial={{ y: "0.45em", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.38,
                      delay: Math.min((delayBase + i) * 0.018, 0.45),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              {wi < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
    </h2>
  );
}
