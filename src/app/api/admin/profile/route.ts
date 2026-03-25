import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { setAdminProfile } from '@/lib/redis'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const filePath = path.join(process.cwd(), 'content/authors/thomas.json')
    return NextResponse.json(JSON.parse(fs.readFileSync(filePath, 'utf8')))
  } catch {
    return NextResponse.json({})
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const updates = await req.json()
  try {
    const filePath = path.join(process.cwd(), 'content/authors/thomas.json')
    const current = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    fs.writeFileSync(filePath, JSON.stringify({ ...current, ...updates }, null, 2))
    await setAdminProfile(updates)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 })
  }
}
