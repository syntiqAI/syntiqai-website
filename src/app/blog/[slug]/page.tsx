import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { getBlogContentOverride } from '@/lib/redis'
import { auth } from '@/lib/auth-server'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { AuthorCard } from '@/components/author-card'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getPostSlugs('blog').map(slug => ({ slug }))
}

// Map author display names to author IDs
const authorMap: Record<string, string> = {
  'Thomas Zach': 'thomas',
  'Thomas': 'thomas',
  'Jarvis': 'jarvis',
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const session = await auth()
  try {
    const { meta, content: fileContent } = getPostBySlug('blog', slug)
    const contentOverride = await getBlogContentOverride(slug, meta.version ?? 0)
    const content = contentOverride ?? fileContent
    const authorId = meta.author ? (authorMap[meta.author] ?? meta.author.toLowerCase()) : null

    return (
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* Admin bar — only visible when logged in */}
        {session && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap',
            marginBottom: '1.5rem', padding: '0.6rem 1rem',
            background: 'rgba(79,142,247,0.07)', border: '1px solid rgba(79,142,247,0.2)',
            borderRadius: '0.5rem',
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(79,142,247,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin</span>
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)' }} />
            <Link href="/admin/blog" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>← Blog-Verwaltung</Link>
            <Link href="/admin" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>⚙ Admin Portal</Link>
          </div>
        )}

        <Link href="/blog" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
          ← Zurück zum Blog
        </Link>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>
          {new Date(meta.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
          {meta.author && ` · ${meta.author}`}
        </p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: meta.image ? '2rem' : '2.5rem', lineHeight: 1.15 }}>
          {meta.title}
        </h1>
        {meta.image && (
          <div style={{ borderRadius: '0.875rem', overflow: 'hidden', marginBottom: '2.5rem', height: '380px' }}>
            <img src={meta.image} alt={meta.imageAlt ?? meta.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <article className="prose">
          <MDXRemote source={content} />
        </article>
        {authorId && <AuthorCard authorId={authorId} />}
      </div>
    )
  } catch {
    notFound()
  }
}
