import Link from 'next/link'

export function Nav() {
  return (
    <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          <span className="text-blue-400">Syntiq</span>
          <span className="text-white">AI</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-white/70">
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/projekte" className="hover:text-white transition-colors">Projekte</Link>
          <a
            href="mailto:thomas@syntiq-ai.at"
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-1.5 rounded-md transition-colors"
          >
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  )
}
