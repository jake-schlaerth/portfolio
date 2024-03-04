import { runConsumer } from "kafka-utils";
import { umzugClient } from "@/umzugClient";
import { consumerCallback } from "@/kafka";
import { setupServer } from "./http";

(async () => {
  await umzugClient.up();
})();

setupServer();

runConsumer(consumerCallback).catch(console.error);
