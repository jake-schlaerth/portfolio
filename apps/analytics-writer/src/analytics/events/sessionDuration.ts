import { SessionDuration } from "@/models";
import { BaseAnalyticsEvent } from "./base";

export interface SessionDurationEvent extends BaseAnalyticsEvent {
  duration: number;
}

export async function writeSessionDurationEvent(event: SessionDurationEvent) {
  try {
    await SessionDuration.create({
      duration: event.duration,
    });
  } catch (error) {
    console.error("Error writing sessionDuration event:", error);
  }
}
