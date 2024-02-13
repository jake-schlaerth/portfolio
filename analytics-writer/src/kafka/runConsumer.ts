import { getEnvVar } from "@/config";
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

      console.log(
        `${getEnvVar(
          "KAFKA_CLIENT_ID"
        )} received kafka message: ${message.value.toString()}`
      );

      // todo: persist to db
    },
  });
};
