import type { LocationEvent } from "analytics-events";
import type { LocationModelType } from "database-models";

export const writeLocationEvent = async (
  locationEvent: LocationEvent,
  LocationModel: LocationModelType
) => {
  await LocationModel.create({
    latitude: locationEvent.latitude,
    longitude: locationEvent.longitude,
  });
};
