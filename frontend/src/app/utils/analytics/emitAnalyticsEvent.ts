"use client";

import { AnalyticsEvent } from "./types";

export const emitAnalyticsEvent = <
  EventName extends AnalyticsEvent["eventName"]
>(
  ...args: Extract<AnalyticsEvent, { eventName: EventName }> extends {
    payload: infer Payload;
  }
    ? [eventName: EventName, payload: Payload]
    : [eventName: EventName]
) => {
  const [eventName, payload] = args;
  const eventData = {
    eventName,
    url: window.location.href,
    timestamp: new Date().getTime() / 1000,
    ...(payload ?? {}),
  };

  console.log(eventData);
  fetch("api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
};
