import { PageView } from "@/models";
import { BaseAnalyticsEvent } from "./base";

export interface PageViewEvent extends BaseAnalyticsEvent {
  url: string;
}

export async function writePageViewEvent(pageViewEvent: PageViewEvent) {
  try {
    await PageView.create({
      url: pageViewEvent.url,
    });
  } catch (error) {
    console.error("Error writing pageView event:", error);
  }
}
