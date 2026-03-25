import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// ─── Newsletter ──────────────────────────────────────────────────────────────

export interface Subscriber {
  id: string
  email: string
  name: string
  subscribedAt: string
  consentDate: string
  consentText: string
  status: 'active' | 'unsubscribed'
  token: string
  [key: string]: unknown
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const ids = await redis.smembers('newsletter:ids')
  if (!ids || ids.length === 0) return []
  const pipeline = redis.pipeline()
  for (const id of ids) pipeline.hgetall(`newsletter:subscriber:${id}`)
  const results = await pipeline.exec()
  return (results as Subscriber[]).filter(Boolean)
}

export async function addSubscriber(sub: Subscriber): Promise<void> {
  const record: Record<string, string> = {
    id: sub.id, email: sub.email, name: sub.name,
    subscribedAt: sub.subscribedAt, consentDate: sub.consentDate,
    consentText: sub.consentText, status: sub.status, token: sub.token,
  }
  await redis.sadd('newsletter:ids', sub.id)
  await redis.hset(`newsletter:subscriber:${sub.id}`, record)
  await redis.set(`newsletter:token:${sub.token}`, sub.id)
}

export async function findByToken(token: string): Promise<Subscriber | null> {
  const id = await redis.get<string>(`newsletter:token:${token}`)
  if (!id) return null
  return redis.hgetall<Subscriber>(`newsletter:subscriber:${id}`)
}

export async function updateSubscriberStatus(id: string, status: 'active' | 'unsubscribed'): Promise<void> {
  await redis.hset(`newsletter:subscriber:${id}`, { status })
}

export async function deleteSubscriber(id: string): Promise<void> {
  const sub = await redis.hgetall<Subscriber>(`newsletter:subscriber:${id}`)
  if (sub?.token) await redis.del(`newsletter:token:${sub.token as string}`)
  await redis.del(`newsletter:subscriber:${id}`)
  await redis.srem('newsletter:ids', id)
}

// ─── Admin Profile ───────────────────────────────────────────────────────────

export interface AdminProfile {
  name: string
  email: string
  bio: string
  avatarUrl: string
  role: string
  passwordHash: string
  [key: string]: unknown
}

export async function getAdminProfile(): Promise<AdminProfile | null> {
  return redis.hgetall<AdminProfile>('admin:profile')
}

export async function setAdminProfile(profile: Partial<AdminProfile>): Promise<void> {
  await redis.hset('admin:profile', profile as Record<string, string>)
}
