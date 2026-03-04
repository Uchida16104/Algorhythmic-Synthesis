# ==============================================================================
# ALGORHYTHMIC SYNTHESIS - Complete Implementation
# Multi-channel MIDI with Mathematical/Physical/Historical Integration
# ==============================================================================

use_debug false
use_midi_logging false

# ==============================================================================
# MATHEMATICAL FUNCTIONS
# ==============================================================================

# Fibonacci sequence generator
define :fibonacci do |n|
  return [0] if n <= 0
  return [0, 1] if n == 1
  fib = [0, 1]
  (n - 1).times do
    fib << (fib[-1] + fib[-2])
  end
  fib
end

# Golden ratio calculator
define :golden_ratio do
  (1.0 + Math.sqrt(5)) / 2.0
end

# Lorenz attractor simplified (chaos theory)
define :lorenz_x do |x, y, z, dt, sigma=10.0|
  x + sigma * (y - x) * dt
end

define :lorenz_y do |x, y, z, dt, rho=28.0|
  y + (x * (rho - z) - y) * dt
end

define :lorenz_z do |x, y, z, dt, beta=8.0/3.0|
  z + (x * y - beta * z) * dt
end

# Complex number to pitch mapping
define :complex_to_pitch do |real, imag, base=60|
  magnitude = Math.sqrt(real**2 + imag**2)
  angle = Math.atan2(imag, real)
  pitch = base + (magnitude * 12).round + (angle * 6 / Math::PI).round
  [pitch, 127].min
end

# Matrix transformation for harmony
define :matrix_chord do |matrix, base_note|
  matrix.map { |row| base_note + row.sum % 12 }
end

# Markov chain for harmonic progression
define :markov_next_chord do |current, transition_matrix|
  probabilities = transition_matrix[current]
  rand_val = rand
  cumulative = 0
  probabilities.each_with_index do |prob, idx|
    cumulative += prob
    return idx if rand_val < cumulative
  end
  probabilities.length - 1
end

# ==============================================================================
# PHYSICS FUNCTIONS
# ==============================================================================

# Doppler effect frequency shift
define :doppler_shift do |frequency, velocity, sound_speed=343.0|
  frequency * (sound_speed / (sound_speed + velocity))
end

# Harmonic series generator (spectral analysis)
define :harmonic_series do |fundamental, num_harmonics|
  (1..num_harmonics).map { |n| fundamental * n }
end

# Ring modulation simulation
define :ring_mod do |freq1, freq2|
  [(freq1 + freq2).abs, (freq1 - freq2).abs]
end

# ==============================================================================
# HISTORICAL MUSIC STRUCTURE FUNCTIONS
# ==============================================================================

# Medieval Organum (parallel motion)
define :organum_parallel do |melody, interval|
  melody.map { |note| [note, note + interval] }
end

# Renaissance Motet rhythm pattern
define :motet_rhythm do
  [1, 0.5, 0.5, 1, 0.75, 0.25, 1]
end

# Baroque Fugue subject generator
define :fugue_subject do |root|
  [root, root+2, root+4, root+7, root+11, root+9, root+7, root+5, root+4, root+2, root]
end

# Baroque Fugue answer (transposed to dominant)
define :fugue_answer do |subject|
  subject.map { |note| note + 7 }
end

# Classical Sonata form theme
define :sonata_theme do |tonic|
  # First theme in tonic
  theme_a = [tonic, tonic+2, tonic+4, tonic+5, tonic+7, tonic+5, tonic+4, tonic+2, tonic]
  # Second theme in dominant
  theme_b = theme_a.map { |n| n + 7 }
  [theme_a, theme_b]
end

# Twelve-tone row generator
define :twelve_tone_row do
  (0..11).to_a.shuffle
end

# Retrograde
define :retrograde do |series|
  series.reverse
end

# Inversion
define :inversion do |series, axis=0|
  series.map { |note| axis - note }
end

# Retrograde inversion
define :retrograde_inversion do |series, axis=0|
  retrograde(inversion(series, axis))
end

# ==============================================================================
# MULTI-ARTS INTEGRATION
# ==============================================================================

