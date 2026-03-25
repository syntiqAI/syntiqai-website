import { redis } from './redis'

export interface Author {
  id: string
  name: string
  bio: string
  avatarUrl: string
  email: string
  role: string
  [key: string]: unknown
}

const DEFAULTS: Record<string, Author> = {
  thomas: {
    id: 'thomas', name: 'Thomas Zach', role: 'Gründer & CEO',
    bio: 'Gründer von SyntiqAI. Software Asset Manager mit Leidenschaft für AI & Automation. Baut Tools die KMUs wirklich helfen.',
    avatarUrl: '', email: 'thomas@syntiq-ai.at',
  },
  jarvis: {
    id: 'jarvis', name: 'Jarvis', role: 'AI Assistent',
    bio: 'Der digitale Assistent von SyntiqAI. Multi-Agent AI System auf Basis von OpenClaw & Claude. Schreibt, recherchiert, und baut mit.',
    avatarUrl: '', email: 'jarvis@syntiq-ai.at',
  },
}

export async function getAuthor(id: string): Promise<Author | null> {
  try {
    const stored = await redis.hgetall<Author>(`author:${id}`)
    if (stored && Object.keys(stored).length > 0) return stored
  } catch { /* fall through to default */ }
  return DEFAULTS[id] ?? null
}
