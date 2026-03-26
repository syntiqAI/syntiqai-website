'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

const AGENT_API = 'https://agents.syntiq-ai.at'

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
  description: string
}

interface ModalData {
  name: string
  tab: 'logs' | 'processes'
  logs: string
  processes: { titles: string[]; rows: string[][] }
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
  const [modal, setModal] = useState<ModalData | null>(null)
  const [modalLoading, setModalLoading] = useState(false)

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

  async function openModal(name: string, tab: 'logs' | 'processes') {
    setModal({ name, tab, logs: '', processes: { titles: [], rows: [] } })
    setModalLoading(true)
    await loadModalTab(name, tab)
    setModalLoading(false)
  }

  async function loadModalTab(name: string, tab: 'logs' | 'processes') {
    if (tab === 'logs') {
      const res = await fetch(`${AGENT_API}/agents/${name}/logs?lines=100`, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setModal(m => m ? { ...m, tab, logs: data.logs || '(keine Logs)' } : null)
      }
    } else {
      const res = await fetch(`${AGENT_API}/agents/${name}/processes`, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setModal(m => m ? { ...m, tab, processes: { titles: data.titles || [], rows: data.processes || [] } } : null)
      }
    }
  }

  async function switchTab(tab: 'logs' | 'processes') {
    if (!modal) return
    setModal(m => m ? { ...m, tab } : null)
    setModalLoading(true)
    await loadModalTab(modal.name, tab)
    setModalLoading(false)
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                  {agent.agent_name !== agent.name ? agent.agent_name : agent.name}
                </div>
                <StatusBadge status={agent.status} />
              </div>

              {/* Workspace + type badges */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {agent.workspace !== '-' && (
                  <span style={{
                    fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px',
                    background: 'rgba(79,142,247,0.15)', color: '#4f8ef7',
                    border: '1px solid rgba(79,142,247,0.3)',
                  }}>{agent.workspace}</span>
                )}
                {agent.agent_type !== '-' && (
                  <span style={{
                    fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px',
                    background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>{agent.agent_type}</span>
                )}
              </div>

              {/* Description */}
              {agent.description && (
                <p style={{
                  fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)',
                  marginBottom: '0.75rem', lineHeight: '1.5',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '0.5rem',
                  borderLeft: '2px solid rgba(79,142,247,0.5)',
                }}>
                  {agent.description}
                </p>
              )}

              {/* Meta */}
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem', lineHeight: '1.7' }}>
                <div>Container: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{agent.name}</span></div>
                <div>Image: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{agent.image}</span></div>
                <div>Erstellt: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{agent.created.replace('T', ' ')}</span></div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => openModal(agent.name, 'logs')}
                  style={{
                    flex: 1, padding: '0.45rem 0', borderRadius: '0.5rem', fontSize: '0.8rem',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white', cursor: 'pointer',
                  }}
                >
                  📋 Logs
                </button>
                <button
                  onClick={() => openModal(agent.name, 'processes')}
                  style={{
                    flex: 1, padding: '0.45rem 0', borderRadius: '0.5rem', fontSize: '0.8rem',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white', cursor: 'pointer',
                  }}
                >
                  ⚙️ Prozesse
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

      {/* Modal */}
      {modal && (
        <div
          onClick={() => setModal(null)}
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
              borderRadius: '1rem', width: '100%', maxWidth: '800px',
              maxHeight: '80vh', display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontWeight: 700 }}>{modal.name}</span>
              <button
                onClick={() => setModal(null)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.2rem' }}
              >✕</button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {(['logs', 'processes'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  style={{
                    padding: '0.65rem 1.5rem', fontSize: '0.85rem', cursor: 'pointer',
                    background: 'none', border: 'none',
                    color: modal.tab === tab ? 'white' : 'rgba(255,255,255,0.4)',
                    borderBottom: modal.tab === tab ? '2px solid #4f8ef7' : '2px solid transparent',
                    fontWeight: modal.tab === tab ? 600 : 400,
                  }}
                >
                  {tab === 'logs' ? '📋 Logs' : '⚙️ Prozesse'}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div style={{ overflow: 'auto', flex: 1 }}>
              {modalLoading ? (
                <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>Lade…</p>
              ) : modal.tab === 'logs' ? (
                <pre style={{
                  margin: 0, padding: '1.25rem 1.5rem',
                  fontSize: '0.75rem', lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                }}>
                  {modal.logs || '(keine Logs)'}
                </pre>
              ) : (
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  {modal.processes.rows.length === 0 ? (
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                      Container läuft nicht oder keine Prozesse.
                    </p>
                  ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                      <thead>
                        <tr>
                          {modal.processes.titles.map((t, i) => (
                            <th key={i} style={{
                              textAlign: 'left', padding: '0.4rem 0.75rem',
                              color: 'rgba(255,255,255,0.4)', fontWeight: 600,
                              borderBottom: '1px solid rgba(255,255,255,0.08)',
                            }}>{t}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {modal.processes.rows.map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            {row.map((cell, j) => (
                              <td key={j} style={{ padding: '0.4rem 0.75rem', color: 'rgba(255,255,255,0.7)' }}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
