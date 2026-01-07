/**
 * Guild definitions for Gothic NPC Creator
 * Based on Gothic 2 guild constants
 */

import type { Guild } from '../types/assets'

/**
 * Available guilds
 * These match the GIL_* constants in Daedalus scripts
 */
export const GUILDS: Guild[] = [
  { id: 'GIL_NONE', name: 'None' },
  { id: 'GIL_HUMAN', name: 'Human (Generic)' },
  // Khorinis factions
  { id: 'GIL_PAL', name: 'Paladin' },
  { id: 'GIL_MIL', name: 'Militia' },
  { id: 'GIL_VLK', name: 'Citizen' },
  { id: 'GIL_KDF', name: 'Fire Mage' },
  { id: 'GIL_NOV', name: 'Novice' },
  // Valley of Mines factions
  { id: 'GIL_GRD', name: 'Guard (Old Camp)' },
  { id: 'GIL_SLD', name: 'Mercenary' },
  { id: 'GIL_KDW', name: 'Water Mage' },
  // Other factions
  { id: 'GIL_BAU', name: 'Farmer' },
  { id: 'GIL_BDT', name: 'Bandit' },
  { id: 'GIL_SFB', name: 'Pirate' },
  { id: 'GIL_DJG', name: 'Dragon Hunter' },
  // Special guilds
  { id: 'GIL_SEPERATOR_HUM', name: '--- Monsters ---' }, // UI separator
  { id: 'GIL_SKELETON', name: 'Skeleton' },
  { id: 'GIL_GOBBO', name: 'Goblin' },
  { id: 'GIL_ORC', name: 'Orc' },
  { id: 'GIL_DRAGON', name: 'Dragon' },
]

/**
 * Human guilds only (for NPC creation)
 */
export const HUMAN_GUILDS: Guild[] = GUILDS.filter(
  g => !g.id.startsWith('GIL_SEPERATOR') &&
       !['GIL_SKELETON', 'GIL_GOBBO', 'GIL_ORC', 'GIL_DRAGON'].includes(g.id)
)

/**
 * Get guild by ID
 */
export function getGuildById(id: string): Guild | undefined {
  return GUILDS.find(guild => guild.id === id)
}

/**
 * Get guild name by ID
 */
export function getGuildName(id: string): string {
  return getGuildById(id)?.name ?? 'Unknown'
}
