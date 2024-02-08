import { useRouter } from "next/router";
import { emitAnalyticsEvent } from ".";
import { useEffect } from "react";

export const useInitializeAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => emitAnalyticsEvent("pageView");

    handleRouteChange();

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, []);
};