# Poetry rhythm to musical rhythm (syllable counting)
define :poetry_to_rhythm do |syllable_pattern|
  syllable_pattern.map { |syllables| syllables / 4.0 }
end

# Visual art color to pitch (Art Deco/Impressionism inspired)
define :color_to_pitch do |hue, base=60|
  # Hue 0-360 mapped to chromatic scale
  base + ((hue / 30.0).round % 12)
end

# Dance motion tempo variation (Contemporary dance)
define :dance_tempo_curve do |t, amplitude=30|
  # Sinusoidal tempo variation
  120 + amplitude * Math.sin(t * Math::PI / 8)
end

# Comedy timing (unexpected pauses and rushes)
define :comedy_timing do
  [1, 1, 0.5, 2.5, 0.25, 0.25, 1.5, 3]
end

# ==============================================================================
# MAIN COMPOSITION STRUCTURE
# ==============================================================================

# Initialize chaos variables (Lorenz attractor)
lorenz_x_val = 0.1
lorenz_y_val = 0.0
lorenz_z_val = 0.0
lorenz_dt = 0.01

# Fibonacci sequence for rhythm
fib_seq = fibonacci(10)
fib_rhythm = fib_seq.map { |f| [f / 8.0, 0.125].max }

# Golden ratio tempo
golden_tempo = 89
use_bpm golden_tempo

# Twelve-tone row
tone_row = twelve_tone_row

# Markov chain transition matrix for harmony
markov_matrix = [
  [0.4, 0.3, 0.2, 0.1],  # I -> I, ii, IV, V
  [0.1, 0.3, 0.3, 0.3],  # ii -> I, ii, IV, V
  [0.2, 0.2, 0.3, 0.3],  # IV -> I, ii, IV, V
  [0.5, 0.1, 0.2, 0.2]   # V -> I, ii, IV, V
]
current_chord = 0

# Matrix for harmonic transformation
harmony_matrix = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]

# ==============================================================================
# VOICE 1: FIBONACCI RHYTHM + MEDIEVAL ORGANUM (MIDI Channel 1)
# ==============================================================================

live_loop :fibonacci_organum do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 1
  
  with_fx :reverb, room: 0.8, mix: 0.4 do
    with_fx :lpf, cutoff: 100 do
      fib_rhythm.length.times do |i|
        duration = fib_rhythm[i]
        base_note = 60 + (fib_seq[i] % 12)
        
        # Medieval organum parallel fifths
        parallel = organum_parallel([base_note], 7)
        
        parallel[0].each do |note|
          midi note, velocity: 70 + rand_i(20), sustain: duration * 0.9
        end
        
        sleep duration
      end
    end
  end
  sleep 4
end

# ==============================================================================
# VOICE 2: LORENZ ATTRACTOR + CHAOS (MIDI Channel 2)
# ==============================================================================

live_loop :chaos_voice do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 2
  
  with_fx :echo, phase: 0.375, decay: 4 do
    with_fx :distortion, distort: 0.3 do
      16.times do
        # Update Lorenz attractor
        lorenz_x_val = lorenz_x(lorenz_x_val, lorenz_y_val, lorenz_z_val, lorenz_dt)
        lorenz_y_val = lorenz_y(lorenz_x_val, lorenz_y_val, lorenz_z_val, lorenz_dt)
        lorenz_z_val = lorenz_z(lorenz_x_val, lorenz_y_val, lorenz_z_val, lorenz_dt)
        
        # Map to pitch
        pitch = 48 + ((lorenz_x_val.abs * 2) % 36).round
        velocity = 60 + ((lorenz_z_val.abs * 4) % 60).round
        
        # Pitch bend for chaos effect
        midi_pitch_bend (lorenz_y_val * 1000).round, channel: 2
        
        midi pitch, velocity: velocity, sustain: 0.15
        sleep 0.125
      end
    end
  end
end

# ==============================================================================
# VOICE 3: TWELVE-TONE SERIALISM + BAROQUE FUGUE (MIDI Channel 3)
# ==============================================================================

