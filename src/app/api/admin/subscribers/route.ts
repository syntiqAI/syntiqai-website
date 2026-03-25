import { NextRequest, NextResponse } from 'next/server'
import { getSubscribers, deleteSubscriber, updateSubscriberStatus } from '@/lib/redis'
import { getToken } from 'next-auth/jwt'

async function isAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  return !!token
}

export async function GET(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const subs = await getSubscribers()
  return NextResponse.json(subs)
}

export async function DELETE(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await deleteSubscriber(id)
  return NextResponse.json({ success: true })
}

export async function PATCH(req: NextRequest) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, status } = await req.json()
  await updateSubscriberStatus(id, status)
  return NextResponse.json({ success: true })
}
