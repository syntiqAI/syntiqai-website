'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  published: boolean
}

interface Section {
  id: number
  level: number
  text: string
  lineStart: number
}

function parseSections(content: string): Section[] {
  const lines = content.split('\n')
  const sections: Section[] = []
  let counter = 0
  lines.forEach((line, i) => {
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match) {
      counter++
      sections.push({ id: counter, level: match[1].length, text: match[2], lineStart: i + 1 })
    }
  })
  return sections
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editSlug, setEditSlug] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')
  const [showSections, setShowSections] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/blog')
    if (!res.ok) { setLoading(false); return }
    const data = await res.json()
    setPosts(Array.isArray(data) ? data.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function toggle(slug: string, current: boolean) {
    await fetch('/api/admin/blog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, published: !current }),
    })
    load()
  }

  async function openEditor(slug: string, title: string) {
    setEditSlug(slug)
    setEditTitle(title)
    setShowSections(false)
    setEditLoading(true)
    const res = await fetch(`/api/admin/blog?slug=${slug}`)
    const data = await res.json()
    setEditContent(data.content ?? '')
    setEditLoading(false)
  }

  async function saveEdit() {
    if (!editSlug) return
    setSaving(true)
    await fetch('/api/admin/blog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: editSlug, content: editContent }),
    })
    setSaving(false)
    setSavedMsg('✓ Gespeichert')
    setTimeout(() => setSavedMsg(''), 2500)
  }

  const sections = editContent ? parseSections(editContent) : []

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '0.5rem', color: 'white', fontSize: '0.875rem', outline: 'none',
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <Link href="/admin" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>← Admin</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '0.25rem' }}>Blog-Verwaltung</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Entwürfe freigeben, bearbeiten oder deaktivieren.</p>
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Lade...</p>
      ) : posts.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Noch keine Posts.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {posts.map((post, idx) => {
            const postNum = posts.length - idx // highest = newest = Blog #N
            return (
              <div key={post.slug} className="glass-card" style={{ padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>

                  {/* Post number badge */}
                  <div style={{
                    minWidth: '44px', height: '44px', borderRadius: '0.5rem',
                    background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, flexDirection: 'column',
                  }}>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(79,142,247,0.6)', lineHeight: 1 }}>Blog</span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#4f8ef7', lineHeight: 1.2 }}>#{postNum}</span>
                  </div>

                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 700,
                        background: post.published ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                        color: post.published ? '#4ade80' : '#facc15',
                        border: `1px solid ${post.published ? 'rgba(34,197,94,0.25)' : 'rgba(234,179,8,0.25)'}`,
                        textTransform: 'uppercase' as const, letterSpacing: '0.05em',
                      }}>
                        {post.published ? 'Veröffentlicht' : '✏️ Entwurf'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
                        {new Date(post.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
                        {post.author && ` · ${post.author}`}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', margin: '0 0 0.2rem' }}>{post.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', margin: 0, fontFamily: 'monospace' }}>{post.slug}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button onClick={() => openEditor(post.slug, post.title)} style={{
                      fontSize: '0.8rem', padding: '0.45rem 1rem', borderRadius: '0.375rem', cursor: 'pointer',
                      border: '1px solid rgba(79,142,247,0.3)', background: 'rgba(79,142,247,0.08)', color: '#4f8ef7',
                    }}>✏️ Bearbeiten</button>

                    <Link href={`/blog/${post.slug}`} target="_blank" style={{
                      fontSize: '0.8rem', padding: '0.45rem 1rem', borderRadius: '0.375rem',
                      border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    }}>Ansehen ↗</Link>

                    <button onClick={() => toggle(post.slug, post.published)} style={{
                      fontSize: '0.8rem', padding: '0.45rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 700,
                      border: post.published ? '1px solid rgba(248,113,113,0.3)' : '1px solid rgba(34,197,94,0.4)',
                      background: post.published ? 'rgba(248,113,113,0.08)' : 'rgba(34,197,94,0.12)',
                      color: post.published ? '#f87171' : '#4ade80',
                    }}>
                      {post.published ? 'Deaktivieren' : '✓ Freigeben'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editSlug && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '2rem 1rem', overflowY: 'auto',
        }} onClick={e => { if (e.target === e.currentTarget) setEditSlug(null) }}>
          <div style={{
            background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem',
            width: '100%', maxWidth: '960px', padding: '2rem',
          }}>
            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.2rem' }}>{editTitle}</h2>
                <code style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{editSlug}</code>
              </div>
              <button type="button" onClick={() => setEditSlug(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.25rem', cursor: 'pointer', flexShrink: 0 }}>✕</button>
            </div>

            {editLoading ? <p style={{ color: 'rgba(255,255,255,0.4)' }}>Lade Inhalt...</p> : (
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

                {/* Editor */}
                <div style={{ flex: 1 }}>
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    style={{
                      ...inputStyle, width: '100%', minHeight: '520px', padding: '1rem',
                      resize: 'vertical', lineHeight: 1.6, fontFamily: 'monospace', fontSize: '0.85rem',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={saveEdit}
                      disabled={saving}
                      style={{
                        padding: '0.6rem 1.5rem', borderRadius: '0.5rem', cursor: saving ? 'not-allowed' : 'pointer',
                        background: 'linear-gradient(135deg, #4f8ef7, #7c6cf7)',
                        border: 'none', color: 'white', fontWeight: 700, fontSize: '0.875rem',
                        opacity: saving ? 0.7 : 1,
                      }}
                    >
                      {saving ? 'Speichern...' : 'Speichern'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditSlug(null)}
                      style={{
                        padding: '0.6rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer',
                        background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem',
                      }}
                    >
                      Schließen
                    </button>
                    {savedMsg && <span style={{ color: '#4ade80', fontSize: '0.875rem' }}>{savedMsg}</span>}
                  </div>
                </div>

                {/* Sections panel */}
                <div style={{ width: '220px', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                    Abschnitte
                  </div>
                  {sections.length === 0 ? (
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)' }}>Keine Überschriften gefunden.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {sections.map(s => (
                        <div key={s.id} style={{
                          display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                          padding: '0.4rem 0.6rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderLeft: `2px solid ${s.level === 1 ? '#4f8ef7' : s.level === 2 ? '#a78bfa' : 'rgba(255,255,255,0.2)'}`,
                          borderRadius: '0 0.375rem 0.375rem 0',
                          paddingLeft: `${(s.level - 1) * 0.5 + 0.6}rem`,
                        }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#4f8ef7', flexShrink: 0, marginTop: '1px' }}>#{s.id}</span>
                          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{s.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.15)', borderRadius: '0.5rem' }}>
                    <p style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5 }}>
                      Sag mir z.B.:<br />
                      <em style={{ color: 'rgba(79,142,247,0.8)' }}>„Blog #2, Abschnitt 3 — schreib das kürzer"</em>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
