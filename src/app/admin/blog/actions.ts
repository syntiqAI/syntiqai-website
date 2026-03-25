'use server'

import { auth } from '@/lib/auth-server'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import {
  setBlogPublishStatus,
  getAllBlogPublishOverrides,
  setBlogContentOverride,
  getBlogContentOverrideRaw,
  redis,
} from '@/lib/redis'
import { revalidatePath } from 'next/cache'

export async function getPostsAction() {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
  const posts = getAllPosts('blog', true)
  const overrides = await getAllBlogPublishOverrides(posts.map(p => p.slug))
  return posts.map(p => ({
    ...p,
    published: overrides[p.slug] !== undefined ? overrides[p.slug] : (p.published ?? true),
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function togglePublishAction(slug: string, published: boolean) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
  await setBlogPublishStatus(slug, published)
  revalidatePath('/blog')
  revalidatePath('/admin/blog')
}

export async function getPostContentAction(slug: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
  const { meta, content: fileContent } = getPostBySlug('blog', slug)
  const override = await getBlogContentOverrideRaw(slug)
  const fileVersion = meta.version ?? 0
  const hasNewerFile = override ? fileVersion > (override.savedVersion ?? 0) : false
  return {
    meta,
    content: fileContent,
    adminContent: override?.content ?? null,
    savedVersion: override?.savedVersion ?? null,
    fileVersion,
    hasNewerFile,
  }
}

export async function saveContentAction(slug: string, content: string, fileVersion: number) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
  await setBlogContentOverride(slug, content, fileVersion)
  revalidatePath(`/blog/${slug}`)
}

export async function resetContentAction(slug: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
  await redis.del(`blog:content:${slug}`)
  revalidatePath(`/blog/${slug}`)
}
