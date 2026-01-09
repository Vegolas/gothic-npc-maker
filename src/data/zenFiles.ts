/**
 * ZEN world file discovery
 * Dynamically discovered from /public/assets/{g1|g2}/worlds/*.ZEN
 */

import { discoverZenFiles } from '../utils/assetDiscovery'
import type { GameVersion } from '../types/npc'

export interface ZenFile {
  fileName: string
  path: string
}

/**
 * Get available ZEN files for a specific game version
 */
export function getZenFiles(gameVersion: GameVersion): ZenFile[] {
  return discoverZenFiles(gameVersion)
}
