import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { setBlogPublishStatus, getAllBlogPublishOverrides, setBlogContentOverride, getBlogContentOverride } from '@/lib/redis'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const slug = req.nextUrl.searchParams.get('slug')

  // Single post fetch (for editor)
  if (slug) {
    const { meta, content } = getPostBySlug('blog', slug)
    const override = await getBlogContentOverride(slug)
    return NextResponse.json({ meta, content: override ?? content })
  }

  // All posts list
  const posts = getAllPosts('blog', true)
  const overrides = await getAllBlogPublishOverrides()
  const result = posts.map(p => ({
    ...p,
    published: overrides[p.slug] !== undefined ? overrides[p.slug] : (p.published ?? true),
  }))
  return NextResponse.json(result)
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  if (body.content !== undefined) {
    await setBlogContentOverride(body.slug, body.content)
    return NextResponse.json({ success: true })
  }

  // Toggle publish
  await setBlogPublishStatus(body.slug, body.published)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug } = await req.json()
  const { redis } = await import('@/lib/redis')
  await redis.del(`blog:content:${slug}`)
  return NextResponse.json({ success: true })
}
