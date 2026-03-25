import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>

      {/* Hero */}
      <section style={{ padding: '7rem 0 5rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(79,142,247,0.1)',
          border: '1px solid rgba(79,142,247,0.25)',
          borderRadius: '999px',
          padding: '0.4rem 1.1rem',
          fontSize: '0.8rem',
          color: '#4f8ef7',
          marginBottom: '2.5rem',
          letterSpacing: '0.02em',
        }}>
          🇦🇹 KI-Lösungen aus Österreich
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
          color: 'white',
        }}>
          KI die wirklich
          <br />
          <span className="gradient-text">für Sie arbeitet</span>
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '560px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}>
          SyntiqAI entwickelt AI- und Automatisierungslösungen für kleine und mittlere Unternehmen in Österreich.
          DSGVO-konform. Selbst gehostet. Persönlich beraten.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:thomas@syntiq-ai.at" className="btn-primary">
            Jetzt kontaktieren
          </a>
          <Link href="/projekte" className="btn-secondary">
            Unsere Projekte
          </Link>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4rem',
          marginTop: '5rem',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '100%', label: 'DSGVO-konform' },
            { value: 'Self-hosted', label: 'Ihre Daten, Ihr Server' },
            { value: '24/7', label: 'KI-Verfügbarkeit' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Was ist SyntiqAI?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Eine moderne KI-Plattform die für Ihr Unternehmen arbeitet — nicht für Silicon Valley.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
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
            <div key={f.title} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'white' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Wie es funktioniert
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            { step: '01', title: 'Onboarding', desc: 'Mitarbeiter-Daten eingeben — Agent wird automatisch konfiguriert.' },
            { step: '02', title: 'Firmenwissen laden', desc: 'Richtlinien, Prozesse, Kundendaten — der Agent lernt Ihr Unternehmen.' },
            { step: '03', title: 'Loslegen', desc: 'Mitarbeiter chatten via Telegram oder WhatsApp — fertig.' },
          ].map(s => (
            <div key={s.step} className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#4f8ef7', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{s.step}</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0 6rem', textAlign: 'center' }}>
        <div className="glass-card" style={{
          padding: '4rem 2rem',
          background: 'rgba(79,142,247,0.06)',
          borderColor: 'rgba(79,142,247,0.2)',
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Bereit für den nächsten Schritt?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2rem', maxWidth: '450px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Wir sind in der Aufbauphase — genau deshalb ist jetzt der beste Zeitpunkt, früh dabei zu sein.
          </p>
          <a href="mailto:thomas@syntiq-ai.at" className="btn-primary">
            thomas@syntiq-ai.at
          </a>
        </div>
      </section>

    </div>
  )
}
