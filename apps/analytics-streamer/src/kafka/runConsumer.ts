import { getEnvVar } from "utils";
import { AnalyticsEventSchema, eventNames } from "analytics-events";
import { broadcastMessage } from "@/webSocket";
import { consumer } from "./consumer";

export const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: getEnvVar("KAFKA_TOPIC"),
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) {
        return;
      }

      let validatedEvent;
      try {
        const analyticsEvent = JSON.parse(message.value.toString());
        validatedEvent = AnalyticsEventSchema.parse(analyticsEvent);
      } catch (error) {
        console.error(error);
        return;
      }

      if (validatedEvent.eventName === eventNames.location) {
        broadcastMessage(validatedEvent);
      }
    },
  });
};
