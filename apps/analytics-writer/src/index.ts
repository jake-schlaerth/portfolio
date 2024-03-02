import { runConsumer } from "kafka-utils";
import { umzug } from "@/umzug";
import { consumerCallback } from "@/kafka";

(async () => {
  await umzug.up();
})();

runConsumer(consumerCallback).catch(console.error);
