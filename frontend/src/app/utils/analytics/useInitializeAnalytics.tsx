import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";

import { sessionStartAtom } from "@/atoms";
import { emitAnalyticsEvent, emitSessionEndEvent, getUnixTimestamp } from ".";

export const useInitializeAnalytics = () => {
  const pathname = usePathname();
  const sessionStart = useAtomValue(sessionStartAtom);
  const [isGeolocationTracked, setIsGeolocationTracked] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator) || isGeolocationTracked) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        emitAnalyticsEvent("location", { location });
        setIsGeolocationTracked(true);
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: false, maximumAge: Infinity }
    );
  }, [isGeolocationTracked]);

  useEffect(() => emitAnalyticsEvent("pageView"), [pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log(
        `Session Duration: ${getUnixTimestamp() - sessionStart} seconds`
      );
      emitSessionEndEvent(getUnixTimestamp() - sessionStart);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sessionStart]);
};
