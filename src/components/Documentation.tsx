'use client'

import React from 'react'
import { Book, Music, Code, Layers } from 'lucide-react'

export default function Documentation() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Documentation
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition-all">
            <Book className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Genre Definition</h3>
            <p className="text-gray-300 text-sm">
              Multi-language documentation covering the complete theoretical framework in English, Japanese, French, German, Italian, and Latin.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition-all">
            <Music className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Musical Scores</h3>
            <p className="text-gray-300 text-sm">
              Complete LilyPond and MusicXML implementations featuring multi-movement compositions with historical and contemporary techniques.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition-all">
            <Code className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Sonic Pi Code</h3>
            <p className="text-gray-300 text-sm">
              Full 16-channel MIDI implementation with mathematical algorithms, physics simulations, and multi-arts integration.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition-all">
            <Layers className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">System Diagrams</h3>
            <p className="text-gray-300 text-sm">
              Comprehensive Mermaid flowcharts and arrow diagrams illustrating the complete algorithmic composition workflow.
            </p>
          </div>
        </div>
        
        <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Mathematical Integration</h4>
              <p className="text-sm">Fibonacci sequences, Lorenz attractors, complex numbers, Markov chains, parametric equations, matrices, vectors, and chaos theory implementations.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Physics Simulations</h4>
              <p className="text-sm">Doppler effect frequency shifting, spectral analysis with harmonic series, and ring modulation for advanced sound synthesis.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Historical Forms</h4>
              <p className="text-sm">Medieval organum, Renaissance motets, Baroque fugues, Classical sonatas, Romantic variations, and modern serialist techniques.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Multi-Arts Synthesis</h4>
              <p className="text-sm">Poetry rhythm mapping, visual arts color-to-pitch conversion, contemporary dance tempo curves, and comedic timing structures.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
