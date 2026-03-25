'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Profile {
  name: string
  email: string
  bio: string
  avatarUrl: string
  role: string
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>({ name: '', email: '', bio: '', avatarUrl: '', role: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  // Password change
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [pwSaving, setPwSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/profile').then(r => r.json()).then(d => { setProfile(d); setLoading(false) })
  }, [])

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMsg('')
    const res = await fetch('/api/admin/profile', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
    setSaving(false)
    setMsg(res.ok ? '✓ Gespeichert' : '✗ Fehler beim Speichern')
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    setPwSaving(true); setPwMsg('')
    const res = await fetch('/api/admin/password', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
    })
    const data = await res.json()
    setPwSaving(false)
    if (res.ok) {
      setPwMsg(`✓ Passwort geändert. Neuer Hash für Vercel env: ${data.newHash}`)
      setCurrentPw(''); setNewPw('')
    } else {
      setPwMsg(`✗ ${data.error}`)
    }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.5rem',
    padding: '0.65rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none',
  }

  const labelStyle = { display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem' }

  if (loading) return <div style={{ padding: '3rem', color: 'rgba(255,255,255,0.4)' }}>Lade...</div>

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <Link href="/admin" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>← Admin</Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.75rem' }}>Einstellungen</h1>
      </div>

      {/* Profile */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem' }}>Profil</h2>
        <form onSubmit={saveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input style={inputStyle} value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Rolle</label>
            <input style={inputStyle} value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>E-Mail</label>
            <input type="email" style={inputStyle} value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Bio</label>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' as const }}
              value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Profilbild URL</label>
            <input style={inputStyle} placeholder="https://..." value={profile.avatarUrl} onChange={e => setProfile(p => ({ ...p, avatarUrl: e.target.value }))} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '0.6rem 1.5rem' }}>
              {saving ? 'Speichern...' : 'Speichern'}
            </button>
            {msg && <span style={{ fontSize: '0.85rem', color: msg.startsWith('✓') ? '#4ade80' : '#f87171' }}>{msg}</span>}
          </div>
        </form>
      </div>

      {/* Password */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem' }}>Passwort ändern</h2>
        <form onSubmit={changePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Aktuelles Passwort</label>
            <input type="password" style={inputStyle} value={currentPw} onChange={e => setCurrentPw(e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle}>Neues Passwort</label>
            <input type="password" style={inputStyle} value={newPw} onChange={e => setNewPw(e.target.value)} required minLength={8} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexDirection: 'column' }}>
            <button type="submit" className="btn-primary" disabled={pwSaving} style={{ padding: '0.6rem 1.5rem' }}>
              {pwSaving ? 'Ändern...' : 'Passwort ändern'}
            </button>
            {pwMsg && (
              <p style={{ fontSize: '0.8rem', color: pwMsg.startsWith('✓') ? '#4ade80' : '#f87171', lineHeight: 1.5, wordBreak: 'break-all' as const }}>
                {pwMsg}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
