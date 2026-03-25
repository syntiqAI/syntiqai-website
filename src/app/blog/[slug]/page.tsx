import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
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
    const { meta, content } = getPostBySlug('blog', slug)
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
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '2.5rem', lineHeight: 1.15 }}>
          {meta.title}
        </h1>
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
