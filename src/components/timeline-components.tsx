export const timelineComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderLeft: '3px solid #4f8ef7',
      borderRadius: '0 0.875rem 0 0',
      padding: '1.5rem 2rem 1rem',
      marginTop: '0',
    }}>
      <h2 style={{
        fontSize: '1.25rem', fontWeight: 800, color: '#4f8ef7',
        letterSpacing: '-0.01em', margin: 0,
      }}>{children}</h2>
    </div>
  ),

  p: ({ children }: { children?: React.ReactNode }) => (
    <p style={{
      color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: '1rem',
      margin: '0 0 0.75rem 0',
    }}>{children}</p>
  ),

  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong style={{ color: 'white', fontWeight: 600 }}>{children}</strong>
  ),

  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {children}
    </ul>
  ),

  li: ({ children }: { children?: React.ReactNode }) => (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7 }}>
      <span style={{ color: '#4f8ef7', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>→</span>
      <span>{children}</span>
    </li>
  ),

  hr: () => (
    <div style={{ height: '1.25rem' }} />
  ),
}
