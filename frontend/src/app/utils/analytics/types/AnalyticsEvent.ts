export type AnalyticsEvent =
  | {
      eventName: "sessionDuration";
      payload: {
        duration: number;
      };
    }
  | {
      eventName: "pageView";
    }
  | {
      eventName: "location";
      payload: {
        location: string;
      };
    };
