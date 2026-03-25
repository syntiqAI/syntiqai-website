import fs from 'fs'
import path from 'path'

export interface Author {
  id: string
  name: string
  bio: string
  avatarUrl: string
  email: string
  role: string
}

const authorsDir = path.join(process.cwd(), 'content/authors')

export function getAuthor(id: string): Author | null {
  // Check Redis-overridden profile first
  try {
    const filePath = path.join(authorsDir, `${id}.json`)
    if (!fs.existsSync(filePath)) return null
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Author
  } catch {
    return null
  }
}

export function getAllAuthors(): Author[] {
  if (!fs.existsSync(authorsDir)) return []
  return fs.readdirSync(authorsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(authorsDir, f), 'utf8')) as Author
      } catch {
        return null
      }
    })
    .filter(Boolean) as Author[]
}
