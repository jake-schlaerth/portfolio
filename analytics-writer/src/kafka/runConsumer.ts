import { config } from "@/config";
import { consumer } from "./consumer";

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

      console.log(
        `${
          config.kafkaClientId
        } received kafka message: ${message.value.toString()}`
      );

      // todo: persist to db
    },
  });
};
