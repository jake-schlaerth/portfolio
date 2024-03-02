import type { KafkaMessage } from "kafkajs";
import { getEnvVar } from "utils";
import { eventHandlers, writeAnalyticsEvent } from "@/analytics";

export const consumerCallback = async (message: KafkaMessage) => {
  if (!message.value) {
    return;
  }

  console.log(
    `${getEnvVar(
      "KAFKA_CLIENT_ID"
    )} received kafka message: ${message.value.toString()}`
  );

  await writeAnalyticsEvent(
    JSON.parse(message.value.toString()),
    eventHandlers
  );
};
