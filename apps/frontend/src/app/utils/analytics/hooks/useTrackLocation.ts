import { useEffect, useState } from "react";

import { LocationEvent, eventNames } from "analytics-events";
import { emitAnalyticsEvent } from "..";

export const useTrackLocation = () => {
  const [isLocationTracked, setIsLocationTracked] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator) || isLocationTracked) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const analyticsEvent: LocationEvent = {
          eventName: eventNames.location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        emitAnalyticsEvent(analyticsEvent);
        setIsLocationTracked(true);
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: false, maximumAge: Infinity }
    );
  }, [isLocationTracked]);
};
