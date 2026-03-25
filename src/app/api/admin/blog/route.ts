import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import {
  setBlogPublishStatus,
  getAllBlogPublishOverrides,
  setBlogContentOverride,
  getBlogContentOverrideRaw,
} from '@/lib/redis'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const slug = req.nextUrl.searchParams.get('slug')

  if (slug) {
    const { meta, content: fileContent } = getPostBySlug('blog', slug)
    const override = await getBlogContentOverrideRaw(slug)
    const fileVersion = meta.version ?? 0
    const hasNewerFile = override ? fileVersion > (override.savedVersion ?? 0) : false

    return NextResponse.json({
      meta,
      content: fileContent,          // always show file content in editor
      adminContent: override?.content ?? null, // what admin saved (if any)
      savedVersion: override?.savedVersion ?? null,
      fileVersion,
      hasNewerFile,                  // true = file updated since last admin edit
    })
  }

  const posts = getAllPosts('blog', true)
  const overrides = await getAllBlogPublishOverrides(posts.map(p => p.slug))
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
    await setBlogContentOverride(body.slug, body.content, body.fileVersion ?? 0)
    return NextResponse.json({ success: true })
  }

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
