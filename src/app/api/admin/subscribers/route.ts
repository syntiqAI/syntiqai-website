import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { getSubscribers, deleteSubscriber, updateSubscriberStatus } from '@/lib/redis'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const subs = await getSubscribers()
  return NextResponse.json(subs)
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await deleteSubscriber(id)
  return NextResponse.json({ success: true })
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, status } = await req.json()
  await updateSubscriberStatus(id, status)
  return NextResponse.json({ success: true })
}
