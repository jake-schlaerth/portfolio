import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKER_BASE_URL ?? ""],
});

const producer = kafka.producer();

export async function POST(request: Request) {
  console.log(process.env.KAFKA_BROKER_BASE_URL);
  const data = await request.json();

  console.log(data);

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