import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/projekte')
      if (isAdminRoute) return isLoggedIn
      return true
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials as { username: string; password: string }
        const adminUser = process.env.ADMIN_USERNAME
        const adminHash = process.env.ADMIN_PASSWORD_HASH
        if (!adminUser || !adminHash) return null
        if (username !== adminUser) return null
        const valid = await bcrypt.compare(password, adminHash)
        if (!valid) return null
        return { id: '1', name: 'Admin', email: adminUser }
      },
    }),
  ],
}
