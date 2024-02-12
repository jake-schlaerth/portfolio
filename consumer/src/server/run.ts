import { config } from "@/config";
import { consumer } from "@/kafka/consumer";
import { broadcastMessage } from "@/webSocket/broadcastMessage";

export const run = async () => {
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

      console.log(`Received message: ${message.value.toString()}`);
      broadcastMessage(message.value.toString());
    },
  });
};
