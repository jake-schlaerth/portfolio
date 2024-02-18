import { AnalyticsEventSchema } from "analytics-events";
import { Kafka } from "kafkajs";
import { getEnvVar } from "utils";

const kafka = new Kafka({
  clientId: getEnvVar("KAFKA_CLIENT_ID"),
  brokers: [getEnvVar("KAFKA_BROKER_BASE_URL")],
});

const producer = kafka.producer();

export async function POST(request: Request) {
  let validatedEvent;

  try {
    validatedEvent = AnalyticsEventSchema.parse(await request.json());
  } catch (error) {
    console.error(error);
    return;
  }

  await producer.connect();

  await producer.send({
    topic: getEnvVar("KAFKA_TOPIC"),
    messages: [{ value: JSON.stringify(validatedEvent) }],
  });

  await producer.disconnect();

  return new Response();
}
