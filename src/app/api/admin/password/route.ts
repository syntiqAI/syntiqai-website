import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import bcrypt from 'bcryptjs'
import { redis } from '@/lib/redis'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { currentPassword, newPassword } = await req.json()
  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: 'Neues Passwort muss mindestens 8 Zeichen haben' }, { status: 400 })
  }

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
    note: 'Passwort gespeichert. Aktualisiere auch ADMIN_PASSWORD_HASH in Vercel env vars.',
    newHash,
  })
}
