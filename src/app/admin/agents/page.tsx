'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

const AGENT_API = 'http://192.168.178.107:8001'

interface Agent {
  id: string
  name: string
  status: string
  image: string
  created: string
  started: string
  agent_name: string
  workspace: string
  agent_type: string
}

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '0.875rem',
}

function statusColor(status: string) {
  if (status === 'running') return '#4ade80'
  if (status === 'exited') return '#f87171'
  return 'rgba(255,255,255,0.3)'
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600,
      background: `${statusColor(status)}18`,
      color: statusColor(status),
      border: `1px solid ${statusColor(status)}44`,
    }}>
      <span style={{ fontSize: '0.6rem' }}>●</span>
      {status}
    </span>
  )
}

export default function AgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [logModal, setLogModal] = useState<{ name: string; logs: string } | null>(null)
  const [logLoading, setLogLoading] = useState(false)

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${AGENT_API}/agents`, { cache: 'no-store' })
      if (res.ok) setAgents(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const iv = setInterval(load, 10000)
    return () => clearInterval(iv)
  }, [load])

  async function doAction(name: string, action: 'start' | 'stop') {
    setActionLoading(name + action)
    await fetch(`${AGENT_API}/agents/${name}/${action}`, { method: 'POST' })
    await load()
    setActionLoading(null)
  }

  async function openLogs(name: string) {
    setLogLoading(true)
    setLogModal({ name, logs: '' })
    const res = await fetch(`${AGENT_API}/agents/${name}/logs?lines=100`, { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      setLogModal({ name, logs: data.logs || '(keine Logs)' })
    }
    setLogLoading(false)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <div style={{ marginBottom: '0.5rem' }}>
            <Link href="/admin" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>
              ← Admin Portal
            </Link>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>🤖 Agent Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
            VM 107 · syntiqai-agents · {loading ? '…' : `${agents.length} Container`}
          </p>
        </div>
        <button
          onClick={load}
          style={{
            padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'white', cursor: 'pointer',
          }}
        >
          ↻ Refresh
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '4rem' }}>Lade…</p>
      ) : agents.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '4rem' }}>Keine Container gefunden.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {agents.map(agent => (
            <div key={agent.id} style={{ ...glass, padding: '1.5rem' }}>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                    {agent.agent_name !== agent.name ? agent.agent_name : agent.name}
                  </div>
                  {agent.workspace !== '-' && (
                    <span style={{
                      fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px',
                      background: 'rgba(79,142,247,0.15)', color: '#4f8ef7',
                      border: '1px solid rgba(79,142,247,0.3)',
                    }}>
                      {agent.workspace}
                    </span>
                  )}
                </div>
                <StatusBadge status={agent.status} />
              </div>

              {/* Meta */}
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem', lineHeight: '1.7' }}>
                <div>Container: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{agent.name}</span></div>
                <div>Image: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{agent.image}</span></div>
                {agent.agent_type !== '-' && (
                  <div>Typ: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{agent.agent_type}</span></div>
                )}
                <div>Erstellt: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{agent.created.replace('T', ' ')}</span></div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => openLogs(agent.name)}
                  style={{
                    flex: 1, padding: '0.45rem 0', borderRadius: '0.5rem', fontSize: '0.8rem',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white', cursor: 'pointer',
                  }}
                >
                  📋 Logs
                </button>
                {agent.status !== 'running' ? (
                  <button
                    onClick={() => doAction(agent.name, 'start')}
                    disabled={actionLoading === agent.name + 'start'}
                    style={{
                      flex: 1, padding: '0.45rem 0', borderRadius: '0.5rem', fontSize: '0.8rem',
                      background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)',
                      color: '#4ade80', cursor: 'pointer',
                    }}
                  >
                    {actionLoading === agent.name + 'start' ? '…' : '▶ Start'}
                  </button>
                ) : (
                  <button
                    onClick={() => doAction(agent.name, 'stop')}
                    disabled={actionLoading === agent.name + 'stop'}
                    style={{
                      flex: 1, padding: '0.45rem 0', borderRadius: '0.5rem', fontSize: '0.8rem',
                      background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)',
                      color: '#f87171', cursor: 'pointer',
                    }}
                  >
                    {actionLoading === agent.name + 'stop' ? '…' : '■ Stop'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Log Modal */}
      {logModal && (
        <div
          onClick={() => setLogModal(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '2rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0d1117', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '1rem', width: '100%', maxWidth: '760px',
              maxHeight: '80vh', display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontWeight: 700 }}>📋 Logs — {logModal.name}</span>
              <button
                onClick={() => setLogModal(null)}
                style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1,
                }}
              >✕</button>
            </div>
            <pre style={{
              margin: 0, padding: '1.25rem 1.5rem',
              overflow: 'auto', fontSize: '0.75rem', lineHeight: '1.6',
              color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace',
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>
              {logLoading ? 'Lade Logs…' : logModal.logs || '(keine Logs)'}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
