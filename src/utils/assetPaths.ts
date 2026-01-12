/**
 * Asset path utilities for Gothic NPC Creator
 * Resolves asset paths based on gender and asset type
 */

import type { Gender, GameVersion } from '../types/npc'
import { discoverBodies, discoverHeads, discoverArmors, findBodyTexture, findBodyTextures, findHeadTexture } from './assetDiscovery'

/**
 * Get the path to a body mesh file
 * Uses the pre-discovered path from assetDiscovery (which includes base URL)
 */
export function getBodyMeshPath(meshId: string, gender: Gender, gameVersion: GameVersion): string {
  const bodies = discoverBodies(gameVersion, gender)
  const body = bodies.find(b => b.id === meshId)

  if (!body) {
    console.warn(`Body mesh not found: ${meshId}`)
    return ''
  }

  return body.path
}

/**
 * Get the path to a head mesh file
 * Uses the pre-discovered path from assetDiscovery (which includes base URL)
 */
export function getHeadMeshPath(meshId: string, gender: Gender, gameVersion: GameVersion): string {
  const heads = discoverHeads(gameVersion, gender)
  const head = heads.find(h => h.id === meshId)

  if (!head) {
    console.warn(`Head mesh not found: ${meshId}`)
    return ''
  }

  return head.path
}

/**
 * Get the path to an armor mesh file
 * Uses the pre-discovered path from assetDiscovery (which includes base URL)
 */
export function getArmorMeshPath(armorId: string, gameVersion: GameVersion): string {
  const armors = discoverArmors(gameVersion)
  const armor = armors.find(a => a.id === armorId)

  if (!armor) {
    console.warn(`Armor mesh not found: ${armorId}`)
    return ''
  }

  return armor.path
}

/**
 * Get the path to a body texture file (dynamically discovered)
 */
export function getBodyTexturePath(
  meshId: string,
  variant: number,
  skinColor: number,
  gender: Gender,
  gameVersion: GameVersion
): string {
  const texturePath = findBodyTexture(meshId, variant, skinColor, gameVersion, gender)
  
  if (texturePath) {
    return texturePath
  }
  
  // Fallback: try to construct path (for backward compatibility)
  console.warn(`Body texture not found for ${meshId} V${variant} C${skinColor}, using fallback`)
  return ''
}

/**
 * Get all possible paths to body texture files (for trying multiple base names)
 */
export function getBodyTexturePaths(
  meshId: string,
  variant: number,
  skinColor: number,
  gender: Gender,
  gameVersion: GameVersion
): string[] {
  const texturePaths = findBodyTextures(meshId, variant, skinColor, gameVersion, gender)
  
  if (texturePaths.length > 0) {
    return texturePaths
  }
  
  // Fallback: empty array
  console.warn(`No body textures found for ${meshId} V${variant} C${skinColor}`)
  return []
}

/**
 * Get the path to a head texture file (dynamically discovered)
 */
export function getHeadTexturePath(
  meshId: string,
  variant: number,
  skinColor: number,
  gender: Gender,
  gameVersion: GameVersion
): string {
  const texturePath = findHeadTexture(meshId, variant, skinColor, gameVersion, gender)
  
  if (texturePath) {
    return texturePath
  }
  
  // Fallback: try to construct path (for backward compatibility)
  console.warn(`Head texture not found for ${meshId} V${variant} C${skinColor}, using fallback`)
  return ''
}

/**
 * Check if an asset file exists (async)
 * Useful for graceful fallback handling
 */
export async function assetExists(path: string): Promise<boolean> {
  try {
    const response = await fetch(path, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}
