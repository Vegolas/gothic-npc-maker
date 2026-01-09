/**
 * Guild definitions for Gothic NPC Creator
 * Dynamically discovered from /public/assets/{g1|g2}/data/guilds.txt
 */

import { discoverGuilds } from '../utils/assetDiscovery'
import type { GameVersion } from '../types/npc'

/**
 * Get guilds for a specific game version
 * Returns raw guild IDs discovered from the filesystem
 */
export async function getGuilds(gameVersion: GameVersion): Promise<string[]> {
  return discoverGuilds(gameVersion)
}
