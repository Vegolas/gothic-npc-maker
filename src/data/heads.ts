/**
 * Head mesh definitions for Gothic NPC Creator
 * Based on Gothic 2 head meshes
 */

import type { HeadMesh } from '../types/assets'

/**
 * Available male head meshes
 * Note: textureVariants indicate how many texture variants exist for each head type
 */
export const MALE_HEADS: HeadMesh[] = [
  {
    id: 'Hum_Head_Bald',
    name: 'Bald',
    gender: 'male',
    fileName: 'HUM_HEAD_BALD.glb',
    textureVariants: 20,
  },
  {
    id: 'Hum_Head_Pony',
    name: 'Ponytail',
    gender: 'male',
    fileName: 'HUM_HEAD_PONY.glb',
    textureVariants: 20, // V0-V19 typically
  },
  {
    id: 'Hum_Head_Fighter',
    name: 'Fighter',
    gender: 'male',
    fileName: 'HUM_HEAD_FIGHTER.glb',
    textureVariants: 15,
  },
  {
    id: 'Hum_Head_Psionic',
    name: 'Psionic',
    gender: 'male',
    fileName: 'HUM_HEAD_PSIONIC.glb',
    textureVariants: 18,
  },
  {
    id: 'Hum_Head_Thief',
    name: 'Thief',
    gender: 'male',
    fileName: 'HUM_HEAD_THIEF.glb',
    textureVariants: 10,
  },
  // Additional male heads can be added here
]

/**
 * Available female head meshes
 * Female texture variants typically start at V137+
 */
export const FEMALE_HEADS: HeadMesh[] = [
  {
    id: 'Hum_Head_Babe',
    name: 'Standard',
    gender: 'female',
    fileName: 'HUM_HEAD_BABE.glb',
    textureVariants: 10, // Fewer variants typically
  },
  // Additional female heads can be added here
]

/**
 * Get all heads for a specific gender
 */
export function getHeadsByGender(gender: 'male' | 'female'): HeadMesh[] {
  return gender === 'male' ? MALE_HEADS : FEMALE_HEADS
}

/**
 * Get head by ID
 */
export function getHeadById(id: string): HeadMesh | undefined {
  return [...MALE_HEADS, ...FEMALE_HEADS].find(head => head.id === id)
}

/**
 * Get default head for a gender
 */
export function getDefaultHead(gender: 'male' | 'female'): HeadMesh {
  return gender === 'male' ? MALE_HEADS[0] : FEMALE_HEADS[0]
}
