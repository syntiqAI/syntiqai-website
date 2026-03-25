import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getPostSlugs('blog').map(slug => ({ slug }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { meta, content } = getPostBySlug('blog', slug)
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-white/40 hover:text-white/70 transition-colors mb-8 inline-block">
          ← Zurück zum Blog
        </Link>
        <p className="text-xs text-white/40 mb-4">
          {new Date(meta.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
          {meta.author && ` · ${meta.author}`}
        </p>
        <h1 className="text-4xl font-bold mb-10">{meta.title}</h1>
        <article className="prose prose-invert prose-blue max-w-none">
          <MDXRemote source={content} />
        </article>
      </div>
    )
  } catch {
    notFound()
  }
}
