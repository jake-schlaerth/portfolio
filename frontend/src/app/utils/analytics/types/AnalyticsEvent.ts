export type AnalyticsEvent =
  | {
      eventName: "sessionDuration";
      payload: {
        sessionDuration: number;
      };
    }
  | {
      eventName: "pageView";
    }
  | {
      eventName: "location";
      payload: {
        location: number[];
      };
    };
