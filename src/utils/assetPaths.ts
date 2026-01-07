/**
 * Asset path utilities for Gothic NPC Creator
 * Resolves asset paths based on gender and asset type
 */

import type { Gender } from '../types/npc'
import { getBodyById } from '../data/bodies'
import { getHeadById } from '../data/heads'
import { getArmorById } from '../data/armors'
import { getBodyTextureFileName, getHeadTextureFileName } from '../data/textures'

// Base path for all assets
const ASSETS_BASE = '/assets'

/**
 * Get the path to a body mesh file
 */
export function getBodyMeshPath(meshId: string, gender: Gender): string {
  const body = getBodyById(meshId)
  if (!body) {
    console.warn(`Body mesh not found: ${meshId}`)
    return ''
  }
  return `${ASSETS_BASE}/${gender}/bodies/${body.fileName}`
}

/**
 * Get the path to a head mesh file
 */
export function getHeadMeshPath(meshId: string, gender: Gender): string {
  const head = getHeadById(meshId)
  if (!head) {
    console.warn(`Head mesh not found: ${meshId}`)
    return ''
  }
  return `${ASSETS_BASE}/${gender}/heads/${head.fileName}`
}

/**
 * Get the path to an armor mesh file
 */
export function getArmorMeshPath(armorId: string): string {
  const armor = getArmorById(armorId)
  if (!armor || !armor.fileName) {
    console.warn(`Armor mesh not found: ${armorId}`)
    return ''
  }
  return `${ASSETS_BASE}/armors/${armor.fileName}`
}

/**
 * Get the path to a body texture file
 */
export function getBodyTexturePath(
  meshId: string,
  variant: number,
  skinColor: number,
  gender: Gender
): string {
  const fileName = getBodyTextureFileName(meshId, variant, skinColor)
  return `${ASSETS_BASE}/${gender}/textures/body/${fileName}`
}

/**
 * Get the path to a head texture file
 */
export function getHeadTexturePath(
  meshId: string,
  variant: number,
  skinColor: number,
  gender: Gender
): string {
  const fileName = getHeadTextureFileName(meshId, variant, skinColor)
  return `${ASSETS_BASE}/${gender}/textures/head/${fileName}`
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
