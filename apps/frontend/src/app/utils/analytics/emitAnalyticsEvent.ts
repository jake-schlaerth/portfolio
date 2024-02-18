import type { AnalyticsEvent } from "analytics-events";

export const emitAnalyticsEvent = (analyticsEvent: AnalyticsEvent) => {
  fetch("/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(analyticsEvent),
  });
};
