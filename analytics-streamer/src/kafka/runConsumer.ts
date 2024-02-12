import { config } from "@/config";
import { broadcastMessage } from "@/webSocket";
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
        `consumer received kafka message: ${message.value.toString()}`
      );
      broadcastMessage(message.value.toString());
    },
  });
};
