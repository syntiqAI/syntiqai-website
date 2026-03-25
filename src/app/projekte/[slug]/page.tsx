import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { timelineComponents } from '@/components/timeline-components'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getPostSlugs('projekte').map(slug => ({ slug }))
}

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  'In Planung': { bg: 'rgba(234,179,8,0.1)', color: '#facc15', border: 'rgba(234,179,8,0.25)' },
  'In Arbeit': { bg: 'rgba(79,142,247,0.1)', color: '#4f8ef7', border: 'rgba(79,142,247,0.25)' },
  'Abgeschlossen': { bg: 'rgba(34,197,94,0.1)', color: '#4ade80', border: 'rgba(34,197,94,0.25)' },
}

export default async function ProjektDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { meta, content } = getPostBySlug('projekte', slug)
    const sc = statusColors[meta.status ?? ''] ?? { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.1)' }

    return (
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        <Link href="/projekte" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
          ← Zurück zu Projekte
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            {new Date(meta.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          {meta.status && (
            <span style={{
              fontSize: '0.72rem', padding: '0.2rem 0.7rem', borderRadius: '999px',
              background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
              fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>{meta.status}</span>
          )}
        </div>

        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: meta.image ? '2rem' : '3rem', lineHeight: 1.15 }}>
          {meta.title}
        </h1>
        {meta.image && (
          <div style={{ borderRadius: '0.875rem', overflow: 'hidden', marginBottom: '3rem', height: '380px' }}>
            <img src={meta.image} alt={meta.imageAlt ?? meta.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Timeline cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <MDXRemote source={content} components={timelineComponents} />
        </div>

      </div>
    )
  } catch {
    notFound()
  }
}
