/**
 * Voice set definitions for Gothic NPC Creator
 * Based on Gothic 2 voice sets
 */

import type { VoiceSet } from '../types/assets'

/**
 * Male voice sets (0-17 typically)
 */
export const MALE_VOICE_SETS: VoiceSet[] = [
  { id: 0, name: 'Voice 0 (Default)', gender: 'male' },
  { id: 1, name: 'Voice 1', gender: 'male' },
  { id: 2, name: 'Voice 2', gender: 'male' },
  { id: 3, name: 'Voice 3', gender: 'male' },
  { id: 4, name: 'Voice 4', gender: 'male' },
  { id: 5, name: 'Voice 5', gender: 'male' },
  { id: 6, name: 'Voice 6', gender: 'male' },
  { id: 7, name: 'Voice 7', gender: 'male' },
  { id: 8, name: 'Voice 8', gender: 'male' },
  { id: 9, name: 'Voice 9', gender: 'male' },
  { id: 10, name: 'Voice 10', gender: 'male' },
  { id: 11, name: 'Voice 11', gender: 'male' },
  { id: 12, name: 'Voice 12', gender: 'male' },
  { id: 13, name: 'Voice 13', gender: 'male' },
  { id: 14, name: 'Voice 14', gender: 'male' },
  { id: 15, name: 'Voice 15 (Diego)', gender: 'male' },
  { id: 16, name: 'Voice 16 (Gorn)', gender: 'male' },
  { id: 17, name: 'Voice 17 (Milten)', gender: 'male' },
]

/**
 * Female voice sets (18+ typically)
 */
export const FEMALE_VOICE_SETS: VoiceSet[] = [
  { id: 18, name: 'Voice 18 (Female Default)', gender: 'female' },
  { id: 19, name: 'Voice 19', gender: 'female' },
  { id: 20, name: 'Voice 20', gender: 'female' },
]

/**
 * Get voice sets for a specific gender
 */
export function getVoiceSetsByGender(gender: 'male' | 'female'): VoiceSet[] {
  return gender === 'male' ? MALE_VOICE_SETS : FEMALE_VOICE_SETS
}

/**
 * Get default voice for a gender
 */
export function getDefaultVoice(gender: 'male' | 'female'): number {
  return gender === 'male' ? 0 : 18
}
