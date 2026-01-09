/**
 * Fight tactic definitions for Gothic NPC Creator
 * Dynamically discovered from /public/assets/{g1|g2}/data/tactics.txt
 */

import { discoverFightTactics } from '../utils/assetDiscovery'
import type { GameVersion } from '../types/npc'

/**
 * Get fight tactics for a specific game version
 * Returns raw tactic IDs discovered from the filesystem
 */
export async function getFightTactics(gameVersion: GameVersion): Promise<string[]> {
  return discoverFightTactics(gameVersion)
}
