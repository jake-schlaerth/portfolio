import { PageViewEvent } from "analytics-events";
import { PageView } from "@/models";

export async function writePageViewEvent(pageViewEvent: PageViewEvent) {
  try {
    await PageView.create({
      url: pageViewEvent.url,
    });
  } catch (error) {
    console.error("Error writing pageView event:", error);
  }
}
