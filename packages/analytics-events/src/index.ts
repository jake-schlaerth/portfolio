import { z } from "zod";

export const eventNames = {
  location: "location",
  pageView: "pageView",
  sessionDuration: "sessionDuration",
} as const;

export type EventName = (typeof eventNames)[keyof typeof eventNames];

export const LocationEventSchema = z.object({
  eventName: z.literal(eventNames.location),
  longitude: z.number(),
  latitude: z.number(),
});

export const PageViewEventSchema = z.object({
  eventName: z.literal(eventNames.pageView),
  url: z.string(),
});

export const SessionDurationEventSchema = z.object({
  eventName: z.literal(eventNames.sessionDuration),
  duration: z.number(),
});

export const AnalyticsEventSchema = z.union([
  LocationEventSchema,
  PageViewEventSchema,
  SessionDurationEventSchema,
]);

export type LocationEvent = z.infer<typeof LocationEventSchema>;
export type PageViewEvent = z.infer<typeof PageViewEventSchema>;
export type SessionDurationEvent = z.infer<typeof SessionDurationEventSchema>;

export type AnalyticsEvent =
  | LocationEvent
  | PageViewEvent
  | SessionDurationEvent;
