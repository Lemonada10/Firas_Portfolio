"use client";

/**
 * Ultra-light film grain + soft vignette lift. Fixed, pointer-events none.
 * Turbulence is static; only blend/opacity reads as texture (no motion cost).
 */
const NOISE_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.55"/></svg>`
  );

export function SiteAtmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[11] opacity-[0.022] mix-blend-multiply dark:opacity-[0.055] dark:mix-blend-overlay"
      aria-hidden
      style={{
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
