import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { code?: string }
    const { code } = body

    if (!code || typeof code !== 'string') {
      return new NextResponse(
        '<span class="text-red-400">No code provided</span>',
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    const loops = [...code.matchAll(/live_loop\s+:(\w+)/g)]
    const defines = [...code.matchAll(/define\s+:(\w+)/g)]
    const bpmMatch = code.match(/^use_bpm\s+(\d+)/m)
    const channels = [...code.matchAll(/channel:\s*(\d+)/g)]
    const effects = [...code.matchAll(/with_fx\s+:(\w+)/g)]

    const uniqueEffects = [...new Set(effects.map(m => m[1]))]
    const uniqueChannels = [...new Set(channels.map(m => m[1]))].sort((a, b) => parseInt(a) - parseInt(b))
    const bpm = bpmMatch ? bpmMatch[1] : '?'

    const hasErrors = loops.length === 0

    const html = `
<div class="grid grid-cols-2 gap-2 text-xs font-mono">
  <div class="bg-slate-800 rounded px-3 py-2 border border-slate-700">
    <span class="text-slate-400">live_loops</span>
    <span class="block text-2xl font-bold ${loops.length > 0 ? 'text-emerald-400' : 'text-red-400'}">${loops.length}</span>
  </div>
  <div class="bg-slate-800 rounded px-3 py-2 border border-slate-700">
    <span class="text-slate-400">BPM</span>
    <span class="block text-2xl font-bold text-violet-400">${bpm}</span>
  </div>
  <div class="bg-slate-800 rounded px-3 py-2 border border-slate-700">
    <span class="text-slate-400">MIDI channels</span>
    <span class="block text-lg font-bold text-cyan-400">${uniqueChannels.length > 0 ? uniqueChannels.join(', ') : '—'}</span>
  </div>
  <div class="bg-slate-800 rounded px-3 py-2 border border-slate-700">
    <span class="text-slate-400">defines</span>
    <span class="block text-2xl font-bold text-amber-400">${defines.length}</span>
  </div>
  <div class="bg-slate-800 col-span-2 rounded px-3 py-2 border border-slate-700">
    <span class="text-slate-400">effects</span>
    <span class="block text-base font-bold text-pink-400 truncate">${uniqueEffects.length > 0 ? uniqueEffects.slice(0, 5).join(' · ') : '—'}</span>
  </div>
  <div class="col-span-2 flex items-center gap-2 mt-1">
    <span class="w-2 h-2 rounded-full ${hasErrors ? 'bg-red-400' : 'bg-emerald-400'}"></span>
    <span class="text-slate-300">${hasErrors ? 'No live_loop blocks detected' : `Valid — ${loops.length} voices ready`}</span>
  </div>
</div>`.trim()

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch {
    return new NextResponse(
      '<span class="text-red-400 text-xs">Validation error</span>',
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}
