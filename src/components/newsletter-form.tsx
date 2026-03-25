'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        setName('')
      } else {
        setStatus('error')
      }
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

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '420px', margin: '0 auto' }}>
      <input
        type="text"
        placeholder="Dein Name (optional)"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '0.5rem',
          padding: '0.65rem 1rem',
          color: 'white',
          fontSize: '0.9rem',
          outline: 'none',
          width: '100%',
        }}
      />
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <input
          type="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '0.5rem',
            padding: '0.65rem 1rem',
            color: 'white',
            fontSize: '0.9rem',
            outline: 'none',
          }}
        />
        <button type="submit" className="btn-primary" disabled={status === 'loading'}
          style={{ padding: '0.65rem 1.25rem', whiteSpace: 'nowrap' }}>
          {status === 'loading' ? '...' : 'Anmelden'}
        </button>
      </div>
      {status === 'error' && (
        <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>Fehler — bitte nochmal versuchen.</p>
      )}
      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
        Kein Spam. Abmelden jederzeit möglich.
      </p>
    </form>
  )
}
