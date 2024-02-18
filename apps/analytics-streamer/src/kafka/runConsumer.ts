import { config } from "@/config";
import { broadcastMessage } from "@/webSocket";
import { consumer } from "./consumer";
import { AnalyticsEventSchema, eventNames } from "analytics-events";

export const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: config.kafkaTopic,
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
