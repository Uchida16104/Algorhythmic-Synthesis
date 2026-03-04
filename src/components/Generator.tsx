'use client'

import React, { useState } from 'react'
import { Play, Download, RefreshCw } from 'lucide-react'

interface Parameters {
  mathSystem: string
  physicsEffect: string
  historicalForm: string
  artMovement: string
  tempo: number
  complexity: number
  channels: number
}

export default function Generator() {
  const [parameters, setParameters] = useState<Parameters>({
    mathSystem: 'fibonacci',
    physicsEffect: 'doppler',
    historicalForm: 'fugue',
    artMovement: 'impressionism',
    tempo: 89,
    complexity: 5,
    channels: 8
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [visualFeedback, setVisualFeedback] = useState<string[]>([])
  
  const mathSystems = [
    { id: 'fibonacci', name: 'Fibonacci Sequence', description: 'Golden ratio rhythm patterns' },
    { id: 'lorenz', name: 'Lorenz Attractor', description: 'Chaotic pitch modulation' },
    { id: 'complex', name: 'Complex Numbers', description: 'Magnitude and phase mapping' },
    { id: 'markov', name: 'Markov Chain', description: 'Probabilistic progressions' },
    { id: 'parametric', name: 'Parametric Equations', description: 'Geometric melodies' }
  ]
  
  const physicsEffects = [
    { id: 'doppler', name: 'Doppler Effect', description: 'Frequency shifting' },
    { id: 'spectral', name: 'Spectral Analysis', description: 'Harmonic series' },
    { id: 'ringmod', name: 'Ring Modulation', description: 'Frequency multiplication' }
  ]
  
  const historicalForms = [
    { id: 'organum', name: 'Medieval Organum', description: 'Parallel motion' },
    { id: 'fugue', name: 'Baroque Fugue', description: 'Contrapuntal structure' },
    { id: 'sonata', name: 'Sonata Form', description: 'Thematic development' },
    { id: 'serial', name: 'Twelve-Tone', description: 'Serial technique' },
    { id: 'minimalism', name: 'Minimalism', description: 'Phase shifting' }
  ]
  
  const artMovements = [
    { id: 'impressionism', name: 'Impressionism', description: 'Color-based harmony' },
    { id: 'artdeco', name: 'Art Deco', description: 'Geometric patterns' },
    { id: 'avantgarde', name: 'Avant-garde', description: 'Experimental forms' }
  ]
  
  const generateCode = () => {
    setIsGenerating(true)
    setVisualFeedback([])
    
    const steps = [
      'Initializing mathematical structures...',
      'Applying physics transformations...',
      'Structuring historical forms...',
      'Integrating visual arts aesthetics...',
      'Generating MIDI sequences...',
      'Compiling Sonic Pi code...',
      'Complete!'
    ]
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        setVisualFeedback(prev => [...prev, step])
        
        if (index === steps.length - 1) {
          const code = generateSonicPiCode()
          setGeneratedCode(code)
          setIsGenerating(false)
        }
      }, index * 800)
    })
  }
  
  const generateSonicPiCode = (): string => {
    const { mathSystem, physicsEffect, historicalForm, artMovement, tempo, complexity, channels } = parameters
    
    return `# Algorhythmic Synthesis Generated Code
# Configuration: ${mathSystem} + ${physicsEffect} + ${historicalForm} + ${artMovement}

use_bpm ${tempo}
use_midi_logging false

# Mathematical System: ${mathSystem}
${getMathCode(mathSystem)}

# Physics Effect: ${physicsEffect}
${getPhysicsCode(physicsEffect)}

# Historical Form: ${historicalForm}
${getHistoricalCode(historicalForm)}

# Art Movement: ${artMovement}
${getArtCode(artMovement)}

# Main Performance (${channels} channels)
${Array.from({length: channels}, (_, i) => `
live_loop :voice_${i + 1} do
  use_midi_defaults channel: ${i + 1}
  
  with_fx :reverb, room: ${(0.3 + Math.random() * 0.5).toFixed(2)} do
    ${generateVoicePattern(i, complexity)}
  end
  
  sleep ${(1 + Math.random() * 3).toFixed(1)}
end`).join('\n')}

puts "Algorhythmic Synthesis: ${channels} voices active"`
  }
  
  const getMathCode = (system: string): string => {
    const codes: Record<string, string> = {
      fibonacci: `define :fibonacci do |n|
  fib = [1, 1]
  (n - 2).times { fib << (fib[-1] + fib[-2]) }
  fib
end

fib_rhythm = fibonacci(8).map { |f| f / 8.0 }`,
      lorenz: `lorenz_x = 0.1
lorenz_y = 0.0
lorenz_z = 0.0

define :lorenz_step do |x, y, z|
  dt = 0.01
  [x + 10 * (y - x) * dt,
   y + (x * (28 - z) - y) * dt,
   z + (x * y - 2.67 * z) * dt]
end`,
      complex: `define :complex_to_pitch do |real, imag|
  magnitude = Math.sqrt(real**2 + imag**2)
  60 + (magnitude * 12).round
end`,
      markov: `markov_matrix = [
  [0.4, 0.3, 0.2, 0.1],
  [0.2, 0.3, 0.3, 0.2],
  [0.2, 0.2, 0.3, 0.3],
  [0.5, 0.1, 0.2, 0.2]
]`,
      parametric: `define :parametric_pitch do |t|
  x = Math.cos(t)
  y = Math.sin(t)
  60 + (x * 12).round + (y * 7).round
end`
    }
    return codes[system] || '# Mathematical system'
  }
  
  const getPhysicsCode = (effect: string): string => {
    const codes: Record<string, string> = {
      doppler: `define :doppler_shift do |freq, velocity|
  freq * (343.0 / (343.0 + velocity))
end`,
      spectral: `define :harmonic_series do |fundamental, count|
  (1..count).map { |n| fundamental + (12 * Math.log2(n)).round }
end`,
      ringmod: `define :ring_mod do |f1, f2|
  [(f1 + f2).abs, (f1 - f2).abs]
end`
    }
    return codes[effect] || '# Physics effect'
  }
  
  const getHistoricalCode = (form: string): string => {
    const codes: Record<string, string> = {
      organum: `define :organum_parallel do |melody|
  melody.map { |note| [note, note + 7] }
end`,
      fugue: `define :fugue_subject do |root|
  [root, root+2, root+4, root+7, root+11, root+9, root+7]
end`,
      sonata: `define :sonata_theme do |tonic|
  theme_a = [tonic, tonic+2, tonic+4, tonic+5, tonic+7]
  theme_b = theme_a.map { |n| n + 7 }
  [theme_a, theme_b]
end`,
      serial: `tone_row = (0..11).to_a.shuffle

define :retrograde do |series|
  series.reverse
end`,
      minimalism: `pattern = [60, 64, 67, 64]

define :phase_shift do |pattern, offset|
  pattern.rotate(offset)
end`
    }
    return codes[form] || '# Historical form'
  }
  
  const getArtCode = (movement: string): string => {
    const codes: Record<string, string> = {
      impressionism: `impressionist_colors = [210, 180, 150, 30, 60]

define :color_to_pitch do |hue|
  60 + ((hue / 30.0).round % 12)
end`,
      artdeco: `geometric_pattern = [0, 3, 7, 10, 12, 10, 7, 3]

define :angular_rhythm do
  [0.25, 0.25, 0.5, 0.25, 0.75]
end`,
      avantgarde: `define :experimental_gesture do
  notes = (36..96).to_a.sample(rand(3..8))
  durations = Array.new(notes.length) { rrand(0.1, 2.0) }
  [notes, durations]
end`
    }
    return codes[movement] || '# Art movement'
  }
  
  const generateVoicePattern = (index: number, complexity: number): string => {
    const patterns = [
      `notes = [60, 64, 67, 72]
    notes.each do |n|
      midi n, velocity: 70 + rand_i(20), sustain: 0.5
      sleep 0.5
    end`,
      `scale(:c, :major).each do |n|
      midi n, velocity: 80, sustain: 0.25
      sleep 0.25
    end`,
      `chord(:c, :major7).each do |n|
      midi n, velocity: 75, sustain: 1.5
      sleep 0.1
    end`,
      `(60..72).to_a.sample(${complexity}).each do |n|
      midi n, velocity: 60 + rand_i(30)
      sleep rrand(0.1, 0.5)
    end`
    ]
    
    return patterns[index % patterns.length]
  }
  
  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'algorhythmic_synthesis.rb'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Algorhythmic Synthesis Generator
          </h1>
          <p className="text-xl text-purple-200">
            数学・物理・音楽史・芸術の統合作曲システム
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Mathematical System</h3>
            <select
              value={parameters.mathSystem}
              onChange={(e) => setParameters({...parameters, mathSystem: e.target.value})}
              className="w-full bg-white bg-opacity-20 text-white rounded px-4 py-2 mb-4"
            >
              {mathSystems.map(sys => (
                <option key={sys.id} value={sys.id} className="bg-purple-900">
                  {sys.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-purple-200">
              {mathSystems.find(s => s.id === parameters.mathSystem)?.description}
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Physics Effect</h3>
            <select
              value={parameters.physicsEffect}
              onChange={(e) => setParameters({...parameters, physicsEffect: e.target.value})}
              className="w-full bg-white bg-opacity-20 text-white rounded px-4 py-2 mb-4"
            >
              {physicsEffects.map(eff => (
                <option key={eff.id} value={eff.id} className="bg-purple-900">
                  {eff.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-purple-200">
              {physicsEffects.find(e => e.id === parameters.physicsEffect)?.description}
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Historical Form</h3>
            <select
              value={parameters.historicalForm}
              onChange={(e) => setParameters({...parameters, historicalForm: e.target.value})}
              className="w-full bg-white bg-opacity-20 text-white rounded px-4 py-2 mb-4"
            >
              {historicalForms.map(form => (
                <option key={form.id} value={form.id} className="bg-purple-900">
                  {form.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-purple-200">
              {historicalForms.find(f => f.id === parameters.historicalForm)?.description}
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Art Movement</h3>
            <select
              value={parameters.artMovement}
              onChange={(e) => setParameters({...parameters, artMovement: e.target.value})}
              className="w-full bg-white bg-opacity-20 text-white rounded px-4 py-2 mb-4"
            >
              {artMovements.map(art => (
                <option key={art.id} value={art.id} className="bg-purple-900">
                  {art.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-purple-200">
              {artMovements.find(a => a.id === parameters.artMovement)?.description}
            </p>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Parameters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-white mb-2">Tempo (BPM)</label>
              <input
                type="range"
                min="60"
                max="180"
                value={parameters.tempo}
                onChange={(e) => setParameters({...parameters, tempo: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="text-center text-white mt-2">{parameters.tempo}</div>
            </div>
            
            <div>
              <label className="block text-white mb-2">Complexity (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={parameters.complexity}
                onChange={(e) => setParameters({...parameters, complexity: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="text-center text-white mt-2">{parameters.complexity}</div>
            </div>
            
            <div>
              <label className="block text-white mb-2">MIDI Channels</label>
              <input
                type="range"
                min="1"
                max="16"
                value={parameters.channels}
                onChange={(e) => setParameters({...parameters, channels: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="text-center text-white mt-2">{parameters.channels}</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={generateCode}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Play />
                Generate Code
              </>
            )}
          </button>
          
          {generatedCode && (
            <button
              onClick={downloadCode}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all"
            >
              <Download />
              Download
            </button>
          )}
        </div>
        
        {visualFeedback.length > 0 && (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Generation Process</h3>
            <div className="space-y-2">
              {visualFeedback.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {generatedCode && (
          <div className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Generated Sonic Pi Code</h3>
            <pre className="text-green-300 text-sm overflow-x-auto whitespace-pre-wrap">
              {generatedCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
