import { createClient } from "redis";

export const setupRedisClient = async () => {
  const redisClient = createClient({
    url: `redis://${process.env.REDIS_BASE_URL}`,
  });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  return await redisClient.connect();
};
