import { Location } from "@/models";
import { BaseAnalyticsEvent } from "./base";

export interface LocationEvent extends BaseAnalyticsEvent {
  location: number[];
}

export async function writeLocationEvent(event: LocationEvent) {
  const [latitude, longitude] = event.location;
  try {
    await Location.create({
      latitude,
      longitude,
    });
  } catch (error) {
    console.error("Error writing location event:", error);
  }
}
