import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  status?: string
  published?: boolean
  excerpt?: string
  image?: string
  imageAlt?: string
  version?: number
}

export function getPostSlugs(folder: string): string[] {
  const dir = path.join(contentDirectory, folder)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''))
}

export function getPostBySlug(folder: string, slug: string): { meta: PostMeta; content: string } {
  const filePath = path.join(contentDirectory, folder, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  // Extract plain-text excerpt (first ~250 chars, strip markdown)
  const excerpt = content
    .replace(/^#+\s+.*/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/---/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 250)
    .trim() + '...'

  return {
    meta: { slug, published: true, ...data, excerpt } as PostMeta,
    content,
  }
}

export function getAllPosts(folder: string, includeUnpublished = false): PostMeta[] {
  return getPostSlugs(folder)
    .map(slug => getPostBySlug(folder, slug).meta)
    .filter(p => includeUnpublished || p.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
