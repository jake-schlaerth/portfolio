import { getEnvVar } from "@/config";
import { kafkaClient } from "./kafkaClient";

export const consumer = kafkaClient.consumer({
  groupId: getEnvVar("KAFKA_GROUP_ID"),
});
