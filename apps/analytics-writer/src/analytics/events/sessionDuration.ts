import { SessionDurationEvent } from "analytics-events";
import { SessionDuration } from "@/models";

export async function writeSessionDurationEvent(event: SessionDurationEvent) {
  try {
    await SessionDuration.create({
      duration: event.duration,
    });
  } catch (error) {
    console.error("Error writing sessionDuration event:", error);
  }
}
