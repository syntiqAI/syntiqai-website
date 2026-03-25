'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PostMeta } from '@/lib/mdx'

export function BlogAccordion({ posts }: { posts: PostMeta[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  if (posts.length === 0) {
    return <p style={{ color: 'rgba(255,255,255,0.4)' }}>Noch keine Beiträge veröffentlicht.</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {posts.map(post => {
        const isOpen = openSlug === post.slug
        return (
          <div key={post.slug} style={{ marginBottom: '1.25rem' }}>

            {/* Card header — like timeline h2 */}
            <button
              onClick={() => setOpenSlug(isOpen ? null : post.slug)}
              style={{
                width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none',
                background: 'rgba(255,255,255,0.03)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                borderBottom: isOpen ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderLeft: `3px solid ${isOpen ? '#6ba3ff' : '#4f8ef7'}`,
                borderRadius: isOpen ? '0 0.875rem 0 0' : '0 0.875rem 0.875rem 0',
                padding: '1.5rem 2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
                    {new Date(post.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  {post.author && (
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>· {post.author}</span>
                  )}
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: isOpen ? '#4f8ef7' : 'white', margin: 0, letterSpacing: '-0.01em', transition: 'color 0.2s' }}>
                  {post.title}
                </h2>
              </div>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, color: '#4f8ef7', fontSize: '1rem', fontWeight: 700,
                transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s',
              }}>↓</div>
            </button>

            {/* Expanded body */}
            {isOpen && (
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: 'none',
                borderLeft: '3px solid #4f8ef7',
                borderRadius: '0 0 0.875rem 0',
                overflow: 'hidden',
              }}>
                {/* Image */}
                {post.image && (
                  <div style={{ width: '100%', height: '260px', overflow: 'hidden' }}>
                    <img
                      src={post.image}
                      alt={post.imageAlt ?? post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}

                <div style={{ padding: '1.75rem 2rem' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                    {post.description}
                  </p>
                  {post.excerpt && (
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      color: '#4f8ef7', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none',
                    }}
                  >
                    Vollständig lesen →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
