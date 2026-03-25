import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  'In Planung': { bg: 'rgba(234,179,8,0.1)', color: '#facc15', border: 'rgba(234,179,8,0.25)' },
  'In Arbeit': { bg: 'rgba(79,142,247,0.1)', color: '#4f8ef7', border: 'rgba(79,142,247,0.25)' },
  'Abgeschlossen': { bg: 'rgba(34,197,94,0.1)', color: '#4ade80', border: 'rgba(34,197,94,0.25)' },
}

export default function ProjekteIndex() {
  const projekte = getAllPosts('projekte')

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
          Projekte
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.7 }}>
          Wir bauen in der Öffentlichkeit — hier dokumentieren wir unseren Fortschritt.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.25rem',
      }}>
        {projekte.map(projekt => {
          const sc = statusColors[projekt.status ?? ''] ?? { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.1)' }
          return (
            <Link
              key={projekt.slug}
              href={`/projekte/${projekt.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="glass-card" style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {projekt.status && (
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: sc.bg,
                    color: sc.color,
                    border: `1px solid ${sc.border}`,
                    marginBottom: '1rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    alignSelf: 'flex-start',
                  }}>
                    {projekt.status}
                  </span>
                )}
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                  {projekt.title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.65, flex: 1 }}>
                  {projekt.description}
                </p>
                <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
                  {new Date(projekt.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long' })}
                </div>
              </div>
            </Link>
          )
        })}

        {/* Placeholder cards to fill the grid */}
        {Array.from({ length: Math.max(0, 3 - (projekte.length % 3 === 0 ? 0 : 3 - (projekte.length % 3))) }).map((_, i) => (
          <div key={`ph-${i}`} className="glass-card" style={{
            padding: '1.75rem',
            opacity: 0.3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '160px',
            border: '1px dashed rgba(255,255,255,0.1)',
            background: 'transparent',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Projekt folgt</span>
          </div>
        ))}
      </div>
    </div>
  )
}
