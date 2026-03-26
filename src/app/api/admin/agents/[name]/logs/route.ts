const AGENT_API = 'http://192.168.178.107:8001'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const res = await fetch(`${AGENT_API}/agents/${name}/logs?lines=100`, { cache: 'no-store' })
  const data = await res.json()
  return Response.json(data)
}
