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
  baseFileName: string      // Base name without variant (e.g., "HUM_BODY_NAKED")
  variantCount: number      // Number of V variants
  skinColorCount: number    // Number of C variants (typically 3: light, medium, dark)
}

export const BODY_TEXTURES: Record<string, BodyTextureConfig> = {
  'hum_body_Naked0': {
    gender: 'male',
    baseFileName: 'HUM_BODY_NAKED',
    variantCount: 5,
    skinColorCount: 3,
  },
  'hum_body_Babe0': {
    gender: 'female',
    baseFileName: 'HUM_BODY_NAKED',  // Female uses same base with different V numbers
    variantCount: 5,
    skinColorCount: 3,
  },
}

/**
 * Head texture configuration
 * Male heads use V0-V136, female heads use V137+
 */
export interface HeadTextureConfig {
  gender: Gender
  baseFileName: string
  variantStart: number      // Starting V number
  variantCount: number      // Number of variants
  skinColorCount: number
}

export const HEAD_TEXTURES: Record<string, HeadTextureConfig> = {
  // Male heads
  'Hum_Head_Pony': {
    gender: 'male',
    baseFileName: 'HUM_HEAD',
    variantStart: 0,
    variantCount: 20,
    skinColorCount: 3,
  },
  'Hum_Head_Bald': {
    gender: 'male',
    baseFileName: 'HUM_HEAD',
    variantStart: 0,
    variantCount: 20,
    skinColorCount: 3,
  },
  'Hum_Head_Fighter': {
    gender: 'male',
    baseFileName: 'HUM_HEAD',
    variantStart: 0,
    variantCount: 15,
    skinColorCount: 3,
  },
  'Hum_Head_Psionic': {
    gender: 'male',
    baseFileName: 'HUM_HEAD',
    variantStart: 0,
    variantCount: 18,
    skinColorCount: 3,
  },
  'Hum_Head_Thief': {
    gender: 'male',
    baseFileName: 'HUM_HEAD',
    variantStart: 0,
    variantCount: 10,
    skinColorCount: 3,
  },
  // Female heads (V137+)
  'Hum_Head_Babe': {
    gender: 'female',
    baseFileName: 'HUM_HEAD',
    variantStart: 137,
    variantCount: 10,
    skinColorCount: 3,
  },
}

/**
 * Generate body texture file name
 * @param bodyMesh - Body mesh ID
 * @param variant - Texture variant index
 * @param skinColor - Skin color index (0-2)
 * @returns Texture file name (e.g., "HUM_BODY_NAKED_V0_C0.png")
 */
export function getBodyTextureFileName(
  bodyMesh: string,
  variant: number,
  skinColor: number
): string {
  const config = BODY_TEXTURES[bodyMesh]
  if (!config) {
    // Fallback for unknown bodies (no extension - loader will try multiple)
    return `HUM_BODY_NAKED_V${variant}_C${skinColor}`
  }
  return `${config.baseFileName}_V${variant}_C${skinColor}`
}

/**
 * Generate head texture file name
 * @param headMesh - Head mesh ID
 * @param variant - Texture variant index (relative, will be offset for females)
 * @param skinColor - Skin color index (0-2)
 * @returns Texture file name (e.g., "HUM_HEAD_V0_C0.png" or "HUM_HEAD_V137_C0.png")
 */
export function getHeadTextureFileName(
  headMesh: string,
  variant: number,
  skinColor: number
): string {
  const config = HEAD_TEXTURES[headMesh]
  if (!config) {
    // Fallback (no extension - loader will try multiple)
    return `HUM_HEAD_V${variant}_C${skinColor}`
  }
  const actualVariant = config.variantStart + variant
  return `${config.baseFileName}_V${actualVariant}_C${skinColor}`
}

/**
 * Get the actual Daedalus texture index for a head
 * This is needed because female heads start at V137
 */
export function getHeadTextureIndex(headMesh: string, relativeVariant: number): number {
  const config = HEAD_TEXTURES[headMesh]
  if (!config) return relativeVariant
  return config.variantStart + relativeVariant
}

/**
 * Get available texture variants for a body mesh
 */
export function getBodyVariantCount(bodyMesh: string): number {
  return BODY_TEXTURES[bodyMesh]?.variantCount ?? 5
}

/**
 * Get available texture variants for a head mesh
 */
export function getHeadVariantCount(headMesh: string): number {
  return HEAD_TEXTURES[headMesh]?.variantCount ?? 10
}

/**
 * Get available skin colors (typically 0-2)
 */
export function getSkinColorCount(): number {
  return 3
}
