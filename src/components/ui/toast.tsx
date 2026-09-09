"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const TOAST_EVENT = "site-toast";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}

export async function copyText(value: string, success: string) {
  try {
    await navigator.clipboard.writeText(value);
    toast(success);
  } catch {
    toast(success);
  }
}

export function ToastHost() {
  const [message, setMessage] = React.useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const onToast = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      setMessage(text);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  React.useEffect(() => {
    if (!message) return;
    const t = window.setTimeout(() => setMessage(null), 1800);
    return () => window.clearTimeout(t);
  }, [message]);

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          key={message}
          role="status"
          className="pointer-events-none fixed inset-x-0 top-20 z-[130] flex justify-center px-4"
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
        >
          <p className="rounded-full border border-emerald-500/30 bg-card px-4 py-2 text-sm font-medium text-emerald-700 shadow-lg dark:text-emerald-400">
            {message}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
