import type { PageViewEvent } from "analytics-events";
import type { PageViewModelType } from "database-models";

export const writePageViewEvent = async (
  pageViewEvent: PageViewEvent,
  PageViewModel: PageViewModelType
) => {
  try {
    await PageViewModel.create({
      url: pageViewEvent.url,
    });
  } catch (error) {
    console.error("Error writing pageView event:", error);
  }
};
