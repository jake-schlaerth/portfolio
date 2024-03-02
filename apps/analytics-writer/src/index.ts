import { runConsumer } from "kafka";
import { umzug } from "@/umzug";
import { consumerCallback } from "@/kafka";

(async () => {
  await umzug.up();
})();

runConsumer(consumerCallback).catch(console.error);
