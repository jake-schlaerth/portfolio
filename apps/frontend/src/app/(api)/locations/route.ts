import { setupRedisClient } from "@/redis";
import { getLocationsFromDatabase } from "./getLocationsFromDatabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const redisClient = await setupRedisClient();
  const cacheKey = "locations";
  let locations;

  const cachedLocations = await redisClient.get(cacheKey);
  if (cachedLocations) {
    locations = JSON.parse(cachedLocations);
  } else {
    locations = await getLocationsFromDatabase();

    await redisClient.set(cacheKey, JSON.stringify(locations), {
      EX: 60,
    });
  }

  return new Response(JSON.stringify(locations));
}
