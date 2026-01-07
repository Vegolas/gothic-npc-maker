/**
 * Body mesh definitions for Gothic NPC Creator
 * Based on Gothic 2 body meshes
 */

import type { BodyMesh } from '../types/assets'

/**
 * Available male body meshes
 */
export const MALE_BODIES: BodyMesh[] = [
  {
    id: 'hum_body_Naked0',
    name: 'Standard',
    gender: 'male',
    fileName: 'HUM_BODY_NAKED0.glb',
    textureVariants: 5, // V0-V4 typically
  },
  // Additional male bodies can be added here:
  // { id: 'hum_body_Naked1', name: 'Muscular', gender: 'male', fileName: 'HUM_BODY_NAKED1.glb', textureVariants: 5 },
  // { id: 'hum_body_Naked2', name: 'Slim', gender: 'male', fileName: 'HUM_BODY_NAKED2.glb', textureVariants: 5 },
]

/**
 * Available female body meshes
 */
export const FEMALE_BODIES: BodyMesh[] = [
  {
    id: 'hum_body_Babe0',
    name: 'Standard',
    gender: 'female',
    fileName: 'HUM_BODY_BABE0.glb',
    textureVariants: 5,
  },
  // Additional female bodies can be added here
]

/**
 * Get all bodies for a specific gender
 */
export function getBodiesByGender(gender: 'male' | 'female'): BodyMesh[] {
  return gender === 'male' ? MALE_BODIES : FEMALE_BODIES
}

/**
 * Get body by ID
 */
export function getBodyById(id: string): BodyMesh | undefined {
  return [...MALE_BODIES, ...FEMALE_BODIES].find(body => body.id === id)
}

/**
 * Get default body for a gender
 */
export function getDefaultBody(gender: 'male' | 'female'): BodyMesh {
  return gender === 'male' ? MALE_BODIES[0] : FEMALE_BODIES[0]
}
