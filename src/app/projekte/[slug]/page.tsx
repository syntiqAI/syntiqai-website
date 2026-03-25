import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getPostSlugs('projekte').map(slug => ({ slug }))
}

const statusColors: Record<string, string> = {
  'In Planung': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'In Arbeit': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Abgeschlossen': 'bg-green-500/10 text-green-400 border-green-500/20',
}

export default async function ProjektDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { meta, content } = getPostBySlug('projekte', slug)
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/projekte" className="text-sm text-white/40 hover:text-white/70 transition-colors mb-8 inline-block">
          ← Zurück zu Projekte
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <p className="text-xs text-white/40">
            {new Date(meta.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {meta.status && (
            <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[meta.status] ?? 'bg-white/10 text-white/60 border-white/10'}`}>
              {meta.status}
            </span>
          )}
        </div>
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
