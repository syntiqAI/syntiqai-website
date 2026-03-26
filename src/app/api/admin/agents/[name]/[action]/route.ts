const AGENT_API = 'http://192.168.178.107:8001'

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ name: string; action: string }> }
) {
  const { name, action } = await params
  if (action !== 'start' && action !== 'stop') {
    return Response.json({ error: 'Invalid action' }, { status: 400 })
  }
  const res = await fetch(`${AGENT_API}/agents/${name}/${action}`, {
    method: 'POST',
    cache: 'no-store',
  })
  const data = await res.json()
  return Response.json(data)
}
