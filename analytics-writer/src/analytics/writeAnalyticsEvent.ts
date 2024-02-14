import {
  LocationEvent,
  PageViewEvent,
  SessionDurationEvent,
  writeLocationEvent,
  writePageViewEvent,
  writeSessionDurationEvent,
} from "./events";

type AnalyticsEvent = PageViewEvent | LocationEvent | SessionDurationEvent;

export async function writeAnalyticsEvent(event: AnalyticsEvent) {
  switch (event.eventName) {
    case "sessionDuration":
      await writeSessionDurationEvent(event as SessionDurationEvent);
      break;
    case "pageView":
      await writePageViewEvent(event as PageViewEvent);
      break;
    case "location":
      await writeLocationEvent(event as LocationEvent);
      break;
    default:
      console.error("Unhandled event type:", event.eventName);
  }
}
