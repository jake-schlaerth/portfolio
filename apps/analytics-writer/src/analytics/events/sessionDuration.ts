import type { SessionDurationEvent } from "analytics-events";
import type { SessionDurationModelType } from "database-models";

export const writeSessionDurationEvent = async (
  sessionDurationEvent: SessionDurationEvent,
  SessionDurationModel: SessionDurationModelType
) => {
  await SessionDurationModel.create({
    duration: sessionDurationEvent.duration,
  });
};
