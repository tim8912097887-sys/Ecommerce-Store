import { createClient } from "redis";

export const redisClient = async() => await createClient().connect();