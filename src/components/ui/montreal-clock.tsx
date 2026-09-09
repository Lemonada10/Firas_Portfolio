"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";

export function MontrealClock() {
  const { t, locale } = useI18n();
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
          timeZone: "America/Toronto",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date())
      );
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, [locale]);

  if (!time) return null;

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
      <Clock className="size-3" aria-hidden />
      {t.extras.clock} · {time}
    </span>
  );
}
