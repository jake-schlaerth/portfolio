import type { SessionDurationEvent } from "analytics-events";
import type { SessionDurationModelType } from "database-models";

export const writeSessionDurationEvent = async (
  sessionDurationEvent: SessionDurationEvent,
  SessionDurationModel: SessionDurationModelType
) => {
  try {
    await SessionDurationModel.create({
      duration: sessionDurationEvent.duration,
    });
  } catch (error) {
    console.error("Error writing sessionDuration event:", error);
  }
};
