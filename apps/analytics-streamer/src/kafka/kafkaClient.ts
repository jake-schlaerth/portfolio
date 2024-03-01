import { Kafka, logLevel } from "kafkajs";

import { getEnvVar } from "utils";

export const kafkaClient = new Kafka({
  clientId: getEnvVar("KAFKA_CLIENT_ID"),
  brokers: [getEnvVar("KAFKA_BROKER_BASE_URL")],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: getEnvVar("KAFKA_USERNAME"),
    password: getEnvVar("KAFKA_PASSWORD"),
  },
  logLevel: logLevel.ERROR,
});
