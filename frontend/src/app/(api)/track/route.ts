import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKER_BASE_URL ?? ""],
});

const producer = kafka.producer();

export async function POST(request: Request) {
  const data = await request.json();

  await producer.connect();

  await producer.send({
    topic: "analytics",
    messages: [{ value: JSON.stringify(data) }],
  });

  await producer.disconnect();

  return new Response(JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json" },
  });
}