live_loop :serial_fugue do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 3
  
  with_fx :reverb, room: 0.9, mix: 0.5 do
    # Prime form
    tone_row.each_with_index do |interval, idx|
      note = 48 + interval
      duration = [0.25, 0.5, 0.75, 1].choose
      midi note, velocity: 80, sustain: duration * 0.8
      sleep duration
    end
    
    sleep 0.5
    
    # Retrograde
    retrograde(tone_row).each_with_index do |interval, idx|
      note = 48 + interval
      duration = [0.25, 0.5, 0.75].choose
      midi note, velocity: 75, sustain: duration * 0.8
      sleep duration
    end
    
    sleep 0.5
    
    # Inversion
    inversion(tone_row, 6).each_with_index do |interval, idx|
      note = 48 + interval
      duration = [0.25, 0.5, 1].choose
      midi note, velocity: 70, sustain: duration * 0.8
      sleep duration
    end
    
    sleep 1
  end
end

# ==============================================================================
# VOICE 4: FUGUE SUBJECT + ANSWER (MIDI Channel 4)
# ==============================================================================

live_loop :baroque_fugue do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 4
  
  with_fx :reverb, room: 0.7 do
    # Fugue subject in C
    subject = fugue_subject(48)
    subject.each do |note|
      midi note, velocity: 85, sustain: 0.4
      sleep 0.5
    end
    
    sleep 1
    
    # Fugue answer in G (dominant)
    answer = fugue_answer(subject)
    answer.each do |note|
      midi note, velocity: 85, sustain: 0.4
      sleep 0.5
    end
    
    sleep 2
  end
end

# ==============================================================================
# VOICE 5: SPECTRAL HARMONY + PHYSICS (MIDI Channel 5)
# ==============================================================================

live_loop :spectral_physics do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 5
  
  with_fx :reverb, room: 0.95, mix: 0.6 do
    with_fx :echo, phase: 0.5, decay: 6 do
      # Harmonic series from C (32.7 Hz ≈ C1)
      fundamental = 36
      harmonics = harmonic_series(fundamental, 8)
      
      # Play harmonic series as chord
      harmonics[0..5].each do |harm_freq|
        # Convert frequency ratio to MIDI note
        midi_note = (fundamental + (Math.log2(harm_freq.to_f / harmonics[0]) * 12)).round
        midi midi_note, velocity: 60, sustain: 4
      end
      
      sleep 4
      
      # Ring modulation effect
      freq1 = 440  # A4
      freq2 = 660  # E5
      ring_freqs = ring_mod(freq1, freq2)
      
      ring_freqs.each do |freq|
        midi_note = (69 + 12 * Math.log2(freq / 440.0)).round
        midi midi_note, velocity: 70, sustain: 2
      end
      
      sleep 2
      
      # Doppler effect simulation (descending pitch)
      8.times do |i|
        velocity_factor = i * 10
        shifted_freq = doppler_shift(440, velocity_factor)
        midi_note = (69 + 12 * Math.log2(shifted_freq / 440.0)).round
        midi midi_note, velocity: 65, sustain: 0.3
        sleep 0.25
      end
      
      sleep 2
    end
  end
end

# ==============================================================================
# VOICE 6: MARKOV CHAIN HARMONY (MIDI Channel 6)
# ==============================================================================

live_loop :markov_harmony do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 6
  
  with_fx :reverb, room: 0.6 do
    16.times do
      # Chord roots based on Markov chain
      chord_roots = [60, 62, 65, 67]  # C, D, F, G
      root = chord_roots[current_chord]
      
      # Major triad
      chord = [root, root + 4, root + 7]
      
      chord.each do |note|
        midi note, velocity: 75, sustain: 1.8
      end
      
      sleep 2
      
      # Transition to next chord
      current_chord = markov_next_chord(current_chord, markov_matrix)
    end
  end
end

# ==============================================================================
# VOICE 7: MINIMALISM + PHASE SHIFTING (MIDI Channel 7)
# ==============================================================================

live_loop :minimalist_phase do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 7
  
  with_fx :reverb, room: 0.5, mix: 0.3 do
    pattern = [60, 64, 67, 64, 60, 67, 64, 60]
    
    32.times do |i|
      note = pattern[i % pattern.length]
      midi note, velocity: 70, sustain: 0.15
      
      # Gradual phase shift (Steve Reich style)
      sleep 0.125 + (i / 1000.0)
    end
  end
