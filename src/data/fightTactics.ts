/**
 * Fight tactic definitions for Gothic NPC Creator
 * Based on Gothic 2 fight AI constants
 */

import type { FightTactic } from '../types/assets'

/**
 * Available fight tactics
 * These match the FAI_* constants in Daedalus scripts
 */
export const FIGHT_TACTICS: FightTactic[] = [
  { id: 'FAI_HUMAN_COWARD', name: 'Coward (Flees easily)' },
  { id: 'FAI_HUMAN_NORMAL', name: 'Normal' },
  { id: 'FAI_HUMAN_STRONG', name: 'Strong' },
  { id: 'FAI_HUMAN_MASTER', name: 'Master' },
  // Special tactics
  { id: 'FAI_HUMAN_RANGED', name: 'Ranged Preferred' },
  { id: 'FAI_HUMAN_MAGE', name: 'Mage' },
]

/**
 * Get fight tactic by ID
 */
export function getFightTacticById(id: string): FightTactic | undefined {
  return FIGHT_TACTICS.find(tactic => tactic.id === id)
}

/**
 * Get fight tactic name by ID
 */
export function getFightTacticName(id: string): string {
  return getFightTacticById(id)?.name ?? 'Unknown'
}
