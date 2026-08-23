"use client";

import * as React from "react";

export function HashScroll() {
  React.useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
