import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'
import Image from 'next/image'

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

      {/* ─── PRODUCTS SECTION ─── */}
      <section style={{ padding: '5rem 0' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#c026d3', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Unsere Produkte
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            margin: '0.75rem 0 1rem',
            color: 'white',
          }}>
            Your AI. Your Rules.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '1rem' }}>
            Wir bauen die Infrastruktur für ein intelligenteres, leichteres Leben —
            KI die für dich arbeitet, nicht umgekehrt.
          </p>
        </div>

        {/* ── Zeal — large feature card ── */}
        <div style={{
          position: 'relative',
          borderRadius: '2rem',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(26,16,53,0.95) 0%, rgba(30,18,69,0.95) 50%, rgba(15,8,40,0.95) 100%)',
          border: '1px solid rgba(192,38,211,0.25)',
          marginBottom: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          minHeight: '420px',
        }}>
          {/* Glow effects */}
          <div style={{
            position: 'absolute', top: '-60px', right: '200px',
            width: '300px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(192,38,211,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-40px', left: '100px',
            width: '250px', height: '200px',
            background: 'radial-gradient(ellipse, rgba(129,140,248,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Left: copy */}
          <div style={{ padding: '3.5rem', position: 'relative', zIndex: 1 }}>
            {/* Product badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #c026d3, #818cf8)',
              borderRadius: '999px', padding: '0.3rem 1rem',
              fontSize: '0.75rem', fontWeight: 800, color: 'white',
              letterSpacing: '0.06em', marginBottom: '1.75rem',
            }}>
              <span style={{ fontSize: '1rem' }}>✨</span> ZEAL
            </div>

            <h3 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 900, letterSpacing: '-0.03em',
              color: 'white', lineHeight: 1.15, marginBottom: '1rem',
            }}>
              Stop deciding.<br />
              <span style={{ background: 'linear-gradient(90deg, #c026d3, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Start living.
              </span>
            </h3>

            <p style={{ color: 'rgba(200,195,240,0.7)', lineHeight: 1.8, fontSize: '1rem', maxWidth: '420px', marginBottom: '2rem' }}>
              Deine Tage sind voll von kleinen Entscheidungen die deine Energie aufbrauchen
              bevor das Wichtige überhaupt anfängt. Zeal nimmt sie dir ab.
              Es kennt deine Gewohnheiten, plant deinen Tag — mühelos.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(192,38,211,0.12)', border: '1px solid rgba(192,38,211,0.3)',
                borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.8rem',
                color: 'rgba(200,195,240,0.8)',
              }}>🎯 Decision Fatigue weg</span>
              <span style={{
                background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.25)',
                borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.8rem',
                color: 'rgba(200,195,240,0.8)',
              }}>📅 Planung übernommen</span>
              <span style={{
                background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)',
                borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.8rem',
                color: 'rgba(200,195,240,0.8)',
              }}>⚡ Powered by Anima</span>
            </div>

            <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(200,195,240,0.35)', fontStyle: 'italic' }}>
              Demnächst verfügbar
            </p>
          </div>

          {/* Right: iPhone mockup */}
          <div style={{
            padding: '2rem 3rem 0 1rem',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            position: 'relative', zIndex: 1,
          }}>
            <Image
              src="/zeal-mockup.svg"
              alt="Zeal App Mockup"
              width={260}
              height={572}
              style={{
                filter: 'drop-shadow(0 24px 48px rgba(192,38,211,0.3)) drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                maxHeight: '380px',
                width: 'auto',
              }}
              priority
            />
          </div>
        </div>

        {/* ── Anima + Nexus — two-column cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

          {/* Anima card */}
          <div style={{
            position: 'relative',
            borderRadius: '2rem',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(129,140,248,0.2)',
            padding: '2.5rem',
          }}>
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '200px', height: '200px',
              background: 'radial-gradient(ellipse, rgba(129,140,248,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Anima icon */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(129,140,248,0.2), rgba(192,38,211,0.1))',
              border: '1px solid rgba(129,140,248,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', marginBottom: '1.5rem',
            }}>🧠</div>

            <div style={{
              display: 'inline-block',
              background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.25)',
              borderRadius: '999px', padding: '0.25rem 0.75rem',
              fontSize: '0.7rem', fontWeight: 800, color: '#818cf8',
              letterSpacing: '0.08em', marginBottom: '1rem',
            }}>ANIMA</div>

            <h3 style={{
              fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em',
              color: 'white', marginBottom: '0.75rem', lineHeight: 1.2,
            }}>
              Your AI.<br />Truly yours.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Anima ist dein persönlicher KI-Begleiter — einer der dich wirklich kennt.
              Kein generischer Chatbot, sondern eine intelligente Schicht die lernt
              wie du denkst, was dir wichtig ist und wie du arbeitest.
              Immer privat. Immer auf deiner Seite.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
              Fundament hinter Zeal · für Entwickler &amp; Teams
            </p>
          </div>

          {/* Nexus card */}
          <div style={{
            position: 'relative',
            borderRadius: '2rem',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(56,189,248,0.18)',
            padding: '2.5rem',
          }}>
            <div style={{
              position: 'absolute', top: '-40px', left: '-40px',
              width: '200px', height: '200px',
              background: 'radial-gradient(ellipse, rgba(56,189,248,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Nexus icon */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(56,189,248,0.15), rgba(52,211,153,0.1))',
              border: '1px solid rgba(56,189,248,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', marginBottom: '1.5rem',
            }}>🏛️</div>

            <div style={{
              display: 'inline-block',
              background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)',
              borderRadius: '999px', padding: '0.25rem 0.75rem',
              fontSize: '0.7rem', fontWeight: 800, color: '#38bdf8',
              letterSpacing: '0.08em', marginBottom: '1rem',
            }}>SYNTIQAI NEXUS</div>

            <h3 style={{
              fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em',
              color: 'white', marginBottom: '0.75rem', lineHeight: 1.2,
            }}>
              Specialized intelligence,<br />on demand.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Hinter jedem guten KI-Produkt steckt die richtige Expertise im richtigen Moment.
              Nexus verbindet deine KI mit einem Netzwerk spezialisierter Agents —
              jeder fokussiert, sicher und nachvollziehbar. Skaliere was deine KI kann.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
              Für Teams die mit KI bauen
            </p>
          </div>

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
