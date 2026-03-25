import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'

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
          🇦🇹 Privates KI-Projekt aus Baden bei Wien
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
          <span className="gradient-text">für dich arbeitet</span>
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}>
          Ich baue KI-Agenten die im Alltag wirklich helfen — für Unternehmen, für Teams, für Einzelpersonen.
          Kein Silicon-Valley-Produkt. Gemacht in Österreich, DSGVO-konform, selbst gehostet.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:office@syntiq-ai.at" className="btn-primary">
            Schreib mir
          </a>
          <Link href="/projekte" className="btn-secondary">
            Was ich gerade baue
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
            { value: 'Self-hosted', label: 'Deine Daten, dein Server' },
            { value: '24/7', label: 'KI immer erreichbar' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About / Wer bin ich */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#4f8ef7', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Wer steckt dahinter</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0.75rem 0 1rem' }}>
              Ich bin Thomas —<br />und das hier ist mein Projekt.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1rem' }}>
              Ich arbeite hauptberuflich im Software-Lizenzmanagement und beschäftige mich seit Jahren intensiv damit,
              wie Technologie im Alltag wirklich nützlich wird — statt nur beeindruckend auszusehen.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: '1rem' }}>
              SyntiqAI ist mein Versuch, KI-Agenten so zu bauen dass sie sich nicht wie ein Tool anfühlen,
              sondern wie ein verlässlicher Kollege. Alles was hier entsteht, baue ich selbst — zusammen
              mit meinem eigenen KI-Assistenten Jarvis.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '🤖', title: 'Eigener KI-Assistent', desc: 'Jarvis läuft bereits — er verwaltet meinen Kalender, checkt E-Mails und hat sogar diese Website mitgebaut.' },
              { icon: '🔒', title: 'Datenschutz first', desc: 'Alles läuft auf eigener Infrastruktur in Österreich. Keine Daten bei US-Konzernen.' },
              { icon: '🧪', title: 'Ehrliches Experiment', desc: 'Das hier ist kein fertiges Produkt — es ist ein laufendes Projekt. Du kannst mitverfolgen wie es entsteht.' },
            ].map(f => (
              <div key={f.title} className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem', color: 'white' }}>{f.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was entsteht gerade */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Was gerade entsteht
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Der ClawBot — ein KI-Agent für Unternehmen. Jeder Mitarbeiter bekommt seinen eigenen Assistenten.
            Erreichbar per WhatsApp oder Telegram, mit dem Wissen der eigenen Firma.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {[
            {
              step: '01',
              title: 'Agent einrichten',
              desc: 'Name, Rolle, Firmenwissen — der Agent wird in Minuten konfiguriert und startet sofort.',
            },
            {
              step: '02',
              title: 'Wissen befüllen',
              desc: 'Richtlinien, Prozesse, Kontakte — der Agent lernt das Unternehmen und bleibt aktuell.',
            },
            {
              step: '03',
              title: 'Einfach chatten',
              desc: 'Mitarbeiter schreiben via Telegram oder WhatsApp. Kein Login, keine App, kein Aufwand.',
            },
          ].map(s => (
            <div key={s.step} className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#4f8ef7', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{s.step}</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '4rem 0' }}>
        <div className="glass-card" style={{
          padding: '4rem 2rem',
          background: 'rgba(79,142,247,0.06)',
          borderColor: 'rgba(79,142,247,0.2)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Bleib dabei
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', maxWidth: '450px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Ich schreibe über was ich baue, was funktioniert und was nicht.
            Kein Marketing-Blabla — nur ehrliche Updates aus dem Projekt.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '2rem 0 6rem', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
          Ideen, Feedback, oder einfach Hallo?
        </p>
        <p style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Ich freue mich über Nachrichten von Menschen die ähnliche Dinge interessieren.
        </p>
        <a href="mailto:office@syntiq-ai.at" className="btn-secondary">
          office@syntiq-ai.at
        </a>
      </section>

    </div>
  )
}
