import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber } from '@/lib/redis'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Ungültige E-Mail' }, { status: 400 })
    }
    const id = uuidv4()
    const token = uuidv4()
    await addSubscriber({
      id,
      email,
      name: name || '',
      subscribedAt: new Date().toISOString(),
      status: 'active',
      token,
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 })
  }
}
