import { runConsumer } from "kafka-utils";
import { consumerCallback } from "@/kafka";

runConsumer(consumerCallback).catch(console.error);
