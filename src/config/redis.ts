import { createClient, RedisClientType } from 'redis';
import { config } from './config';

export let redisClient: RedisClientType;

export const initRedis  = async (): Promise<void> => {
  redisClient = createClient({
    url: config.REDIS_URL,
  });

  redisClient.on('error', (err) => {
    console.error('❌ Redis Client Error', err)
    process.exit(1);
  });

  await redisClient.connect();
  console.log('✅ Redis connected successfully');
}

export const closeRedis = async (): Promise<void> => {
  try {
    await redisClient.quit();
    console.log('✅ Redis connection closed');
  }
  catch (error) {
    console.error('❌ Error closing Redis connection:', error);
  } 
};