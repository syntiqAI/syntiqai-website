'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="btn-secondary"
      style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
    >
      Abmelden
    </button>
  )
}
