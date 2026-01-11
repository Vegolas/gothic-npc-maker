/**
 * Voice set definitions for Gothic NPC Creator
 * Dynamically discovered from audio files in /public/assets/{g1|g2}/{male|female}/voices/
 */

import { discoverVoiceSets } from '../utils/assetDiscovery'
import { getDefaultVoice } from '../config/constants'
import type { GameVersion, Gender } from '../types/npc'

export interface VoiceSet {
  id: number
  audioSamples: string[]
}

/**
 * Get voice sets for a specific gender and game version
 * Returns voice sets with their audio sample paths
 */
export function getVoiceSets(gameVersion: GameVersion, gender: Gender): VoiceSet[] {
  return discoverVoiceSets(gameVersion, gender)
}

// Re-export getDefaultVoice from central config for backward compatibility
export { getDefaultVoice }
