import { setupRedisClient } from "@/redis";
import { getLocationsFromDatabase } from "./getLocationsFromDatabase";

export async function GET() {
  const redisClient = await setupRedisClient();
  const cacheKey = "locations";
  let locations;

  const cachedEvents = await redisClient.get(cacheKey);
  if (cachedEvents) {
    locations = JSON.parse(cachedEvents);
  } else {
    locations = await getLocationsFromDatabase();

    await redisClient.set(cacheKey, JSON.stringify(locations), {
      EX: 60 * 60,
    });
  }

  return new Response(JSON.stringify(locations));
}
