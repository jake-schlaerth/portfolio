import type { LocationEvent } from "analytics-events";
import type { LocationModelType } from "database-models";

export const writeLocationEvent = async (
  locationEvent: LocationEvent,
  LocationModel: LocationModelType
) => {
  try {
    await LocationModel.create({
      latitude: locationEvent.latitude,
      longitude: locationEvent.longitude,
    });
  } catch (error) {
    console.error("Error writing location event:", error);
  }
};
