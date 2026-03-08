import { NextRequest, NextResponse } from 'next/server'

interface VoiceData {
  name: string
  channel: number
  effects: string[]
  bpm: number | null
  sleepTotal: number
  midiNotes: number[]
  category: string
}

interface ParseResult {
  voices: VoiceData[]
  globalBpm: number
  defines: string[]
  title: string
}

function sanitizeLabel(raw: string): string {
  return raw.replace(/["\[\]{}|<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 28)
}

function categorizeVoice(name: string): string {
  const math = ['fibonacci', 'lorenz', 'chaos', 'complex', 'parametric', 'markov', 'serial']
  const history = ['fugue', 'organum', 'sonata', 'minimalist', 'baroque']
  const physics = ['spectral', 'physics', 'doppler', 'harmonic']
  const arts = ['poetry', 'visual', 'dance', 'comedy', 'art']
  const polytempo = ['polytempo', 'polyrhythm', 'aleatoric', 'graphic']

  const n = name.toLowerCase()
  if (math.some(k => n.includes(k))) return 'Mathematical'
  if (history.some(k => n.includes(k))) return 'Historical'
  if (physics.some(k => n.includes(k))) return 'Physics'
  if (arts.some(k => n.includes(k))) return 'Arts'
  if (polytempo.some(k => n.includes(k))) return 'Polytempo'
  return 'Other'
}

function parseSonicPiCode(code: string): ParseResult {
  const voices: VoiceData[] = []
  const lines = code.split('\n')

  let i = 0
  while (i < lines.length) {
    const loopMatch = lines[i].match(/^\s*live_loop\s+:(\w+)/)
    if (loopMatch) {
      const name = loopMatch[1]
      let depth = 0
      let j = i
      const bodyLines: string[] = []

      while (j < lines.length) {
        const line = lines[j]
        const doCount = (line.match(/\bdo\b/g) ?? []).length
        const endCount = (line.match(/\bend\b/g) ?? []).length
        depth += doCount - endCount
        if (j > i) bodyLines.push(line)
        if (j > i && depth <= 0) break
        j++
      }

      const body = bodyLines.slice(0, -1).join('\n')

      const channelMatch = body.match(/channel:\s*(\d+)/)
      const channel = channelMatch ? parseInt(channelMatch[1], 10) : 1

      const fxMatches = [...body.matchAll(/with_fx\s+:(\w+)/g)]
      const effects = fxMatches.map(m => m[1])

      const bpmMatch = body.match(/use_bpm\s+([\d.]+)/)
      const bpm = bpmMatch ? parseFloat(bpmMatch[1]) : null

      const sleepMatches = [...body.matchAll(/sleep\s+([\d.]+)/g)]
      const sleepTotal = sleepMatches.reduce((s, m) => s + parseFloat(m[1]), 0)

      const noteMatches = [...body.matchAll(/\bmidi\s+(\d+)/g)]
      const midiNotes = noteMatches.map(m => parseInt(m[1], 10)).slice(0, 8)

      voices.push({
        name,
        channel,
        effects,
        bpm,
        sleepTotal: Math.round(sleepTotal * 100) / 100,
        midiNotes,
        category: categorizeVoice(name),
      })

      i = j + 1
    } else {
      i++
    }
  }

  const globalBpmMatch = code.match(/^use_bpm\s+(\d+)/m)
  const globalBpm = globalBpmMatch ? parseInt(globalBpmMatch[1], 10) : 89

  const defineMatches = [...code.matchAll(/define\s+:(\w+)/g)]
  const defines = [...new Set(defineMatches.map(m => m[1]))]

  const titleMatch = code.match(/^#\s*={10,}\s*\n#\s+(.+)\n/m)
  const title = titleMatch ? sanitizeLabel(titleMatch[1]) : 'Algorhythmic Synthesis'

  return { voices, globalBpm, defines, title }
}

function midiNoteToName(n: number): string {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const oct = Math.floor(n / 12) - 1
  return `${names[n % 12]}${oct}`
}

function generateFlowchart(parsed: ParseResult): string {
  const { voices, globalBpm, defines, title } = parsed
  const lines: string[] = ['flowchart TD']

  lines.push(`    START(["${sanitizeLabel(title)}<br/>BPM: ${globalBpm}"])`)
  lines.push('')

  if (defines.length > 0) {
    lines.push('    subgraph MATH["Mathematical Functions"]')
    defines.slice(0, 10).forEach((d, i) => {
      lines.push(`        M${i}["${sanitizeLabel(d)}()"]`)
    })
    lines.push('    end')
    lines.push('')
  }

  const categories = [...new Set(voices.map(v => v.category))]
  categories.forEach(cat => {
    const catVoices = voices.filter(v => v.category === cat)
    const catId = cat.replace(/\s+/g, '')
    lines.push(`    subgraph ${catId}["${cat} Layer"]`)
    catVoices.forEach(v => {
      const fx = v.effects.slice(0, 2).join(' + ')
      const fxLabel = fx ? `<br/><small>${sanitizeLabel(fx)}</small>` : ''
      lines.push(`        V${v.channel}["Ch${v.channel}: ${sanitizeLabel(v.name)}${fxLabel}"]`)
    })
    lines.push('    end')
    lines.push('')
  })

  lines.push('    OUTPUT[["MIDI Out<br/>16 Channels"]]')
  lines.push('    SCORE[/"Score + .mmd"/]')
  lines.push('')

  lines.push('    START --> MATH')
  defines.slice(0, voices.length).forEach((_, i) => {
    if (voices[i]) {
      lines.push(`    M${i} --> V${voices[i].channel}`)
    }
  })

  voices.forEach(v => {
    lines.push(`    V${v.channel} --> OUTPUT`)
  })

  lines.push('    OUTPUT --> SCORE')
  lines.push('')

  lines.push('    classDef mathNode fill:#3b0764,stroke:#a855f7,color:#f3e8ff,rx:6')
  lines.push('    classDef voiceNode fill:#0c1a3a,stroke:#3b82f6,color:#bfdbfe,rx:4')
  lines.push('    classDef ioNode fill:#052e16,stroke:#22c55e,color:#bbf7d0')

  if (defines.length > 0) {
    lines.push(`    class ${defines.slice(0, 10).map((_, i) => `M${i}`).join(',')} mathNode`)
  }
  if (voices.length > 0) {
    lines.push(`    class ${voices.map(v => `V${v.channel}`).join(',')} voiceNode`)
  }
  lines.push('    class OUTPUT,SCORE ioNode')

  return lines.join('\n')
}

function generateSequenceDiagram(parsed: ParseResult): string {
  const { voices, globalBpm } = parsed
  const shown = voices.slice(0, 8)
  const lines: string[] = ['sequenceDiagram']
  lines.push('    autonumber')
  lines.push('')
  lines.push('    participant C as Conductor')
  shown.forEach(v => {
    lines.push(`    participant Ch${v.channel} as ${sanitizeLabel(v.name)}`)
  })
  lines.push('    participant OUT as MIDI Output')
  lines.push('')
  lines.push(`    Note over C: BPM ${globalBpm} — Performance Start`)
  lines.push('')

  shown.forEach(v => {
    lines.push(`    C->>Ch${v.channel}: initialize live_loop`)
    if (v.effects.length > 0) {
      lines.push(`    Note over Ch${v.channel}: fx: ${sanitizeLabel(v.effects[0])}`)
    }
    if (v.midiNotes.length > 0) {
      const noteName = midiNoteToName(v.midiNotes[0])
      lines.push(`    Ch${v.channel}->>OUT: midi ${noteName} ch:${v.channel}`)
    } else {
      lines.push(`    Ch${v.channel}->>OUT: note data ch:${v.channel}`)
    }
    lines.push(`    Ch${v.channel}-->>C: sleep ${v.sleepTotal}`)
    lines.push('')
  })

  lines.push('    Note over OUT: Synthesis Complete')

  return lines.join('\n')
}

function generateGanttChart(parsed: ParseResult): string {
  const { voices, globalBpm, title } = parsed
  const lines: string[] = ['gantt']
  lines.push(`    title ${sanitizeLabel(title)} — BPM ${globalBpm}`)
  lines.push('    dateFormat X')
  lines.push('    axisFormat %Lms')
  lines.push('')

  const categories = [...new Set(voices.map(v => v.category))]
  let cursor = 0

  categories.forEach(cat => {
    const catVoices = voices.filter(v => v.category === cat)
    lines.push(`    section ${cat}`)
    catVoices.forEach(v => {
      const beatsPerSecond = globalBpm / 60
      const durationMs = Math.max(Math.round((v.sleepTotal / beatsPerSecond) * 1000), 400)
      const effectiveBpm = v.bpm ?? globalBpm
      const status = effectiveBpm !== globalBpm ? 'crit' : 'active'
      lines.push(`    ${sanitizeLabel(v.name)} :${status}, ${cursor}, ${durationMs}`)
      cursor += Math.round(durationMs * 0.3)
    })
    lines.push('')
  })

  return lines.join('\n')
}

function generateMindMap(parsed: ParseResult): string {
  const { voices, globalBpm, defines, title } = parsed
  const lines: string[] = ['mindmap']
  lines.push(`  root(${sanitizeLabel(title)})`)
  lines.push(`    BPM ${globalBpm}`)

  const categories = [...new Set(voices.map(v => v.category))]
  categories.forEach(cat => {
    lines.push(`    ${cat}`)
    voices
      .filter(v => v.category === cat)
      .forEach(v => {
        lines.push(`      Ch${v.channel} ${sanitizeLabel(v.name)}`)
      })
  })

  if (defines.length > 0) {
    lines.push('    Functions')
    defines.slice(0, 8).forEach(d => {
      lines.push(`      ${sanitizeLabel(d)}`)
    })
  }

  return lines.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { code?: string; diagramType?: string }
    const { code, diagramType = 'flowchart' } = body

    if (!code || typeof code !== 'string' || code.trim().length < 10) {
      return NextResponse.json(
        { error: 'Valid Sonic Pi code is required.' },
        { status: 400 }
      )
    }

    const parsed = parseSonicPiCode(code)

    if (parsed.voices.length === 0) {
      return NextResponse.json(
        { error: 'No live_loop blocks found. Please provide valid Sonic Pi code.' },
        { status: 422 }
      )
    }

    let mermaid: string

    switch (diagramType) {
      case 'sequence':
        mermaid = generateSequenceDiagram(parsed)
        break
      case 'gantt':
        mermaid = generateGanttChart(parsed)
        break
      case 'mindmap':
        mermaid = generateMindMap(parsed)
        break
      default:
        mermaid = generateFlowchart(parsed)
    }

    return NextResponse.json({
      mermaid,
      metadata: {
        title: parsed.title,
        voiceCount: parsed.voices.length,
        bpm: parsed.globalBpm,
        diagramType,
        categories: [...new Set(parsed.voices.map(v => v.category))],
        defines: parsed.defines.length,
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal error during generation.' },
      { status: 500 }
    )
  }
}
