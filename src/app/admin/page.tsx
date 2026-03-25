import { auth } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { SubscriberTable } from '@/components/subscriber-table'
import { SignOutButton } from '@/components/sign-out-button'
import Link from 'next/link'

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>Admin Portal</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>SyntiqAI Backend</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/admin/settings" className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            ⚙️ Einstellungen
          </Link>
          <SignOutButton />
        </div>
      </div>

      {/* Quick nav */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {[
          { href: '/admin/blog', label: '✍️ Blog-Verwaltung', desc: 'Entwürfe freigeben' },
          { href: '/admin/tasks', label: '📋 Aufgaben', desc: 'Task-Board' },
          { href: '/admin/settings', label: '⚙️ Einstellungen', desc: 'Profil & Passwort' },
        ].map(item => (
          <Link key={item.href} href={item.href} className="glass-card" style={{ padding: '1rem 1.5rem', textDecoration: 'none', flex: '1', minWidth: '180px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '0.2rem' }}>{item.label}</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{item.desc}</div>
          </Link>
        ))}
      </div>

      <section>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Newsletter Abonnenten
        </h2>
        <SubscriberTable />
      </section>
    </div>
  )
}
