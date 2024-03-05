import { useTrackLocation } from "./useTrackLocation";
import { useTrackPageView } from "./useTrackPageView";
import { useTrackSessionDuration } from "./useTrackSessionDuration";

export const useInitializeAnalytics = () => {
  useTrackLocation();
  useTrackPageView();
  useTrackSessionDuration();
};
