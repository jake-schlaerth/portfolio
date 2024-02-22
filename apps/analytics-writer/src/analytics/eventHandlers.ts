import {
  type AnalyticsEvent,
  type EventName,
  type LocationEvent,
  type PageViewEvent,
  type SessionDurationEvent,
  eventNames,
} from "analytics-events";
import {
  writeLocationEvent,
  writePageViewEvent,
  writeSessionDurationEvent,
} from "./events";
import { PageView, SessionDuration, Location } from "@/models";

export type EventHandlers = {
  [K in EventName]: (
    event: Extract<AnalyticsEvent, { eventName: K }>
  ) => Promise<void>;
};

export const eventHandlers: EventHandlers = {
  [eventNames.sessionDuration]: (event: SessionDurationEvent) =>
    writeSessionDurationEvent(event, SessionDuration),
  [eventNames.pageView]: (event: PageViewEvent) =>
    writePageViewEvent(event, PageView),
  [eventNames.location]: (event: LocationEvent) =>
    writeLocationEvent(event, Location),
};
