import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { AuthSessionProvider } from '@/components/session-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'SyntiqAI — KI-Lösungen für Ihr Unternehmen',
  description: 'AI & Automation für KMUs in Österreich. DSGVO-konform, selbst gehostet, persönlich.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {/* Aurora background orbs */}
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />

        <AuthSessionProvider>
          <Nav />
          <main>{children}</main>
        </AuthSessionProvider>

        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          marginTop: '6rem',
          padding: '2rem 0',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.3)',
          position: 'relative',
          zIndex: 1,
        }}>
          <p>© {new Date().getFullYear()} SyntiqAI — <a href="mailto:office@syntiq-ai.at" style={{color:'rgba(255,255,255,0.4)'}}>office@syntiq-ai.at</a></p>
          <p style={{marginTop:'0.5rem'}}><a href="/datenschutz" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none',fontSize:'0.8rem'}}>Datenschutzerklärung</a></p>
        </footer>
      </body>
    </html>
  )
}
