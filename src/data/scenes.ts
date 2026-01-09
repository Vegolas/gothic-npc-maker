/**
 * Scene definitions for 3D preview backgrounds
 * Dynamically discovered from GLB files in /public/assets/{g1|g2}/scenes/
 */

import { discoverScenes } from '../utils/assetDiscovery'
import type { GameVersion } from '../types/npc'

export interface Scene {
  id: string
  fileName: string
  path: string
}

/**
 * Get scenes for a specific game version
 * Always includes 'none' option for simple floor
 */
export function getScenes(gameVersion: GameVersion): Scene[] {
  const discoveredScenes = discoverScenes(gameVersion)

  // Always include the "none" option first
  return [
    { id: 'none', fileName: '', path: '' },
    ...discoveredScenes
  ]
}

/**
 * Get scene file path
 */
export function getScenePath(sceneId: string, gameVersion: GameVersion): string | null {
  if (sceneId === 'none') return null

  const scenes = discoverScenes(gameVersion)
  const scene = scenes.find(s => s.id === sceneId)

  return scene ? scene.path : null
}
