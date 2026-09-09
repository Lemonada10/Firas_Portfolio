"use client";

import { useI18n } from "@/components/providers/language-provider";

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#home"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
    >
      {t.nav.skipToContent}
    </a>
  );
}
