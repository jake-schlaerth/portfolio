import {
  LocationEvent,
  PageViewEvent,
  SessionDurationEvent,
  eventNames,
} from "analytics-events";
import { writeAnalyticsEvent } from "./writeAnalyticsEvent";

describe("writeAnalyticsEvent", () => {
  const {
    LocationEventSchema,
    PageViewEventSchema,
    SessionDurationEventSchema,
  } = {
    LocationEventSchema: {
      parse: jest.fn((event) => event),
    },
    PageViewEventSchema: {
      parse: jest.fn((event) => event),
    },
    SessionDurationEventSchema: {
      parse: jest.fn((event) => event),
    },
  };

  const mockWriteLocationEvent = jest.fn();
  const mockWritePageViewEvent = jest.fn();
  const mockWriteSessionDurationEvent = jest.fn();
  const mockEventHandlers = {
    [eventNames.location]: (event: LocationEvent) =>
      mockWriteLocationEvent(event),
    [eventNames.pageView]: (event: PageViewEvent) =>
      mockWritePageViewEvent(event),
    [eventNames.sessionDuration]: (event: SessionDurationEvent) =>
      mockWriteSessionDurationEvent(event),
  };

  it("should handle location event correctly", async () => {
    const mockEvent = {
      eventName: eventNames.location,
      latitude: 123,
      longitude: 456,
    };

    await writeAnalyticsEvent(mockEvent, mockEventHandlers);

    expect(mockWriteLocationEvent).toHaveBeenCalledWith(mockEvent);
  });

  it("should handle pageView event correctly", async () => {
    const mockEvent = {
      eventName: eventNames.pageView,
      url: "https://www.test.com",
    };

    await writeAnalyticsEvent(mockEvent, mockEventHandlers);

    expect(mockWritePageViewEvent).toHaveBeenCalledWith(mockEvent);
  });

  it("should handle sessionDuration event correctly", async () => {
    const mockEvent = {
      eventName: eventNames.sessionDuration,
      duration: 123,
    };

    await writeAnalyticsEvent(mockEvent, mockEventHandlers);

    expect(mockWriteSessionDurationEvent).toHaveBeenCalledWith(mockEvent);
  });

  it("should log an error with invalid event data", async () => {
    const invalidEvent = { eventName: "location", data: "invalidData" };

    console.error = jest.fn();

    await writeAnalyticsEvent(
      invalidEvent as unknown as LocationEvent,
      mockEventHandlers
    );

    expect(console.error).toHaveBeenCalledWith(
      "Invalid event data:",
      expect.any(Error)
    );
  });
});
