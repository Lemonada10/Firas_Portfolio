"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = { src: string; alt: string };

type GalleryLightboxProps = {
  images: GalleryImage[];
  /** aspect ratio for the thumbnails, e.g. "9/16" or "16/9" */
  thumbAspect?: string;
  /** extra class names for the thumbnail grid wrapper */
  gridClassName?: string;
};

export function GalleryLightbox({
  images,
  thumbAspect = "9/16",
  gridClassName = "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3",
}: GalleryLightboxProps) {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);

  const open = activeIdx !== null;
  const current = open ? images[activeIdx!] : null;

  const prev = React.useCallback(() => {
    setActiveIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = React.useCallback(() => {
    setActiveIdx((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  const close = React.useCallback(() => setActiveIdx(null), []);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close, prev, next]);

  return (
    <>
      <div className={gridClassName}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActiveIdx(i)}
            className="group relative overflow-hidden rounded-xl border border-border/80 bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`View ${img.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full transition-transform duration-300 group-hover:scale-105"
              style={{ display: "block" }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
              <span className="scale-0 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-100">
                Zoom
              </span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && current && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={close}
          >
            {/* close */}
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            {/* prev */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6" />
              </button>
            )}

            {/* image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.18 }}
                className="max-h-[90vh] max-w-sm w-full overflow-hidden rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={current.alt}
                  className="w-full h-auto block max-h-[90vh] object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* next */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25"
                aria-label="Next image"
              >
                <ChevronRight className="size-6" />
              </button>
            )}

            {/* counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {activeIdx! + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
