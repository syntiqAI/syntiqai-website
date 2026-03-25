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

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editSlug, setEditSlug] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')

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

  async function openEditor(slug: string) {
    setEditSlug(slug)
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
          {posts.map(post => (
            <div key={post.slug} className="glass-card" style={{ padding: '1.5rem 1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
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
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', margin: '0 0 0.25rem' }}>{post.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{post.description}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, flexWrap: 'wrap', alignItems: 'center' }}>
                  <button onClick={() => openEditor(post.slug)} style={{
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
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editSlug && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '2rem 1rem', overflowY: 'auto',
        }} onClick={e => { if (e.target === e.currentTarget) setEditSlug(null) }}>
          <div style={{
            background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem',
            width: '100%', maxWidth: '860px', padding: '2rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Beitrag bearbeiten</h2>
              <button onClick={() => setEditSlug(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
            </div>

            {editLoading ? (
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>Lade Inhalt...</p>
            ) : (
              <>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>
                  MDX-Inhalt (ohne Frontmatter). Änderungen werden in der Datenbank gespeichert.
                </p>
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  style={{
                    ...inputStyle, width: '100%', minHeight: '500px', padding: '1rem',
                    resize: 'vertical', lineHeight: 1.6, fontFamily: 'monospace', fontSize: '0.85rem',
                  }}
                />
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', alignItems: 'center' }}>
                  <button onClick={saveEdit} disabled={saving} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                    {saving ? 'Speichern...' : 'Speichern'}
                  </button>
                  <button onClick={() => setEditSlug(null)} className="btn-secondary" style={{ padding: '0.6rem 1.25rem' }}>
                    Schließen
                  </button>
                  {savedMsg && <span style={{ color: '#4ade80', fontSize: '0.875rem' }}>{savedMsg}</span>}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
