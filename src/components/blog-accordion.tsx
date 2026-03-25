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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {posts.map(post => {
        const isOpen = openSlug === post.slug
        return (
          <div
            key={post.slug}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${isOpen ? 'rgba(79,142,247,0.35)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '0.875rem',
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            {/* Header — clickable */}
            <button
              onClick={() => setOpenSlug(isOpen ? null : post.slug)}
              style={{
                width: '100%', textAlign: 'left', background: 'transparent',
                border: 'none', cursor: 'pointer', padding: '1.5rem 1.75rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
                    {new Date(post.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  {post.author && (
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>· {post.author}</span>
                  )}
                </div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'white', margin: 0, letterSpacing: '-0.01em' }}>
                  {post.title}
                </h2>
              </div>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'transform 0.2s',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                color: '#4f8ef7', fontSize: '0.9rem',
              }}>
                ↓
              </div>
            </button>

            {/* Expanded content */}
            {isOpen && (
              <div style={{
                padding: '0 1.75rem 1.75rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '1.25rem',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.975rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
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
                    color: '#4f8ef7', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
                  }}
                >
                  Vollständig lesen →
                </Link>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