end

# ==============================================================================
# VOICE 8: POLYTEMPO + POLYRHYTHM (MIDI Channel 8)
# ==============================================================================

live_loop :polytempo_layer do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 8
  use_bpm golden_tempo * golden_ratio
  
  with_fx :reverb, room: 0.4 do
    # 5 against 7 polyrhythm
    in_thread do
      7.times do
        midi 72, velocity: 65, sustain: 0.1
        sleep 1.0 / 7
      end
    end
    
    5.times do
      midi 84, velocity: 65, sustain: 0.1
      sleep 1.0 / 5
    end
    
    sleep 1
  end
end

# ==============================================================================
# VOICE 9: POETRY RHYTHM + LITERARY STRUCTURE (MIDI Channel 9)
# ==============================================================================

live_loop :poetry_voice do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 9
  
  # Haiku syllable pattern: 5-7-5
  haiku_pattern = [5, 7, 5]
  haiku_rhythm = poetry_to_rhythm(haiku_pattern)
  
  with_fx :echo, phase: 0.75 do
    haiku_rhythm.each_with_index do |duration, idx|
      base = 55 + (idx * 5)
      
      # Create melodic phrase based on syllable count
      haiku_pattern[idx].times do |syllable|
        note = base + (syllable * 2)
        midi note, velocity: 60 + rand_i(20), sustain: duration / haiku_pattern[idx] * 0.8
        sleep duration / haiku_pattern[idx]
      end
    end
  end
  
  sleep 2
end

# ==============================================================================
# VOICE 10: VISUAL ART TO SOUND (MIDI Channel 10)
# ==============================================================================

live_loop :visual_art_sound do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 10
  
  with_fx :reverb, room: 0.7 do
    # Impressionist color palette (hues in degrees)
    impressionist_hues = [210, 180, 150, 30, 60, 90]  # Blues, yellows, greens
    
    impressionist_hues.each do |hue|
      note = color_to_pitch(hue, 60)
      midi note, velocity: 70, sustain: 1.5
      sleep 0.5
    end
    
    sleep 1
    
    # Art Deco geometric patterns (sharp, angular)
    art_deco_pattern = [0, 3, 7, 10, 12, 10, 7, 3]
    art_deco_pattern.each do |interval|
      midi 60 + interval, velocity: 85, sustain: 0.25
      sleep 0.25
    end
    
    sleep 2
  end
end

# ==============================================================================
# VOICE 11: DANCE TEMPO MODULATION (MIDI Channel 11)
# ==============================================================================

live_loop :dance_motion do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 11
  
  16.times do |t|
    # Contemporary dance tempo curve
    current_tempo = dance_tempo_curve(t, 20)
    use_bpm current_tempo
    
    # Simple melodic gesture
    [60, 62, 64, 65, 67].each do |note|
      midi note, velocity: 75, sustain: 0.2
      sleep 0.25
    end
  end
end

# ==============================================================================
# VOICE 12: COMEDY TIMING (MIDI Channel 12)
# ==============================================================================

live_loop :comedy_rhythm do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 12
  
  with_fx :distortion, distort: 0.2 do
    timings = comedy_timing
    
    timings.each_with_index do |duration, idx|
      # Unexpected pitches (like punchlines)
      note = [48, 52, 55, 60, 64, 67, 72, 76].choose
      velocity = (idx % 3 == 2) ? 95 : 70  # Accent on "punchlines"
      
      midi note, velocity: velocity, sustain: duration * 0.7
      sleep duration
    end
  end
  
  sleep 1
end

# ==============================================================================
# VOICE 13: COMPLEX NUMBERS TO PITCH (MIDI Channel 13)
# ==============================================================================

live_loop :complex_voice do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 13
  
  with_fx :reverb, room: 0.8 do
    8.times do
      # Generate complex number
      real = rrand(-2.0, 2.0)
      imag = rrand(-2.0, 2.0)
      
      pitch = complex_to_pitch(real, imag, 60)
      velocity = ((real.abs + imag.abs) * 30).round + 50
      
      midi pitch, velocity: [velocity, 127].min, sustain: 0.5
      sleep 0.5
    end
  end
