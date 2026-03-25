import { NextRequest, NextResponse } from 'next/server'
import { findByToken, updateSubscriberStatus } from '@/lib/redis'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    return new NextResponse('<h2>Ungültiger Link.</h2>', { headers: { 'Content-Type': 'text/html' } })
  }
  const sub = await findByToken(token)
  if (!sub) {
    return new NextResponse('<h2>Link nicht gefunden oder bereits abgemeldet.</h2>', { headers: { 'Content-Type': 'text/html' } })
  }
  await updateSubscriberStatus(sub.id, 'unsubscribed')
  return new NextResponse(`
    <!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>Abgemeldet</title>
    <style>body{font-family:system-ui;background:#03060f;color:#e8eaf2;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center}
    h1{font-size:2rem;margin-bottom:1rem}p{color:rgba(255,255,255,0.5)}a{color:#4f8ef7}</style></head>
    <body><div><h1>✓ Erfolgreich abgemeldet</h1>
    <p>${sub.email} wurde vom Newsletter abgemeldet.</p>
    <p style="margin-top:2rem"><a href="https://syntiq-ai.at">← Zurück zur Website</a></p>
    </div></body></html>
  `, { headers: { 'Content-Type': 'text/html' } })
}
