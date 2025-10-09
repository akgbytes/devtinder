import { redis } from "@/config/redis";

export async function setCache(key: string, value: any) {
  if (typeof value === "string") {
    await redis.set(`cache:${key}`, `__str__${value}`);
  } else {
    await redis.set(`cache:${key}`, `__json__${JSON.stringify(value)}`);
  }
}

export async function deleteCache(key: string) {
  await redis.del(`cache:${key}`);
}

export async function getCache<T = unknown>(key: string) {
  const val = await redis.get(`cache:${key}`);
  if (!val) return null;

  if (val.startsWith("__str__")) {
    return val.slice(7) as T;
  }

  if (val.startsWith("__json__")) {
    return JSON.parse(val.slice(8)) as T;
  }

  // fallback
  return val as T;
}
