'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

type Column = 'backlog' | 'inprogress' | 'done'
type Priority = 'low' | 'medium' | 'high'

interface Task {
  id: string
  title: string
  description?: string
  assignedAgent?: string
  priority: Priority
  column: Column
  createdAt: string
}

const COLUMNS: { id: Column; label: string; color: string }[] = [
  { id: 'backlog', label: 'Backlog', color: 'rgba(255,255,255,0.3)' },
  { id: 'inprogress', label: 'In Arbeit', color: '#4f8ef7' },
  { id: 'done', label: 'Erledigt', color: '#4ade80' },
]

const PRIORITY_DOT: Record<Priority, string> = { high: '🔴', medium: '🟡', low: '🟢' }
const AGENTS = ['— Keiner —', 'Jarvis', 'Thomas']

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '0.875rem',
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [dragId, setDragId] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<Column | null>(null)
  const [showCreate, setShowCreate] = useState<Column | null>(null)
  const [form, setForm] = useState({ title: '', description: '', assignedAgent: '', priority: 'medium' as Priority })
  const [saving, setSaving] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch('/api/admin/tasks')
    if (res.ok) setTasks(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])
  useEffect(() => { if (showCreate) setTimeout(() => titleRef.current?.focus(), 50) }, [showCreate])

  function byColumn(col: Column) {
    return tasks.filter(t => t.column === col).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  async function createTask() {
    if (!form.title.trim() || !showCreate) return
    setSaving(true)
    const res = await fetch('/api/admin/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, column: showCreate, assignedAgent: form.assignedAgent === '— Keiner —' ? '' : form.assignedAgent }),
    })
    const task = await res.json()
    setTasks(prev => [...prev, task])
    setForm({ title: '', description: '', assignedAgent: '', priority: 'medium' })
    setShowCreate(null)
    setSaving(false)
  }

  async function moveTask(id: string, toColumn: Column) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, column: toColumn } : t))
    await fetch('/api/admin/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, column: toColumn }),
    })
  }

  async function deleteTask(id: string) {
    if (!confirm('Aufgabe löschen?')) return
    setTasks(prev => prev.filter(t => t.id !== id))
    await fetch('/api/admin/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
  }

  function handleDrop(col: Column) {
    if (dragId && dragId !== col) {
      const task = tasks.find(t => t.id === dragId)
      if (task && task.column !== col) moveTask(dragId, col)
    }
    setDragId(null)
    setDragOver(null)
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '0.5rem', color: 'white', fontSize: '0.875rem', outline: 'none',
    padding: '0.5rem 0.75rem', width: '100%',
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <Link href="/admin" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>← Admin</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '0.25rem' }}>📋 Aufgaben</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Aufgaben erstellen, priorisieren und Agenten zuweisen.</p>
      </div>

      {loading ? <p style={{ color: 'rgba(255,255,255,0.4)' }}>Lade...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', alignItems: 'start' }}>
          {COLUMNS.map(col => {
            const colTasks = byColumn(col.id)
            const isOver = dragOver === col.id
            return (
              <div
                key={col.id}
                onDragOver={e => { e.preventDefault(); setDragOver(col.id) }}
                onDragLeave={() => setDragOver(null)}
                onDrop={() => handleDrop(col.id)}
                style={{
                  ...glass,
                  padding: '1.25rem',
                  border: isOver ? `1px solid rgba(79,142,247,0.5)` : '1px solid rgba(255,255,255,0.08)',
                  background: isOver ? 'rgba(79,142,247,0.06)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.15s', minHeight: '200px',
                }}
              >
                {/* Column header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: col.color }}>{col.label}</span>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.45rem', borderRadius: '999px',
                      background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)',
                    }}>{colTasks.length}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCreate(col.id)}
                    style={{
                      width: '26px', height: '26px', borderRadius: '0.375rem', cursor: 'pointer',
                      background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)',
                      color: '#4f8ef7', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >+</button>
                </div>

                {/* Tasks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {colTasks.map(task => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => setDragId(task.id)}
                      onDragEnd={() => { setDragId(null); setDragOver(null) }}
                      style={{
                        ...glass,
                        padding: '0.875rem 1rem',
                        cursor: 'grab',
                        opacity: dragId === task.id ? 0.4 : 1,
                        transition: 'opacity 0.15s',
                        borderRadius: '0.625rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                            <span title={task.priority}>{PRIORITY_DOT[task.priority]}</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>{task.title}</span>
                          </div>
                          {task.description && (
                            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', margin: '0 0 0.4rem', lineHeight: 1.5 }}>
                              {task.description}
                            </p>
                          )}
                          {task.assignedAgent && (
                            <span style={{
                              fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px',
                              background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.2)',
                              color: '#4f8ef7',
                            }}>→ {task.assignedAgent}</span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteTask(task.id)}
                          style={{
                            background: 'transparent', border: 'none', cursor: 'pointer',
                            color: 'rgba(255,255,255,0.2)', fontSize: '0.9rem', flexShrink: 0, padding: '0',
                          }}
                          title="Löschen"
                        >✕</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inline create form */}
                {showCreate === col.id && (
                  <div style={{ ...glass, padding: '1rem', marginTop: '0.75rem', borderRadius: '0.625rem' }}>
                    <input
                      ref={titleRef}
                      type="text"
                      placeholder="Aufgabentitel *"
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') createTask(); if (e.key === 'Escape') setShowCreate(null) }}
                      style={{ ...inputStyle, marginBottom: '0.5rem' }}
                    />
                    <textarea
                      placeholder="Beschreibung (optional)"
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      style={{ ...inputStyle, minHeight: '60px', resize: 'vertical', marginBottom: '0.5rem' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <select value={form.assignedAgent} onChange={e => setForm(f => ({ ...f, assignedAgent: e.target.value }))}
                        style={{ ...inputStyle, flex: 1 }}>
                        {AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                      <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as Priority }))}
                        style={{ ...inputStyle, flex: 1 }}>
                        <option value="low">🟢 Niedrig</option>
                        <option value="medium">🟡 Mittel</option>
                        <option value="high">🔴 Hoch</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="button" onClick={createTask} disabled={saving || !form.title.trim()} style={{
                        padding: '0.45rem 1rem', borderRadius: '0.375rem', cursor: 'pointer',
                        background: 'linear-gradient(135deg, #4f8ef7, #7c6cf7)', border: 'none',
                        color: 'white', fontWeight: 700, fontSize: '0.8rem', opacity: !form.title.trim() ? 0.5 : 1,
                      }}>Erstellen</button>
                      <button type="button" onClick={() => setShowCreate(null)} style={{
                        padding: '0.45rem 0.875rem', borderRadius: '0.375rem', cursor: 'pointer',
                        background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem',
                      }}>Abbrechen</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
