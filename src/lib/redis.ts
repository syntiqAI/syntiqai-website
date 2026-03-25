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

// ─── Blog Publication ────────────────────────────────────────────────────────

export async function getBlogPublishStatus(slug: string): Promise<boolean | null> {
  const val = await redis.get<string>(`blog:published:${slug}`)
  if (val === null) return null
  return val === 'true'
}

export async function setBlogPublishStatus(slug: string, published: boolean): Promise<void> {
  await redis.set(`blog:published:${slug}`, published ? 'true' : 'false')
}

export async function getAllBlogPublishOverrides(): Promise<Record<string, boolean>> {
  // We store keys as blog:published:slug — scan for them
  const result: Record<string, boolean> = {}
  try {
    const keys = await redis.keys('blog:published:*')
    for (const key of keys) {
      const slug = key.replace('blog:published:', '')
      const val = await redis.get<string>(key)
      result[slug] = val === 'true'
    }
  } catch { /* ignore */ }
  return result
}

interface ContentOverride {
  content: string
  savedVersion: number // frontmatter version when admin saved this
}

export async function getBlogContentOverride(slug: string, fileVersion = 0): Promise<string | null> {
  const override = await redis.get<ContentOverride>(`blog:content:${slug}`)
  if (!override) return null
  // File has been updated since admin last saved → file wins
  if (fileVersion > (override.savedVersion ?? 0)) return null
  return override.content
}

export async function getBlogContentOverrideRaw(slug: string): Promise<ContentOverride | null> {
  return redis.get<ContentOverride>(`blog:content:${slug}`)
}

export async function setBlogContentOverride(slug: string, content: string, savedVersion = 0): Promise<void> {
  await redis.set(`blog:content:${slug}`, { content, savedVersion })
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
