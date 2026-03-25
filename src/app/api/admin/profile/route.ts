import { NextRequest, NextResponse } from 'next/server'
import { getAdminProfile, setAdminProfile } from '@/lib/redis'
import { getToken } from 'next-auth/jwt'
import fs from 'fs'
import path from 'path'

async function isAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET })
  return !!token
}

export async function GET(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // Read from static file (can be overridden by Redis later)
  try {
    const filePath = path.join(process.cwd(), 'content/authors/thomas.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({})
  }
}

export async function PATCH(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const updates = await req.json()
  // Write back to static file
  try {
    const filePath = path.join(process.cwd(), 'content/authors/thomas.json')
    const current = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const updated = { ...current, ...updates }
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2))
    // Also store in Redis as backup
    await setAdminProfile(updates)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 })
  }
}
