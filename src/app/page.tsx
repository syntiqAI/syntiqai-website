import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">

      {/* Hero */}
      <section className="py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-sm mb-8">
          🇦🇹 KI-Lösungen aus Österreich
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          KI die wirklich
          <br />
          <span className="text-blue-400">für Sie arbeitet</span>
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
          SyntiqAI entwickelt AI- und Automatisierungslösungen für kleine und mittlere Unternehmen in Österreich.
          DSGVO-konform. Selbst gehostet. Persönlich beraten.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:thomas@syntiq-ai.at"
            className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Jetzt kontaktieren
          </a>
          <Link
            href="/projekte"
            className="border border-white/20 hover:border-white/40 text-white/80 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Unsere Projekte
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: '🤖',
            title: 'Private AI Workspace',
            desc: 'Jeder Mitarbeiter bekommt einen persönlichen KI-Agenten der das Unternehmen kennt — erreichbar via WhatsApp oder Telegram.',
          },
          {
            icon: '🔒',
            title: 'DSGVO-konform',
            desc: 'Alle Daten bleiben bei Ihnen. Kein Cloud-Datenleck, kein Vendor Lock-in. Vollständige Datensouveränität.',
          },
          {
            icon: '🇦🇹',
            title: 'Persönliche Beratung',
            desc: 'Kein anonymes Support-Ticket. Wir kennen Ihr Unternehmen und begleiten Sie von Anfang bis Ende.',
          },
        ].map(f => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-colors">
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Bereit für den nächsten Schritt?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Wir sind noch in der Aufbauphase — aber genau deshalb ist jetzt der beste Zeitpunkt, früh dabei zu sein.
          </p>
          <a
            href="mailto:thomas@syntiq-ai.at"
            className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            thomas@syntiq-ai.at
          </a>
        </div>
      </section>

    </div>
  )
}
