import {
  type AnalyticsEvent,
  eventNames,
  AnalyticsEventSchema,
} from "analytics-events";
import {
  writeLocationEvent,
  writePageViewEvent,
  writeSessionDurationEvent,
} from "./events";

export async function writeAnalyticsEvent(event: AnalyticsEvent) {
  let validatedEvent;

  try {
    validatedEvent = AnalyticsEventSchema.parse(event);
  } catch (error) {
    console.error("Invalid event data:", error);
    return;
  }

  switch (validatedEvent.eventName) {
    case eventNames.sessionDuration:
      await writeSessionDurationEvent(validatedEvent);
      break;
    case eventNames.pageView:
      await writePageViewEvent(validatedEvent);
      break;
    case eventNames.location:
      await writeLocationEvent(validatedEvent);
      break;
  }
}
