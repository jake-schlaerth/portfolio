import type { PageViewEvent } from "analytics-events";
import type { PageViewModelType } from "database-models";

export const writePageViewEvent = async (
  pageViewEvent: PageViewEvent,
  PageViewModel: PageViewModelType
) => {
  await PageViewModel.create({
    url: pageViewEvent.url,
  });
};
