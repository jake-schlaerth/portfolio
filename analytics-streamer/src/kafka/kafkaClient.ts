import { Kafka } from "kafkajs";
import { config } from "@/config";

export const kafkaClient = new Kafka({
  clientId: config.kafkaClientId,
  brokers: [config.kafkaBrokerBaseUrl],
});
