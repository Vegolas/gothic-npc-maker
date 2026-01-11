/**
 * Application constants for Gothic NPC Creator
 * Centralizes all hardcoded values that were previously scattered across the codebase
 */

import type { Gender, GameVersion } from '../types/npc'

/**
 * Head offset configurations for different game/gender combinations
 */
export const HEAD_OFFSETS = {
  default: { x: 0, y: 0.10, z: 0.02 },
  g1_female: { x: 0.01, y: 0.01, z: -0.10 },
} as const

/**
 * Get head offsets for a specific game version and gender
 */
export function getHeadOffsets(gameVersion: GameVersion, gender: Gender) {
  if (gameVersion === 'g1' && gender === 'female') {
    return HEAD_OFFSETS.g1_female
  }
  return HEAD_OFFSETS.default
}

/**
 * Attribute slider configurations
 */
export const ATTRIBUTE_RANGES = {
  strength: { min: 0, max: 200, step: 5 },
  dexterity: { min: 0, max: 200, step: 5 },
  mana: { min: 0, max: 500, step: 10 },
  hitpoints: { min: 1, max: 1000, step: 10 },
} as const

/**
 * Fatness slider configuration
 */
export const FATNESS_RANGE = {
  min: 0.8,
  max: 1.2,
  step: 0.02,
  default: 1,
} as const

/**
 * Default voice IDs for each gender
 */
export const DEFAULT_VOICES = {
  male: 1,
  female: 18,
} as const

/**
 * Get default voice for a gender
 */
export function getDefaultVoice(gender: Gender): number {
  return DEFAULT_VOICES[gender]
}

/**
 * Default texture indices
 * Index 1 is used for females to avoid nude textures at index 0
 */
export const DEFAULT_TEXTURE_INDICES = {
  male: 0,
  female: 1,
} as const

/**
 * NPC type options for the identity editor
 */
export const NPC_TYPES = ['main', 'ambient', 'friend'] as const
