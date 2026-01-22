import { redisClient } from "../config/redis";
import { resultData } from "../routes/interface/resultInterface";

export const getCache =  async (key: string): Promise<string | null> => {
    const value = await redisClient.get(key);
    return value;
}

export const setCache = async (key: string, value: resultData[]): Promise<void> => {
    await redisClient.setEx(key, 3000, JSON.stringify(value));
}

export const deleteCache = async (key: string): Promise<void> => {
    await redisClient.del(key);
}