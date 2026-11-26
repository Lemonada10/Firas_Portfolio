"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

/**
 * A flowing silk aurora: broad translucent folds, traveling highlights, and
 * sparse dust. All motion uses elapsed time rather than the display refresh rate.
 */
export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let frame = 0;
    let lastTime = 0;
    let time = 0;
    let dark = document.documentElement.classList.contains("dark");
    const pointer = { x: 0, y: 0 };
    const drift = { x: 0, y: 0 };
    const dust = Array.from({ length: 36 }, () => ({
      x: Math.random(), y: Math.random(), size: 0.5 + Math.random(),
      phase: Math.random() * Math.PI * 2, speed: 0.004 + Math.random() * 0.006,
    }));

    // One continuous, open curve; the folds never form a globe or closed rings.
    const ribbonPoint = (u: number, lane: number, edge = 0): Point => {
      const wave = Math.sin(u * 6.2 - time * 0.19 + lane * 0.58);
      const fold = Math.sin(u * 10.4 + time * 0.13 + lane * 0.7);
      const spread = Math.sin(Math.PI * u) * Math.min(width * 0.09, 130)
        * (0.75 + 0.25 * Math.sin(u * 7 - time * 0.2 + lane));
      return {
        x: width * (-0.12 + 1.28 * u) + drift.x * Math.sin(Math.PI * u),
        y: height * (1.06 - 1.08 * u + wave * 0.23 + lane * 0.095)
          + fold * 22 + edge * spread + drift.y * Math.sin(Math.PI * u),
      };
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dark ? "#09090f" : "#f2f4f9";
      ctx.fillRect(0, 0, width, height);

      const atmosphere = ctx.createRadialGradient(
        width * 0.8, height * 0.55, 0, width * 0.8, height * 0.55, Math.max(width, height) * 0.75
      );
      atmosphere.addColorStop(0, dark ? "rgba(75,58,150,0.18)" : "rgba(126,110,210,0.06)");
      atmosphere.addColorStop(1, "rgba(80,60,160,0)");
      ctx.fillStyle = atmosphere;
      ctx.fillRect(0, 0, width, height);

      const colors = dark
        ? ["104,118,250", "153,108,240", "83,180,209"]
        : ["79,70,170", "134,75,177", "34,128,155"];
      const steps = width < 600 ? 64 : 100;

      for (let lane = 2; lane >= 0; lane--) {
        const color = colors[lane];
        const gradient = ctx.createLinearGradient(0, height, width, 0);
        gradient.addColorStop(0, `rgba(${color},0)`);
        gradient.addColorStop(0.35, `rgba(${color},${dark ? 0.045 : 0.025})`);
        gradient.addColorStop(0.7, `rgba(${color},${dark ? 0.34 : 0.12})`);
        gradient.addColorStop(1, `rgba(${color},0)`);

        // Translucent ribbon surface with a tapered, gently twisting width.
        for (let strip = 0; strip < 16; strip++) {
          ctx.beginPath();
          for (let step = 0; step <= steps; step++) {
            const p = ribbonPoint(step / steps, lane, strip / 16);
            if (step === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          for (let step = steps; step >= 0; step--) {
            const p = ribbonPoint(step / steps, lane, (strip + 1) / 16);
            ctx.lineTo(p.x, p.y);
          }
          ctx.closePath();
          ctx.globalAlpha = Math.pow(1 - strip / 16, 1.8);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Just one luminous edge per fold, with a broad soft halo underneath.
        ctx.beginPath();
        for (let step = 0; step <= steps; step++) {
          const p = ribbonPoint(step / steps, lane);
          if (step === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = gradient;
        ctx.lineWidth = dark ? 22 : 16;
        ctx.globalAlpha = 0.12;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Short light trails follow the exact moving edge and fade at both ends.
        const progress = (time * (0.035 + lane * 0.006) + lane * 0.31) % 1;
        for (let segment = 0; segment < 18; segment++) {
          const u = progress - segment * 0.003;
          if (u < 0 || u > 1) continue;
          const a = ribbonPoint(u, lane);
          const b = ribbonPoint(Math.max(0, u - 0.003), lane);
          const fade = Math.sin(Math.PI * u) * (1 - segment / 18);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${color},${fade * (dark ? 0.8 : 0.45)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      for (const speck of dust) {
        const x = ((speck.x + time * speck.speed * 0.15) % 1) * width;
        const y = ((speck.y - time * speck.speed * 0.2) % 1 + 1) % 1 * height;
        const alpha = 0.13 + (Math.sin(time * 0.6 + speck.phase) + 1) * 0.12;
        ctx.beginPath();
        ctx.arc(x, y, speck.size, 0, Math.PI * 2);
        ctx.fillStyle = dark ? `rgba(190,199,255,${alpha})` : `rgba(79,70,150,${alpha * 0.6})`;
        ctx.fill();
      }
    };

    const tick = (now: number) => {
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
      lastTime = now;
      time += delta;
      const ease = 1 - Math.exp(-delta * 2.5);
      drift.x += (pointer.x - drift.x) * ease;
      drift.y += (pointer.y - drift.y) * ease;
      paint();
      frame = requestAnimationFrame(tick);
    };

    const syncMotion = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (!document.hidden) {
        paint();
        if (!motionPreference.matches) frame = requestAnimationFrame(tick);
      }
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      paint();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = (event.clientX / width - 0.5) * 34;
      pointer.y = (event.clientY / height - 0.5) * 26;
    };
    const resetPointer = () => { pointer.x = 0; pointer.y = 0; };
    const themeObserver = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark");
      if (!document.hidden) paint();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    resize();
    syncMotion();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.addEventListener("visibilitychange", syncMotion);
    motionPreference.addEventListener("change", syncMotion);
    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", resetPointer);
      document.removeEventListener("visibilitychange", syncMotion);
      motionPreference.removeEventListener("change", syncMotion);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
