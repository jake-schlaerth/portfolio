import { KafkaMessage } from "kafkajs";
import { broadcastMessage } from "@/webSocket";
import { AnalyticsEventSchema, eventNames } from "analytics-events";

export const consumerCallback = (message: KafkaMessage) => {
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
};
