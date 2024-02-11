import { getUnixTimestamp } from "./getUnixTimestamp";

export const emitSessionEndEvent = (sessionLength: number) =>
  navigator.sendBeacon(
    "/track",
    JSON.stringify({
      sessionLength,
      eventName: "sessionDuration",
      url: window.location.href,
      timestamp: getUnixTimestamp(),
    })
  );
