import { Kafka } from "kafkajs";
import { getEnvVar } from "@/config";

export const kafkaClient = new Kafka({
  clientId: getEnvVar("KAFKA_CLIENT_ID"),
  brokers: [getEnvVar("KAFKA_BROKER_BASE_URL")],
});
