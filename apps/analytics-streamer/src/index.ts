import { runConsumer } from "kafka";
import { consumerCallback } from "@/kafka";

runConsumer(consumerCallback).catch(console.error);
