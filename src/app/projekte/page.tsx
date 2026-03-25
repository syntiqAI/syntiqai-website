import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

const statusColors: Record<string, string> = {
  'In Planung': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'In Arbeit': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Abgeschlossen': 'bg-green-500/10 text-green-400 border-green-500/20',
}

export default function ProjekteIndex() {
  const projekte = getAllPosts('projekte')

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">Projekte</h1>
      <p className="text-white/60 mb-12">Wir bauen in der Öffentlichkeit — hier dokumentieren wir unseren Fortschritt.</p>

      <div className="space-y-6">
        {projekte.map(projekt => (
          <Link
            key={projekt.slug}
            href={`/projekte/${projekt.slug}`}
            className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-xl font-semibold">{projekt.title}</h2>
              {projekt.status && (
                <span className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${statusColors[projekt.status] ?? 'bg-white/10 text-white/60 border-white/10'}`}>
                  {projekt.status}
                </span>
              )}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{projekt.description}</p>
            <span className="mt-4 inline-block text-blue-400 text-sm">Details →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
