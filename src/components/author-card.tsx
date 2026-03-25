import { getAuthor } from '@/lib/authors'

interface Props { authorId: string }

export async function AuthorCard({ authorId }: Props) {
  const author = await getAuthor(authorId)
  if (!author) return null
  const initials = author.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      padding: '1.5rem', marginTop: '3rem',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem',
    }}>
      {author.avatarUrl ? (
        <img src={author.avatarUrl} alt={author.name}
          style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
      ) : (
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #4f8ef7, #a78bfa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', fontWeight: 700, color: 'white',
        }}>{initials}</div>
      )}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{author.name}</span>
          <span style={{
            fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px',
            background: 'rgba(79,142,247,0.12)', color: '#4f8ef7', border: '1px solid rgba(79,142,247,0.2)',
          }}>{author.role}</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{author.bio}</p>
      </div>
    </div>
  )
}
