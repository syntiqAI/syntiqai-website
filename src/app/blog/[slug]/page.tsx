import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { getBlogContentOverride } from '@/lib/redis'
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
  try {
    const { meta, content: fileContent } = getPostBySlug('blog', slug)
    const contentOverride = await getBlogContentOverride(slug)
    const content = contentOverride ?? fileContent
    const authorId = meta.author ? (authorMap[meta.author] ?? meta.author.toLowerCase()) : null

    return (
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '4rem 1.5rem' }}>
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
