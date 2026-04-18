"use client";

import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useReducedMotion } from "framer-motion";

export function ParticleBackground() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [isDark, setIsDark] = useState(true);

  /* boot the engine once */
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  /* watch dark/light theme changes */
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const particlesLoaded = useCallback(async () => undefined, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,

      background: {
        color: { value: "transparent" },
      },

      interactivity: {
        events: {
          onHover: { enable: !reduceMotion, mode: "bubble" },
          onClick: { enable: !reduceMotion, mode: "repulse" },
          resize: { enable: true },
        },
        modes: {
          bubble: {
            distance: 160,
            duration: 1.8,
            opacity: 0.85,
            size: 11,
          },
          repulse: { distance: 180, duration: 0.65 },
        },
      },

      particles: {
        number: {
          value: isDark ? 72 : 55,
          density: { enable: true, width: 900 },
        },

        color: {
          value: isDark
            ? ["#8b5cf6", "#6366f1", "#22d3ee", "#60a5fa"]
            : ["#6366f1", "#0ea5e9", "#8b5cf6"],
        },

        links: {
          enable: true,
          distance: 140,
          color: isDark ? "#818cf8" : "#6366f1",
          opacity: isDark ? 0.12 : 0.15,
          width: 1,
        },

        opacity: {
          value: { min: isDark ? 0.07 : 0.04, max: isDark ? 0.4 : 0.22 },
          animation: {
            enable: !reduceMotion,
            speed: 0.7,
            sync: false,
          },
        },

        size: {
          value: { min: 1, max: isDark ? 4 : 3 },
          animation: {
            enable: !reduceMotion,
            speed: 1.5,
            sync: false,
          },
        },

        move: {
          enable: !reduceMotion,
          speed: isDark ? 0.6 : 0.45,
          direction: "none",
          outModes: { default: "out" },
          random: true,
          straight: false,
        },

        rotate: {
          value: { min: 0, max: 360 },
          direction: "random",
          animation: { enable: !reduceMotion, speed: 5 },
        },

        wobble: {
          enable: !reduceMotion,
          distance: isDark ? 10 : 7,
          speed: { min: 0.4, max: 1.0 },
        },

        shape: { type: "circle" },
      },

      motion: {
        disable: !!reduceMotion,
        reduce: { factor: 4, value: true },
      },
    }),
    [isDark, reduceMotion]
  );

  if (!ready) return null;

  return (
    <Particles
      id="portfolio-particles"
      options={options}
      particlesLoaded={particlesLoaded}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
