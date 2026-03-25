import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { getAllTasks, createTask, updateTask, deleteTask, Task } from '@/lib/redis'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const tasks = await getAllTasks()
  return NextResponse.json(tasks)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const task: Task = {
    id: uuidv4(),
    title: body.title,
    description: body.description ?? '',
    assignedAgent: body.assignedAgent ?? '',
    priority: body.priority ?? 'medium',
    column: body.column ?? 'backlog',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  await createTask(task)
  return NextResponse.json(task)
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...updates } = await req.json()
  await updateTask(id, updates)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await deleteTask(id)
  return NextResponse.json({ success: true })
}
