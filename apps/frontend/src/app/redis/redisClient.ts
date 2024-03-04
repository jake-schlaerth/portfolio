import { createClient } from "redis";

export const setupRedisClient = async () => {
  const redisClient = createClient({
    url: `redis://${process.env.REDIS_BASE_URL}`,
  });

  return await redisClient.connect();
};
