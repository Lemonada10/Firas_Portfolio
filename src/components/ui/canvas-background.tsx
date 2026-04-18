"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number; // original gentle drift
  size: number;
  phase: number;
};

type Pulse = {
  from: number; to: number;
  progress: number;
  speed: number;
  hue: number;
};

type Ripple = {
  x: number; y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
};

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;
    const particles: Particle[] = [];
    const pulses: Pulse[]       = [];
    const ripples: Ripple[]     = [];
    const MAX_DIST = 170;
    const COUNT    = 65;
    const MAX_SPEED = 4.5;

    // ── Resize ──────────────────────────────────────────────────
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Init particles ───────────────────────────────────────────
    for (let i = 0; i < COUNT; i++) {
      const bvx = (Math.random() - 0.5) * 0.45;
      const bvy = (Math.random() - 0.5) * 0.45;
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: bvx, vy: bvy,
        baseVx: bvx, baseVy: bvy,
        size:  Math.random() * 1.8 + 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // ── Click → repulse + ripple ─────────────────────────────────
    const handleClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy_screen = e.clientY; // canvas is fixed → use viewport coords

      // Ripple shockwave
      ripples.push({ x: cx, y: cy_screen, radius: 0, maxRadius: 200, opacity: 1 });

      // Burst ripple (second smaller ring, slight delay via smaller initial radius)
      ripples.push({ x: cx, y: cy_screen, radius: 8, maxRadius: 120, opacity: 0.6 });

      // Repulse particles
      const REPULSE_DIST = 220;
      const FORCE        = 6.5;
      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy_screen;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSE_DIST && dist > 0) {
          const strength = (1 - dist / REPULSE_DIST) * FORCE;
          p.vx += (dx / dist) * strength;
          p.vy += (dy / dist) * strength;
        }
      }

      // Extra: spawn a burst of data pulses from the nearest particle
      let nearest = 0, nearestDist = Infinity;
      for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - cx;
        const dy = particles[i].y - cy_screen;
        const d  = dx*dx + dy*dy;
        if (d < nearestDist) { nearestDist = d; nearest = i; }
      }
      const nearby: number[] = [];
      for (let j = 0; j < particles.length; j++) {
        if (j === nearest) continue;
        const dx = particles[nearest].x - particles[j].x;
        const dy = particles[nearest].y - particles[j].y;
        if (dx*dx + dy*dy < MAX_DIST * MAX_DIST) nearby.push(j);
      }
      // Spawn up to 5 pulses outward from the nearest node
      const burst = Math.min(5, nearby.length);
      for (let b = 0; b < burst; b++) {
        const ti = nearby[Math.floor(Math.random() * nearby.length)];
        if (pulses.length < 40) {
          pulses.push({ from: nearest, to: ti, progress: 0, speed: 0.015 + Math.random() * 0.018, hue: 240 });
        }
      }
    };
    window.addEventListener("click", handleClick);

    let t = 0;

    // ── Draw loop ────────────────────────────────────────────────
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, W, H);

      // — base background —
      ctx.fillStyle = "#09090f";
      ctx.fillRect(0, 0, W, H);

      // — aurora layer 1: top-left indigo —
      {
        const g = ctx.createRadialGradient(W*0.15, H*0.22, 0, W*0.15, H*0.22, W*0.55);
        const a = 0.18 + Math.sin(t * 0.6) * 0.05;
        g.addColorStop(0, `rgba(99,102,241,${a})`);
        g.addColorStop(1, "rgba(99,102,241,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      // — aurora layer 2: bottom-right violet —
      {
        const g = ctx.createRadialGradient(W*0.85, H*0.72, 0, W*0.85, H*0.72, W*0.48);
        const a = 0.14 + Math.sin(t * 0.45 + 1.2) * 0.04;
        g.addColorStop(0, `rgba(139,92,246,${a})`);
        g.addColorStop(1, "rgba(139,92,246,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      // — aurora layer 3: centre soft blue —
      {
        const g = ctx.createRadialGradient(W*0.5, H*0.5, 0, W*0.5, H*0.5, W*0.38);
        const a = 0.07 + Math.sin(t * 0.35 + 2.5) * 0.03;
        g.addColorStop(0, `rgba(59,130,246,${a})`);
        g.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }

      // — move & damp particles —
      for (const p of particles) {
        // Damp back toward base velocity gently
        p.vx = p.vx * 0.96 + p.baseVx * 0.04;
        p.vy = p.vy * 0.96 + p.baseVy * 0.04;

        // Clamp speed
        const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        if (speed > MAX_SPEED) { p.vx = (p.vx/speed)*MAX_SPEED; p.vy = (p.vy/speed)*MAX_SPEED; }

        p.x += p.vx; p.y += p.vy; p.phase += 0.018;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W+10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H+10) p.y = -10;
      }

      // — draw connections —
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx*dx + dy*dy;
          if (d2 < MAX_DIST*MAX_DIST) {
            const fade = 1 - Math.sqrt(d2)/MAX_DIST;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(129,140,248,${fade * 0.14})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // — spawn random data pulses —
      if (Math.random() < 0.025 && pulses.length < 20) {
        const fi = Math.floor(Math.random() * particles.length);
        const nearby: number[] = [];
        for (let j = 0; j < particles.length; j++) {
          if (j === fi) continue;
          const dx = particles[fi].x - particles[j].x;
          const dy = particles[fi].y - particles[j].y;
          if (dx*dx + dy*dy < MAX_DIST*MAX_DIST) nearby.push(j);
        }
        if (nearby.length) {
          pulses.push({
            from: fi, to: nearby[Math.floor(Math.random() * nearby.length)],
            progress: 0, speed: 0.007 + Math.random() * 0.013,
            hue: Math.random() < 0.5 ? 240 : 270,
          });
        }
      }

      // — draw & update pulses —
      for (let i = pulses.length-1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) { pulses.splice(i, 1); continue; }

        const from = particles[pulse.from];
        const to   = particles[pulse.to];
        const px   = from.x + (to.x - from.x) * pulse.progress;
        const py   = from.y + (to.y - from.y) * pulse.progress;

        const glow = ctx.createRadialGradient(px, py, 0, px, py, 9);
        glow.addColorStop(0, pulse.hue===240 ? "rgba(129,140,248,0.55)" : "rgba(167,139,250,0.55)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI*2); ctx.fill();

        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI*2);
        ctx.fillStyle = pulse.hue===240 ? "rgba(165,180,252,0.95)" : "rgba(196,181,253,0.95)";
        ctx.fill();
      }

      // — draw particles —
      for (const p of particles) {
        const breathe = (Math.sin(p.phase) + 1) * 0.5;
        const opacity = 0.25 + breathe * 0.55;
        const r       = p.size * (0.85 + breathe * 0.32);

        if (breathe > 0.65) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r*5);
          g.addColorStop(0, `rgba(167,139,250,${opacity*0.3})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, r*5, 0, Math.PI*2); ctx.fill();
        }

        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(165,180,252,${opacity})`;
        ctx.fill();
      }

      // — draw & update ripples —
      for (let i = ripples.length-1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius  += 5.5;
        rp.opacity  = (1 - rp.radius / rp.maxRadius) * 0.75;

        if (rp.radius >= rp.maxRadius) { ripples.splice(i, 1); continue; }

        // outer ring
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(165,180,252,${rp.opacity})`;
        ctx.lineWidth   = 1.6;
        ctx.stroke();

        // inner glowing fill (near origin only)
        if (rp.radius < 60) {
          const inner = ctx.createRadialGradient(rp.x, rp.y, 0, rp.x, rp.y, rp.radius);
          inner.addColorStop(0,   `rgba(196,181,253,${rp.opacity * 0.25})`);
          inner.addColorStop(0.5, `rgba(129,140,248,${rp.opacity * 0.08})`);
          inner.addColorStop(1,   "rgba(0,0,0,0)");
          ctx.fillStyle = inner;
          ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI*2); ctx.fill();
        }

        // second thinner ring at 60% radius
        const r2 = rp.radius * 0.6;
        if (r2 > 4) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, r2, 0, Math.PI*2);
          ctx.strokeStyle = `rgba(196,181,253,${rp.opacity * 0.45})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }

      // — top edge glow line —
      const edgeGrad = ctx.createLinearGradient(0, 0, W, 0);
      edgeGrad.addColorStop(0,   "rgba(129,140,248,0)");
      edgeGrad.addColorStop(0.3, "rgba(129,140,248,0.45)");
      edgeGrad.addColorStop(0.5, "rgba(167,139,250,0.55)");
      edgeGrad.addColorStop(0.7, "rgba(129,140,248,0.45)");
      edgeGrad.addColorStop(1,   "rgba(129,140,248,0)");
      ctx.fillStyle = edgeGrad;
      ctx.fillRect(0, 0, W, 1);

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
