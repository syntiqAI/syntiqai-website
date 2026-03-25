import Link from 'next/link'
import { NavAuth } from './nav-auth'

export function Nav() {
  return (
    <nav style={{
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(3,6,15,0.7)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', textDecoration: 'none' }}>
          <span style={{ color: '#4f8ef7' }}>Syntiq</span>
          <span style={{ color: 'white' }}>AI</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/blog" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textDecoration: 'none' }}>
            Blog
          </Link>
          <Link href="/projekte" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textDecoration: 'none' }}>
            Projekte
          </Link>
          <a href="mailto:office@syntiq-ai.at" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Kontakt
          </a>
          <NavAuth />
        </div>
      </div>
    </nav>
  )
}
