import { config } from "@/config";
import { kafkaClient } from "./kafkaClient";

export const consumer = kafkaClient.consumer({
  groupId: config.kafkaGroupId,
});
