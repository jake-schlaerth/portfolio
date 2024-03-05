import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { eventNames, type PageViewEvent } from "analytics-events";
import { emitAnalyticsEvent } from "..";

export const useTrackPageView = () => {
  const pathname = usePathname();
  useEffect(() => {
    const analyticsEvent: PageViewEvent = {
      eventName: eventNames.pageView,
      url: pathname,
    };
    emitAnalyticsEvent(analyticsEvent);
  }, [pathname]);
};
