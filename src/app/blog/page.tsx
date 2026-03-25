import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function BlogIndex() {
  const posts = getAllPosts('blog')

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-white/60 mb-12">Gedanken, Updates und Einblicke rund um SyntiqAI.</p>

      <div className="space-y-6">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-blue-500/30 transition-all"
          >
            <p className="text-xs text-white/40 mb-2">
              {new Date(post.date).toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-white/60 text-sm leading-relaxed">{post.description}</p>
            <span className="mt-4 inline-block text-blue-400 text-sm">Weiterlesen →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
