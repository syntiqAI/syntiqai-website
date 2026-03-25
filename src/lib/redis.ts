import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export interface Subscriber {
  id: string
  email: string
  name: string
  subscribedAt: string
  status: 'active' | 'unsubscribed'
  token: string
  [key: string]: unknown
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const ids = await redis.smembers('newsletter:ids')
  if (!ids || ids.length === 0) return []
  const pipeline = redis.pipeline()
  for (const id of ids) {
    pipeline.hgetall(`newsletter:subscriber:${id}`)
  }
  const results = await pipeline.exec()
  return (results as Subscriber[]).filter(Boolean)
}

export async function addSubscriber(sub: Subscriber): Promise<void> {
  await redis.sadd('newsletter:ids', sub.id)
  const record: Record<string, string> = {
    id: sub.id, email: sub.email, name: sub.name,
    subscribedAt: sub.subscribedAt, status: sub.status, token: sub.token,
  }
  await redis.hset(`newsletter:subscriber:${sub.id}`, record)
  await redis.set(`newsletter:token:${sub.token}`, sub.id)
}

export async function findByToken(token: string): Promise<Subscriber | null> {
  const id = await redis.get<string>(`newsletter:token:${token}`)
  if (!id) return null
  const sub = await redis.hgetall<Subscriber>(`newsletter:subscriber:${id}`)
  return sub
}

export async function updateSubscriberStatus(id: string, status: 'active' | 'unsubscribed'): Promise<void> {
  await redis.hset(`newsletter:subscriber:${id}`, { status })
}

export async function deleteSubscriber(id: string): Promise<void> {
  const sub = await redis.hgetall<Subscriber>(`newsletter:subscriber:${id}`)
  if (sub?.token) await redis.del(`newsletter:token:${sub.token}`)
  await redis.del(`newsletter:subscriber:${id}`)
  await redis.srem('newsletter:ids', id)
}
