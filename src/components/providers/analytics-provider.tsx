"use client";

import { Analytics } from "@vercel/analytics/next";

export function AnalyticsProvider() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (localStorage.getItem("va-disable") === "true") {
          return null;
        }

        return event;
      }}
    />
  );
}