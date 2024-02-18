import { LocationEvent } from "analytics-events";
import { Location } from "@/models";

export async function writeLocationEvent(event: LocationEvent) {
  try {
    await Location.create({
      latitude: event.latitude,
      longitude: event.longitude,
    });
  } catch (error) {
    console.error("Error writing location event:", error);
  }
}
