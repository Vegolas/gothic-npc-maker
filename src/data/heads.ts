/**
 * Head mesh definitions for Gothic NPC Creator
 * Based on available GLB files in the assets directory
 */

import type { HeadMesh } from '../types/assets'

/**
 * Available male head meshes for Gothic 1
 */
export const G1_MALE_HEADS: HeadMesh[] = [
  {
    id: 'BALD',
    name: 'Bald',
    gender: 'male',
    fileName: 'BALD.glb',
    textureVariants: 20,
  },
  {
    id: 'FAT_BALD',
    name: 'Fat Bald',
    gender: 'male',
    fileName: 'FAT_BALD.glb',
    textureVariants: 20,
  },
  {
    id: 'FIGHTER',
    name: 'Fighter',
    gender: 'male',
    fileName: 'FIGHTER.glb',
    textureVariants: 15,
  },
  {
    id: 'FLAIL',
    name: 'Flail',
    gender: 'male',
    fileName: 'FLAIL.glb',
    textureVariants: 15,
  },
  {
    id: 'FLEX',
    name: 'Flex',
    gender: 'male',
    fileName: 'FLEX.glb',
    textureVariants: 15,
  },
  {
    id: 'LUTTER',
    name: 'Lutter',
    gender: 'male',
    fileName: 'LUTTER.glb',
    textureVariants: 15,
  },
  {
    id: 'PFEIFFER',
    name: 'Pfeiffer',
    gender: 'male',
    fileName: 'PFEIFFER.glb',
    textureVariants: 15,
  },
  {
    id: 'PONY',
    name: 'Ponytail',
    gender: 'male',
    fileName: 'PONY.glb',
    textureVariants: 20,
  },
  {
    id: 'STD_PONY',
    name: 'Standard Ponytail',
    gender: 'male',
    fileName: 'STD_PONY.glb',
    textureVariants: 20,
  },
  {
    id: 'PSIONIC',
    name: 'Psionic',
    gender: 'male',
    fileName: 'PSIONIC.glb',
    textureVariants: 18,
  },
  {
    id: 'PYMONTE',
    name: 'Pymonte',
    gender: 'male',
    fileName: 'PYMONTE.glb',
    textureVariants: 15,
  },
  {
    id: 'THIEF',
    name: 'Thief',
    gender: 'male',
    fileName: 'THIEF.glb',
    textureVariants: 10,
  },
  {
    id: 'THOMAS',
    name: 'Thomas',
    gender: 'male',
    fileName: 'THOMAS.glb',
    textureVariants: 15,
  },
  {
    id: 'UNICORN',
    name: 'Unicorn',
    gender: 'male',
    fileName: 'UNICORN.glb',
    textureVariants: 15,
  },
]

/**
 * Available male head meshes for Gothic 2
 */
export const G2_MALE_HEADS: HeadMesh[] = [
  {
    id: 'Hum_Head_Bald',
    name: 'Bald',
    gender: 'male',
    fileName: 'HUM_HEAD_BALD.glb',
    textureVariants: 20,
  },
]

/**
 * Available female head meshes for Gothic 1
 */
export const G1_FEMALE_HEADS: HeadMesh[] = [
  {
    id: 'HEAD',
    name: 'Female Head',
    gender: 'female',
    fileName: 'HEAD.glb',
    textureVariants: 10,
  },
]

/**
 * Available female head meshes for Gothic 2
 */
export const G2_FEMALE_HEADS: HeadMesh[] = [
  // No female heads available for G2 yet
]

/**
 * Get all heads for a specific gender and game version
 */
export function getHeadsByGender(gender: 'male' | 'female', gameVersion: 'g1' | 'g2' = 'g1'): HeadMesh[] {
  if (gameVersion === 'g1') {
    return gender === 'male' ? G1_MALE_HEADS : G1_FEMALE_HEADS
  } else {
    return gender === 'male' ? G2_MALE_HEADS : G2_FEMALE_HEADS
  }
}

/**
 * Get head by ID
 */
export function getHeadById(id: string): HeadMesh | undefined {
  return [...G1_MALE_HEADS, ...G2_MALE_HEADS, ...G1_FEMALE_HEADS, ...G2_FEMALE_HEADS].find(head => head.id === id)
}

/**
 * Get default head for a gender and game version
 */
export function getDefaultHead(gender: 'male' | 'female', gameVersion: 'g1' | 'g2' = 'g1'): HeadMesh {
  const heads = getHeadsByGender(gender, gameVersion)
  return heads[0] || G1_MALE_HEADS[0] // Fallback to first G1 male head
}
