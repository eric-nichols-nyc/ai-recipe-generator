import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function getRateLimitCount(userId: string): Promise<number> {
  const count = await redis.get<number>(`rate_limit:${userId}`)
  return count ?? 0
}

export async function incrementRateLimitCount(userId: string): Promise<void> {
  await redis.incr(`rate_limit:${userId}`)
  await redis.expire(`rate_limit:${userId}`, 24 * 60 * 60) // 24 hours expiry
}
