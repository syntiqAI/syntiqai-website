import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-server'
import { getAllPosts } from '@/lib/mdx'
import { setBlogPublishStatus, getAllBlogPublishOverrides } from '@/lib/redis'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const posts = getAllPosts('blog', true) // include unpublished
  const overrides = await getAllBlogPublishOverrides()

  // Merge: Redis override takes precedence over frontmatter
  const result = posts.map(p => ({
    ...p,
    published: overrides[p.slug] !== undefined ? overrides[p.slug] : (p.published ?? true),
  }))

  return NextResponse.json(result)
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, published } = await req.json()
  await setBlogPublishStatus(slug, published)
  return NextResponse.json({ success: true })
}
