import { umzug } from "@/umzug";
import { runConsumer } from "@/kafka";

(async () => {
  await umzug.up();
})();

runConsumer().catch(console.error);
