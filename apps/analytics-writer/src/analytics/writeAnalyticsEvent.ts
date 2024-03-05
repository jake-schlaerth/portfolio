import {
  AnalyticsEvent,
  LocationEventSchema,
  PageViewEventSchema,
  SessionDurationEventSchema,
  eventNames,
} from "analytics-events";
import { type EventHandlers, handleEvent } from ".";

export const writeAnalyticsEvent = async (
  event: AnalyticsEvent,
  eventHandlers: EventHandlers
) => {
  switch (event.eventName) {
    case eventNames.location:
      handleEvent(LocationEventSchema, event, eventHandlers.location);
      break;
    case eventNames.pageView:
      handleEvent(PageViewEventSchema, event, eventHandlers.pageView);
      break;
    case eventNames.sessionDuration:
      handleEvent(
        SessionDurationEventSchema,
        event,
        eventHandlers.sessionDuration
      );
      break;
  }
};
