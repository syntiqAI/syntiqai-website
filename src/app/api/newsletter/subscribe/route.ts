import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber } from '@/lib/redis'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const { email, name, consentText } = await req.json()
    if (!email || !email.includes('@')) return NextResponse.json({ error: 'Ungültige E-Mail' }, { status: 400 })
    if (!consentText) return NextResponse.json({ error: 'Einwilligung fehlt' }, { status: 400 })
    const now = new Date().toISOString()
    await addSubscriber({
      id: uuidv4(), email, name: name || '',
      subscribedAt: now, consentDate: now,
      consentText, status: 'active', token: uuidv4(),
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 })
  }
}
