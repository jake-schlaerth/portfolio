import { type SessionDurationEvent, eventNames } from "analytics-events";

export const emitSessionEndEvent = (duration: number) => {
  const eventData: SessionDurationEvent = {
    eventName: eventNames.sessionDuration,
    duration,
  };
  return navigator.sendBeacon("/track", JSON.stringify(eventData));
};
