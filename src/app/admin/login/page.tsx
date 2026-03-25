'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError('Ungültige Zugangsdaten')
    } else {
      router.push('/admin')
    }
  }

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            <span style={{ color: '#4f8ef7' }}>Syntiq</span><span style={{ color: 'white' }}>AI</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Admin-Bereich</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>
              Benutzername
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '0.5rem',
                padding: '0.65rem 1rem',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '0.5rem',
                padding: '0.65rem 1rem',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>
          )}

          <button type="submit" className="btn-primary" disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Anmelden...' : 'Anmelden'}
          </button>
        </form>
      </div>
    </div>
  )
}
