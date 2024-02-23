import { handleEvent } from "./";

describe("handleEvent function", () => {
  const mockEvent = { key: "value" };
  const mockHandler = jest.fn();
  const mockSchema: any = {
    parse: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test("calls handler with validated event on successful validation", async () => {
    mockSchema.parse.mockReturnValue(mockEvent);

    await handleEvent(mockSchema, mockEvent, mockHandler);

    expect(mockSchema.parse).toHaveBeenCalledWith(mockEvent);
    expect(mockHandler).toHaveBeenCalledWith(mockEvent);
  });

  test("does not call handler and logs error on validation failure", async () => {
    console.error = jest.fn();
    const error = new Error("Invalid event data");
    mockSchema.parse.mockImplementation(() => {
      throw error;
    });

    await handleEvent(mockSchema, mockEvent, mockHandler);

    expect(mockHandler).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith("Invalid event data:", error);
  });

  test("handles error if handler fails", async () => {
    console.error = jest.fn();
    mockSchema.parse.mockReturnValue(mockEvent);
    const handlerError = new Error("Handler error");
    mockHandler.mockRejectedValue(handlerError);

    await handleEvent(mockSchema, mockEvent, mockHandler);

    expect(mockHandler).toHaveBeenCalledWith(mockEvent);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid event data:",
      handlerError
    );
  });
});
