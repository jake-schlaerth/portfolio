import { z } from "zod";

import {
  AnalyticsEvent,
  LocationEventSchema,
  PageViewEventSchema,
  SessionDurationEventSchema,
  eventNames,
} from "analytics-events";
import type { EventHandlers } from "./eventHandlers";

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

const handleEvent = async <T>(
  schema: z.ZodSchema<T>,
  event: T,
  handler: (event: T) => Promise<void>
) => {
  try {
    const validatedEvent = schema.parse(event);
    await handler(validatedEvent);
  } catch (error) {
    console.error("Invalid event data:", error);
  }
};
