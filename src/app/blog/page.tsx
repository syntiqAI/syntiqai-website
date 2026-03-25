import { getAllPosts } from '@/lib/mdx'
import { getAllBlogPublishOverrides } from '@/lib/redis'
import { BlogAccordion } from '@/components/blog-accordion'

export const revalidate = 60 // revalidate every minute to pick up publish changes

export default async function BlogIndex() {
  const allPosts = getAllPosts('blog', true)
  const overrides = await getAllBlogPublishOverrides()

  const posts = allPosts
    .map(p => ({
      ...p,
      published: overrides[p.slug] !== undefined ? overrides[p.slug] : (p.published ?? true),
    }))
    .filter(p => p.published)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Blog</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '3rem', fontSize: '1rem' }}>
        Gedanken, Updates und Einblicke rund um SyntiqAI.
      </p>
      <BlogAccordion posts={posts} />
    </div>
  )
}
