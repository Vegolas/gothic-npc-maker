/**
 * Texture variant mappings for Gothic NPC Creator
 * Maps Daedalus texture indices to actual file names
 */

import type { Gender } from '../types/npc'

/**
 * Body texture configuration
 * Gothic uses V{n}_C{skinColor} naming convention
 * V = variant, C = skin color
 */
export interface BodyTextureConfig {
  gender: Gender
  baseFileName: string[]    // Base names without variant (e.g., ["HUM_BODY_NAKED"])
  variantCount: number      // Number of V variants
  skinColorCount: number    // Number of C variants (typically 3: light, medium, dark)
}

export const BODY_TEXTURES: Record<string, BodyTextureConfig> = {
  'hum_body_Naked0': {
    gender: 'male',
    baseFileName: ['HUM_BODY_NAKED'],
    variantCount: 5,
    skinColorCount: 3,
  },
  'hum_body_Babe0': {
    gender: 'female',
    baseFileName: ['HUM_BODY_NAKED'],
    variantCount: 5,
    skinColorCount: 3,
  },
}

/**
 * Generate body texture file name
 * @param bodyMesh - Body mesh ID
 * @param variant - Texture variant index
 * @param skinColor - Skin color index (0-2)
 * @returns Array of texture file names to try (e.g., ["HUM_BODY_NAKED_V0_C0"])
 */
export function getBodyTextureFileName(
  bodyMesh: string,
  variant: number,
  skinColor: number
): string[] {
  const config = BODY_TEXTURES[bodyMesh]
  if (!config) {
    // Fallback for unknown bodies (no extension - loader will try multiple)
    return [`HUM_BODY_NAKED_V${variant}_C${skinColor}`]
  }
  return config.baseFileName.map(base => `${base}_V${variant}_C${skinColor}`)
}

/**
 * Get available texture variants for a body mesh
 */
export function getBodyVariantCount(bodyMesh: string): number {
  return BODY_TEXTURES[bodyMesh]?.variantCount ?? 5
}

/**
 * Get available skin colors (typically 0-2)
 */
export function getSkinColorCount(): number {
  return 3
}
