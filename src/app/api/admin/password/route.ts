import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import bcrypt from 'bcryptjs'
import { redis } from '@/lib/redis'

async function isAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET })
  return !!token
}

export async function POST(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { currentPassword, newPassword } = await req.json()
  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: 'Neues Passwort muss mindestens 8 Zeichen haben' }, { status: 400 })
  }

  // Check current password against env var hash or Redis-stored hash
  const envHash = process.env.ADMIN_PASSWORD_HASH
  const redisHash = await redis.get<string>('admin:password_hash')
  const hash = redisHash ?? envHash

  if (!hash) return NextResponse.json({ error: 'Konfigurationsfehler' }, { status: 500 })

  const valid = await bcrypt.compare(currentPassword, hash)
  if (!valid) return NextResponse.json({ error: 'Aktuelles Passwort ist falsch' }, { status: 400 })

  const newHash = await bcrypt.hash(newPassword, 12)
  await redis.set('admin:password_hash', newHash)

  return NextResponse.json({
    success: true,
    note: 'Passwort gespeichert. Aktualisiere auch ADMIN_PASSWORD_HASH in Vercel env vars für dauerhaften Schutz.',
    newHash,
  })
}
