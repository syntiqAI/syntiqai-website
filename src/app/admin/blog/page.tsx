'use client'

import { useEffect, useState, useRef, useTransition } from 'react'
import Link from 'next/link'
import {
  getPostsAction,
  togglePublishAction,
  getPostContentAction,
  saveContentAction,
  resetContentAction,
} from './actions'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  published: boolean
}

interface Section { id: number; level: number; text: string }

function parseSections(content: string): Section[] {
  const lines = content.split('\n')
  const sections: Section[] = []
  let counter = 0
  lines.forEach(line => {
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match) sections.push({ id: ++counter, level: match[1].length, text: match[2] })
  })
  return sections
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editSlug, setEditSlug] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [fileVersion, setFileVersion] = useState(0)
  const [savedVersion, setSavedVersion] = useState<number | null>(null)
  const [hasNewerFile, setHasNewerFile] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')
  const [isPending, startTransition] = useTransition()
  const titleRef = useRef<HTMLInputElement>(null)

  async function load() {
    setLoading(true)
    try {
      const data = await getPostsAction()
      setPosts(data)
    } catch { /* unauthorized */ }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function handleToggle(slug: string, current: boolean) {
    // Optimistic update
    setPosts(prev => prev.map(p => p.slug === slug ? { ...p, published: !current } : p))
    startTransition(async () => {
      try {
        await togglePublishAction(slug, !current)
      } catch {
        // Revert on error
        setPosts(prev => prev.map(p => p.slug === slug ? { ...p, published: current } : p))
        alert('Fehler beim Speichern. Bitte Seite neu laden.')
      }
    })
  }

  async function openEditor(slug: string, title: string) {
    setEditSlug(slug)
    setEditTitle(title)
    setEditLoading(true)
    try {
      const data = await getPostContentAction(slug)
      setFileContent(data.content)
      setFileVersion(data.fileVersion)
      setSavedVersion(data.savedVersion)
      setHasNewerFile(data.hasNewerFile)
      setEditContent(data.adminContent && !data.hasNewerFile ? data.adminContent : data.content)
    } catch { /* error */ }
    setEditLoading(false)
  }

  function handleSave() {
    if (!editSlug) return
    startTransition(async () => {
      try {
        await saveContentAction(editSlug, editContent, fileVersion)
        setSavedVersion(fileVersion)
        setHasNewerFile(false)
        setSavedMsg('✓ Gespeichert')
        setTimeout(() => setSavedMsg(''), 2500)
      } catch {
        alert('Fehler beim Speichern.')
      }
    })
  }

  function handleReset() {
    if (!editSlug) return
    startTransition(async () => {
      try {
        await resetContentAction(editSlug)
        setEditContent(fileContent)
        setHasNewerFile(false)
        setSavedVersion(null)
        setSavedMsg('✓ Zurückgesetzt')
        setTimeout(() => setSavedMsg(''), 2500)
      } catch {
        alert('Fehler beim Zurücksetzen.')
      }
    })
  }

  const sections = editContent ? parseSections(editContent) : []

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '0.5rem', color: 'white', fontSize: '0.875rem', outline: 'none',
    padding: '0.5rem 0.75rem', width: '100%',
  }

  const btn = (color: string, bg: string, border: string): React.CSSProperties => ({
    padding: '0.45rem 1rem', borderRadius: '0.375rem', cursor: isPending ? 'not-allowed' : 'pointer',
    background: bg, border: `1px solid ${border}`, color, fontSize: '0.8rem', fontWeight: 600,
    opacity: isPending ? 0.6 : 1,
  })

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
        <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem' }}>Noch keine Posts.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {posts.map((post, idx) => {
            const postNum = posts.length - idx
            return (
              <div key={post.slug} style={{ padding: '1.5rem 1.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
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
                    <code style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{post.slug}</code>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button type="button" onClick={() => openEditor(post.slug, post.title)}
                      style={btn('#4f8ef7', 'rgba(79,142,247,0.08)', 'rgba(79,142,247,0.3)')}>
                      ✏️ Bearbeiten
                    </button>
                    <Link href={`/blog/${post.slug}`} target="_blank"
                      style={{ ...btn('rgba(255,255,255,0.6)', 'transparent', 'rgba(255,255,255,0.15)'), textDecoration: 'none', display: 'inline-block' }}>
                      Ansehen ↗
                    </Link>
                    <button type="button" onClick={() => handleToggle(post.slug, post.published)}
                      style={btn(
                        post.published ? '#f87171' : '#4ade80',
                        post.published ? 'rgba(248,113,113,0.08)' : 'rgba(34,197,94,0.12)',
                        post.published ? 'rgba(248,113,113,0.3)' : 'rgba(34,197,94,0.4)',
                      )}>
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
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}
          onClick={e => { if (e.target === e.currentTarget) setEditSlug(null) }}
        >
          <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', width: '100%', maxWidth: '960px', padding: '2rem', position: 'relative', zIndex: 201 }}
            onClick={e => e.stopPropagation()}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.2rem' }}>{editTitle}</h2>
                <code style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{editSlug}</code>
              </div>
              <button type="button" onClick={() => setEditSlug(null)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
            </div>

            {editLoading ? <p style={{ color: 'rgba(255,255,255,0.4)' }}>Lade...</p> : (
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  {hasNewerFile && (
                    <div style={{ padding: '0.75rem 1rem', marginBottom: '0.75rem', background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.25)', borderRadius: '0.5rem', fontSize: '0.82rem', color: '#4f8ef7' }}>
                      🆕 Jarvis hat eine neue Version (v{fileVersion}) — du siehst sie bereits.
                    </div>
                  )}
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    style={{ ...inputStyle, minHeight: '500px', resize: 'vertical', lineHeight: 1.6, fontFamily: 'monospace', fontSize: '0.85rem' }}
                  />
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button type="button" onClick={handleSave} disabled={isPending}
                      style={{ padding: '0.6rem 1.5rem', borderRadius: '0.5rem', cursor: isPending ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #4f8ef7, #7c6cf7)', border: 'none', color: 'white', fontWeight: 700, fontSize: '0.875rem', opacity: isPending ? 0.7 : 1 }}>
                      {isPending ? '...' : 'Speichern'}
                    </button>
                    <button type="button" onClick={() => setEditSlug(null)}
                      style={{ padding: '0.6rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                      Schließen
                    </button>
                    <button type="button" onClick={handleReset} disabled={isPending}
                      style={{ padding: '0.6rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', background: 'transparent', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontSize: '0.8rem' }}>
                      ↺ Zurücksetzen
                    </button>
                    {savedMsg && <span style={{ color: '#4ade80', fontSize: '0.875rem' }}>{savedMsg}</span>}
                  </div>
                </div>

                <div style={{ width: '220px', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Abschnitte</div>
                  {sections.length === 0 ? (
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)' }}>Keine Überschriften.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {sections.map(s => (
                        <div key={s.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `2px solid ${s.level === 1 ? '#4f8ef7' : s.level === 2 ? '#a78bfa' : 'rgba(255,255,255,0.2)'}`, borderRadius: '0 0.375rem 0.375rem 0', paddingLeft: `${(s.level - 1) * 0.5 + 0.6}rem` }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#4f8ef7', flexShrink: 0 }}>#{s.id}</span>
                          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{s.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.15)', borderRadius: '0.5rem' }}>
                    <p style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5 }}>
                      Sag mir z.B.:<br /><em style={{ color: 'rgba(79,142,247,0.8)' }}>„Blog #2, Abschnitt 3 — kürzer"</em>
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
