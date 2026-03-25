import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { redis } from '@/lib/redis'

const DEFAULT_PROFILE = {
  id: 'thomas',
  name: 'Thomas Zach',
  bio: 'Gründer von SyntiqAI. Software Asset Manager mit Leidenschaft für AI & Automation.',
  avatarUrl: '',
  email: 'thomas@syntiq-ai.at',
  role: 'Gründer & CEO',
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const stored = await redis.hgetall('author:thomas')
  return NextResponse.json(stored && Object.keys(stored).length > 0 ? stored : DEFAULT_PROFILE)
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const updates = await req.json()
  const current = await redis.hgetall('author:thomas') ?? DEFAULT_PROFILE
  const merged = { ...current, ...updates }
  await redis.hset('author:thomas', merged as Record<string, string>)
  return NextResponse.json({ success: true })
}
