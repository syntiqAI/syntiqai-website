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

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/blog')
    const data = await res.json()
    setPosts(Array.isArray(data) ? data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [])
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

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <Link href="/admin" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>← Admin</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '0.25rem' }}>Blog-Verwaltung</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Entwürfe freigeben oder veröffentlichte Posts deaktivieren.</p>
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Lade...</p>
      ) : posts.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
          Noch keine Posts vorhanden.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {posts.map(post => (
            <div key={post.slug} className="glass-card" style={{ padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                  <span style={{
                    fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 700,
                    background: post.published ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                    color: post.published ? '#4ade80' : '#facc15',
                    border: `1px solid ${post.published ? 'rgba(34,197,94,0.25)' : 'rgba(234,179,8,0.25)'}`,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {post.published ? 'Veröffentlicht' : 'Entwurf'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
                    {new Date(post.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', margin: '0 0 0.25rem' }}>{post.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{post.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <Link href={`/blog/${post.slug}`} target="_blank"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                  Ansehen ↗
                </Link>
                <button
                  onClick={() => toggle(post.slug, post.published)}
                  style={{
                    fontSize: '0.8rem', padding: '0.4rem 0.9rem', borderRadius: '0.375rem', cursor: 'pointer',
                    border: post.published ? '1px solid rgba(248,113,113,0.3)' : '1px solid rgba(34,197,94,0.3)',
                    background: post.published ? 'rgba(248,113,113,0.08)' : 'rgba(34,197,94,0.08)',
                    color: post.published ? '#f87171' : '#4ade80',
                  }}
                >
                  {post.published ? 'Deaktivieren' : '✓ Freigeben'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
