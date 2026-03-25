'use client'

import { useEffect, useState } from 'react'

interface Subscriber {
  id: string
  email: string
  name: string
  subscribedAt: string
  status: 'active' | 'unsubscribed'
  token: string
}

export function SubscriberTable() {
  const [subs, setSubs] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/subscribers')
    const data = await res.json()
    setSubs(Array.isArray(data) ? data.sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()) : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string) {
    if (!confirm('Abonnent wirklich löschen?')) return
    await fetch('/api/admin/subscribers', { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } })
    load()
  }

  async function handleToggle(id: string, current: string) {
    const status = current === 'active' ? 'unsubscribed' : 'active'
    await fetch('/api/admin/subscribers', { method: 'PATCH', body: JSON.stringify({ id, status }), headers: { 'Content-Type': 'application/json' } })
    load()
  }

  if (loading) return <p style={{ color: 'rgba(255,255,255,0.4)' }}>Lade Abonnenten...</p>

  const active = subs.filter(s => s.status === 'active').length

  return (
    <div>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1rem 1.5rem' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{active}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>AKTIV</div>
        </div>
        <div className="glass-card" style={{ padding: '1rem 1.5rem' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{subs.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>GESAMT</div>
        </div>
      </div>

      {subs.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
          Noch keine Abonnenten.
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Name', 'E-Mail', 'Datum', 'Status', 'Aktionen'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subs.map(sub => (
                <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'rgba(255,255,255,0.8)' }}>{sub.name || '—'}</td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'rgba(255,255,255,0.8)' }}>{sub.email}</td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'rgba(255,255,255,0.4)' }}>
                    {new Date(sub.subscribedAt).toLocaleDateString('de-AT')}
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: sub.status === 'active' ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
                      color: sub.status === 'active' ? '#4ade80' : 'rgba(255,255,255,0.4)',
                      border: `1px solid ${sub.status === 'active' ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    }}>
                      {sub.status === 'active' ? 'Aktiv' : 'Abgemeldet'}
                    </span>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleToggle(sub.id, sub.status)}
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
                      >
                        {sub.status === 'active' ? 'Deaktivieren' : 'Aktivieren'}
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '0.375rem', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.08)', color: '#f87171', cursor: 'pointer' }}
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
