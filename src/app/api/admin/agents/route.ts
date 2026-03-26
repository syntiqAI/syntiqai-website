const AGENT_API = 'http://192.168.178.107:8001'

export async function GET() {
  const res = await fetch(`${AGENT_API}/agents`, { cache: 'no-store' })
  const data = await res.json()
  return Response.json(data)
}
