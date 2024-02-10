import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { emitAnalyticsEvent } from ".";

const getUnixTimestamp = (date = new Date()) =>
  Math.floor(date.getTime() / 1000);
const sessionStartTime = getUnixTimestamp();

export const useInitializeAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => emitAnalyticsEvent("pageView"), [pathname]);

  useEffect(() => {
    if (document.visibilityState === "hidden") {
      const duration = getUnixTimestamp() - sessionStartTime;

      emitAnalyticsEvent("sessionDuration", { duration });
    }
  });
};
