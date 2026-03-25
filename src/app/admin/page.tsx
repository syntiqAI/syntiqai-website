import { auth } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { SubscriberTable } from '@/components/subscriber-table'
import { SignOutButton } from '@/components/sign-out-button'

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
        <SignOutButton />
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
