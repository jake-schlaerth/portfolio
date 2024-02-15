import { getUnixTimestamp } from "./getUnixTimestamp";

export const emitSessionEndEvent = (duration: number) =>
  navigator.sendBeacon(
    "/track",
    JSON.stringify({
      duration,
      eventName: "sessionDuration",
      url: window.location.href,
      timestamp: getUnixTimestamp(),
    })
  );
