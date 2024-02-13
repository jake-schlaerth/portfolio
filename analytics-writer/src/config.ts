import dotenv from "dotenv";

dotenv.config();

export const config = {
  dbName: process.env.DB_NAME || "",
  dbUri: process.env.DB_URI || "",
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
  kafkaBrokerBaseUrl: process.env.KAFKA_BASE_URL || "",
  kafkaTopic: process.env.KAFKA_TOPIC || "",
  kafkaGroupId: process.env.KAFKA_GROUP_ID || "",
  kafkaClientId: process.env.KAFKA_CLINET_ID || "",
};
