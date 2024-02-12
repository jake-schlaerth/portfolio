import dotenv from "dotenv";

dotenv.config();

export const config = {
  kafkaBrokerBaseUrl: process.env.KAFKA_BROKER_BASE_URL || "",
  kafkaClientId: process.env.KAFKA_CLIENT_ID || "",
  kafkaGroupId: process.env.KAFKA_GROUP_ID || "",
  kafkaTopic: process.env.KAFKA_TOPIC || "",
  port: process.env.PORT || "",
};
