import { z } from "zod";

export const handleEvent = async <T>(
  schema: z.ZodSchema<T>,
  event: T,
  handler: (event: T) => Promise<void>
) => {
  try {
    const validatedEvent = schema.parse(event);
    await handler(validatedEvent);
  } catch (error) {
    console.error("Invalid event data:", error);
  }
};
