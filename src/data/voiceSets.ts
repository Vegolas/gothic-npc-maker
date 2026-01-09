/**
 * Voice set definitions for Gothic NPC Creator
 * Dynamically discovered from audio files in /public/assets/{g1|g2}/{male|female}/voices/
 */

import { discoverVoiceSets } from '../utils/assetDiscovery'
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

/**
 * Get default voice for a gender
 */
export function getDefaultVoice(gender: Gender): number {
  return gender === 'male' ? 1 : 18
}
