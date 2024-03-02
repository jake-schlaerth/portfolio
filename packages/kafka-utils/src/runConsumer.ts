import { KafkaMessage } from "kafkajs";

import { getEnvVar } from "utils";
import { consumer } from "./consumer";

export const runConsumer = async (
  callback: (message: KafkaMessage) => void,
  fromBeginning: boolean = false
) => {
  await consumer.connect();
  await consumer.subscribe({
    topic: getEnvVar("KAFKA_TOPIC"),
    fromBeginning,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      await callback(message);
    },
  });
};
