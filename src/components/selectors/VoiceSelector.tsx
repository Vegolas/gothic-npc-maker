import { useNPCStore } from '../../stores/npcStore'
import { getVoiceSets } from '../../data/voiceSets'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select-new'
import { Volume2, Play } from 'lucide-react'
import { useState, useRef } from 'react'

/**
 * Voice selector with audio preview
 * Allows user to listen to voice samples before selecting
 */
export function VoiceSelector() {
  const config = useNPCStore((state) => state.config)
  const setVoice = useNPCStore((state) => state.setVoice)
  const voiceSets = getVoiceSets(config.gameVersion, config.gender)
  
  const [playingVoice, setPlayingVoice] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const selectedVoice = voiceSets.find(v => v.id === config.voice)

  const playVoiceSample = (voiceId: number, sampleIndex: number = 0) => {
    const voice = voiceSets.find(v => v.id === voiceId)
    if (!voice?.audioSamples || !voice.audioSamples[sampleIndex]) return

    // Stop current playback
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    // Create and play new audio
    const audio = new Audio(voice.audioSamples[sampleIndex])
    audioRef.current = audio
    setPlayingVoice(voiceId)

    audio.play().catch(err => {
      console.error('Failed to play audio:', err)
      setPlayingVoice(null)
    })

    audio.onended = () => {
      setPlayingVoice(null)
    }
  }

  return (
    <div className="space-y-2">
      <Select value={String(config.voice)} onValueChange={(value) => setVoice(parseInt(value))}>
        <SelectTrigger label="Voice Set">
          <SelectValue placeholder="Select voice" />
        </SelectTrigger>
        <SelectContent>
          {voiceSets.map((voice) => (
            <SelectItem key={voice.id} value={String(voice.id)}>
              <div className="flex items-center justify-between w-full">
                <span>Voice {voice.id}</span>
                {voice.audioSamples && voice.audioSamples.length > 0 && (
                  <Volume2 className="w-3 h-3 text-ember/60 ml-2" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Voice preview buttons */}
      {selectedVoice?.audioSamples && selectedVoice.audioSamples.length > 0 && (
        <div className="flex gap-2 mt-2">
          {selectedVoice.audioSamples.map((_, index) => (
            <button
              key={index}
              onClick={() => playVoiceSample(selectedVoice.id, index)}
              disabled={playingVoice === selectedVoice.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs
                bg-stone/40 border border-stone/50 text-text-dim
                hover:bg-stone/60 hover:text-ember hover:border-ember/50
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-150"
            >
              <Play className="w-3 h-3" />
              <span>Sample {index + 1}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
