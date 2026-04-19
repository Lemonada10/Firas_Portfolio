"use client";

/* Soft drifting color + vignette above canvas — keeps focus on content */
export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute -left-[18%] top-[6%] h-[min(52vw,26rem)] w-[min(52vw,26rem)] rounded-full bg-[oklch(0.58_0.14_275/0.075)] blur-[5.5rem] motion-reduce:animate-none motion-safe:animate-[aurora-1_26s_ease-in-out_infinite] dark:bg-primary/20"
      />
      <div
        className="absolute -right-[14%] top-[36%] h-[min(46vw,22rem)] w-[min(46vw,22rem)] rounded-full bg-[oklch(0.58_0.12_300/0.055)] blur-[5rem] motion-reduce:animate-none motion-safe:animate-[aurora-2_32s_ease-in-out_infinite] dark:bg-violet-500/14"
      />
      <div
        className="absolute left-[18%] -bottom-[14%] h-[min(56vw,28rem)] w-[min(56vw,28rem)] rounded-full bg-[oklch(0.62_0.08_265/0.045)] blur-[5.25rem] motion-reduce:animate-none motion-safe:animate-[aurora-3_29s_ease-in-out_infinite] dark:bg-indigo-400/12"
      />

      {/* Vignette: lighter in light mode so the page stays airy */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 120% 85% at 50% 45%, transparent 45%, rgba(99,102,241,0.04) 72%, rgba(15,15,25,0.028) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 130% 90% at 50% 50%, transparent 35%, rgba(9,9,15,0.42) 100%)",
        }}
      />
    </div>
  );
}
