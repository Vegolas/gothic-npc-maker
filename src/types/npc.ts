/**
 * NPC Configuration Types for Gothic NPC Creator
 * These types define the complete configuration for an NPC
 */

export type Gender = 'male' | 'female'
export type NPCType = 'main' | 'ambient' | 'friend'

/**
 * Complete NPC configuration used for both preview and script generation
 */
export interface NPCConfig {
  // Identity
  instanceName: string      // Daedalus instance name (e.g., "GRD_200_Guard")
  displayName: string       // In-game display name (e.g., "Guard")
  gender: Gender
  npcType: NPCType
  guild: string             // Guild constant (e.g., "GIL_GRD")
  level: number
  voice: number             // Voice set index (0-17 typically)
  id: number                // Unique NPC ID

  // Visuals
  bodyMesh: string          // Body mesh name (e.g., "hum_body_Naked0")
  bodyTexture: number       // Body texture variant index
  skinColor: number         // Skin color variant (0-2 typically)
  headMesh: string          // Head mesh name (e.g., "Hum_Head_Pony")
  headTexture: number       // Head texture variant index
  teethTexture: number      // Teeth texture variant (usually 0 or 1)
  armorInstance: string | null  // Armor instance name or null for no armor
  fatness: number           // Body fatness modifier (-1 to 1)
  headOffsetX: number       // Head horizontal offset
  headOffsetY: number       // Head vertical offset
  headOffsetZ: number       // Head depth offset

  // Attributes
  strength: number
  dexterity: number
  manaMax: number
  hitpointsMax: number

  // Combat & Routine
  fightTactic: string       // Fight tactic constant (e.g., "FAI_HUMAN_STRONG")
  waypoint: string          // Default waypoint for daily routine
}

/**
 * Default NPC configuration values
 */
export const DEFAULT_NPC_CONFIG: NPCConfig = {
  instanceName: 'NPC_001',
  displayName: 'New NPC',
  gender: 'male',
  npcType: 'ambient',
  guild: 'GIL_NONE',
  level: 1,
  voice: 0,
  id: 0,

  bodyMesh: 'hum_body_Naked0',
  bodyTexture: 0,
  skinColor: 0,
  headMesh: 'Hum_Head_Bald',
  headTexture: 0,
  teethTexture: 0,
  armorInstance: null,
  fatness: 0,
  headOffsetX: 0,
  headOffsetY: 0.10,
  headOffsetZ: 0.02,

  strength: 10,
  dexterity: 10,
  manaMax: 0,
  hitpointsMax: 40,

  fightTactic: 'FAI_HUMAN_NORMAL',
  waypoint: 'START',
}

/**
 * Default female NPC configuration values
 */
export const DEFAULT_FEMALE_CONFIG: Partial<NPCConfig> = {
  gender: 'female',
  bodyMesh: 'hum_body_Babe0',
  headMesh: 'Hum_Head_Babe',
  headTexture: 0,  // Will map to V137 in texture system
  voice: 18,       // Female voice sets typically start at 18
}