end

# ==============================================================================
# VOICE 14: PARAMETRIC EQUATIONS (MIDI Channel 14)
# ==============================================================================

live_loop :parametric_melody do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 14
  
  with_fx :echo, phase: 0.375 do
    32.times do |t|
      # Parametric circle: x = cos(t), y = sin(t)
      theta = t * Math::PI / 8
      x = Math.cos(theta)
      y = Math.sin(theta)
      
      # Map to pitch
      pitch = 60 + (x * 6).round + (y * 6).round
      velocity = 70 + ((x.abs + y.abs) * 20).round
      
      midi pitch, velocity: velocity, sustain: 0.2
      sleep 0.25
    end
  end
end

# ==============================================================================
# VOICE 15: SONATA FORM (MIDI Channel 15)
# ==============================================================================

live_loop :sonata_structure do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 15
  
  with_fx :reverb, room: 0.7 do
    themes = sonata_theme(60)
    
    # Exposition: Theme A (tonic)
    themes[0].each do |note|
      midi note, velocity: 80, sustain: 0.4
      sleep 0.5
    end
    
    sleep 1
    
    # Exposition: Theme B (dominant)
    themes[1].each do |note|
      midi note, velocity: 80, sustain: 0.4
      sleep 0.5
    end
    
    sleep 1
    
    # Development: Fragmentation
    themes[0][0..4].each do |note|
      midi note, velocity: 85, sustain: 0.25
      sleep 0.375
      midi note + 7, velocity: 85, sustain: 0.25
      sleep 0.375
    end
    
    sleep 1
    
    # Recapitulation: Both themes in tonic
    (themes[0] + themes[0]).each do |note|
      midi note, velocity: 75, sustain: 0.4
      sleep 0.5
    end
    
    sleep 2
  end
end

# ==============================================================================
# VOICE 16: GRAPHIC NOTATION INTERPRETATION (MIDI Channel 16)
# ==============================================================================

live_loop :graphic_interpretation do
  use_real_time
  use_midi_defaults port: "midi_out_1", channel: 16
  
  with_fx :reverb, room: 0.95, mix: 0.7 do
    # Circles = arpeggios
    [60, 64, 67, 72, 76, 79, 84].each do |note|
      midi note, velocity: 50 + rand_i(30), sustain: 0.15
      sleep 0.125
    end
    
    sleep 0.5
    
    # Jagged lines = staccato clusters
    5.times do
      cluster = (60..72).to_a.sample(4)
      cluster.each do |note|
        midi note, velocity: 100, sustain: 0.05
      end
      sleep 0.25
    end
    
    sleep 1
    
    # Dots = sparse notes
    4.times do
      midi [48, 52, 55, 60].choose, velocity: 60, sustain: 2
      sleep rrand(1, 3)
    end
  end
end

# ==============================================================================
# MASTER CONTROL: ALEATORIC CONDUCTOR
# ==============================================================================

live_loop :aleatoric_conductor do
  # Randomly stop and start voices for aleatoric effect
  if one_in(10)
    stop_voice = [:fibonacci_organum, :chaos_voice, :serial_fugue, 
                  :minimalist_phase, :poetry_voice].choose
    puts "Stopping: #{stop_voice}"
    # Note: In practice, you'd implement actual voice control here
  end
  
  sleep 8
end

# ==============================================================================
# INFORMATION OUTPUT
# ==============================================================================

puts "="*80
puts "ALGORHYTHMIC SYNTHESIS - Multi-channel MIDI Performance Active"
puts "="*80
puts "16 Voices on MIDI Channels 1-16"
puts "Mathematical: Fibonacci, Lorenz, Complex Numbers, Parametric Equations"
puts "Physical: Doppler, Spectral Analysis, Harmonics, Ring Modulation"
puts "Historical: Organum, Fugue, Serialism, Minimalism, Sonata Form"
puts "Multi-Arts: Poetry, Visual Art, Dance, Comedy"
puts "="*80
