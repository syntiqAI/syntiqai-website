'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export function NavAuth() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (status === 'loading') return <div style={{ width: '36px', height: '36px' }} />

  if (!session) {
    return (
      <Link href="/admin/login" style={{
        fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)',
        textDecoration: 'none', padding: '0.4rem 0.9rem',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '0.375rem', transition: 'all 0.2s',
      }}>
        Login
      </Link>
    )
  }

  const name = session.user?.name ?? 'Admin'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f8ef7, #a78bfa)',
          border: '2px solid rgba(79,142,247,0.4)',
          cursor: 'pointer', color: 'white', fontWeight: 700,
          fontSize: '0.8rem', display: 'flex', alignItems: 'center',
          justifyContent: 'center', transition: 'border-color 0.2s',
        }}
        title={name}
      >
        {initials}
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)',
          minWidth: '180px',
          background: 'rgba(10,14,28,0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '0.625rem',
          padding: '0.4rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          zIndex: 100,
        }}>
          {/* User info */}
          <div style={{ padding: '0.6rem 0.75rem 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '0.3rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{name}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>Administrator</div>
          </div>

          <Link href="/admin" onClick={() => setOpen(false)} style={itemStyle}>
            🗂 Admin Portal
          </Link>
          <Link href="/admin/settings" onClick={() => setOpen(false)} style={itemStyle}>
            ⚙️ Einstellungen
          </Link>
          <button
            onClick={() => { setOpen(false); signOut({ callbackUrl: '/' }) }}
            style={{ ...itemStyle, width: '100%', textAlign: 'left', background: 'transparent', cursor: 'pointer', color: '#f87171', border: 'none' }}
          >
            → Abmelden
          </button>
        </div>
      )}
    </div>
  )
}

const itemStyle: React.CSSProperties = {
  display: 'block',
  padding: '0.5rem 0.75rem',
  fontSize: '0.85rem',
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  borderRadius: '0.375rem',
  transition: 'background 0.15s',
}
