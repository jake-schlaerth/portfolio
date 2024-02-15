import { setupRedisClient } from "@/redis";

export async function GET() {
  const redisClient = await setupRedisClient();
  const cacheKey = "events";
  let events;

  const cachedEvents = await redisClient.get(cacheKey);
  if (cachedEvents) {
    events = JSON.parse(cachedEvents);
  } else {
    // TODO
    // events = await fetchEventsFromDatabase();

    await redisClient.set(cacheKey, JSON.stringify(events), {
      EX: 60 * 60,
    });
  }

  return new Response(JSON.stringify(events));
}
