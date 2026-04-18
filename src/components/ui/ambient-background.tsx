"use client";

/* Edge vignette only — canvas handles everything else */
export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
      style={{
        background:
          "radial-gradient(ellipse 130% 90% at 50% 50%, transparent 35%, rgba(9,9,15,0.4) 100%)",
      }}
    />
  );
}
