import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Nav } from '@/components/nav'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'SyntiqAI — KI-Lösungen für Ihr Unternehmen',
  description: 'AI & Automation für KMUs in Österreich. DSGVO-konform, selbst gehostet, persönlich.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={geist.variable}>
      <body className="min-h-screen">
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-white/10 mt-24 py-8 text-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} SyntiqAI — thomas@syntiq-ai.at</p>
        </footer>
      </body>
    </html>
  )
}
