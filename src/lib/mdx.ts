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
  return {
    meta: { slug, ...data } as PostMeta,
    content,
  }
}

export function getAllPosts(folder: string): PostMeta[] {
  return getPostSlugs(folder)
    .map(slug => getPostBySlug(folder, slug).meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
