'use client'

import { useState } from 'react'

const CONSENT_TEXT = 'Ich stimme zu, dass meine E-Mail-Adresse und mein Name für den SyntiqAI-Newsletter gespeichert werden. Ich kann mich jederzeit abmelden. Weitere Infos in der Datenschutzerklärung.'

export function NewsletterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consent) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, consentText: CONSENT_TEXT }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) { setEmail(''); setName('') }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem', color: '#4ade80' }}>
        ✓ Erfolgreich angemeldet! Du erhältst bald Neuigkeiten von uns.
      </div>
    )
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '0.5rem',
    padding: '0.65rem 1rem',
    color: 'white',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '420px', margin: '0 auto' }}>
      <input type="text" placeholder="Dein Name (optional)" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <input type="email" placeholder="Deine E-Mail-Adresse" value={email} onChange={e => setEmail(e.target.value)} required style={{ ...inputStyle, flex: 1, width: 'auto' }} />
        <button type="submit" className="btn-primary" disabled={status === 'loading' || !consent}
          style={{ padding: '0.65rem 1.25rem', whiteSpace: 'nowrap', opacity: !consent ? 0.5 : 1 }}>
          {status === 'loading' ? '...' : 'Anmelden'}
        </button>
      </div>

      {/* Consent checkbox */}
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', textAlign: 'left' }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
          required
          style={{ marginTop: '2px', accentColor: '#4f8ef7', width: '16px', height: '16px', flexShrink: 0 }}
        />
        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          Ich stimme zu, dass meine Daten für den Newsletter gespeichert werden.{' '}
          <a href="/datenschutz" style={{ color: '#4f8ef7' }}>Datenschutzerklärung</a>
        </span>
      </label>

      {status === 'error' && <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>Fehler — bitte nochmal versuchen.</p>}
    </form>
  )
}
