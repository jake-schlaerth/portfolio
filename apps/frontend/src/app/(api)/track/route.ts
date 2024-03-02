import { AnalyticsEventSchema } from "analytics-events";
import { producer } from "kafka";
import { getEnvVar } from "utils";

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
