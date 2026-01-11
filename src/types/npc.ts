/**
 * NPC Configuration Types for Gothic NPC Creator
 * These types define the complete configuration for an NPC
 */

export type Gender = 'male' | 'female'
export type NPCType = 'main' | 'ambient' | 'friend'
export type GameVersion = 'g1' | 'g2'

/**
 * Head offset configuration for 3D positioning
 */
export interface HeadOffsets {
  x: number
  y: number
  z: number
}

/**
 * Daily routine entry
 */
export interface RoutineEntry {
  id: string
  action: string
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
  waypoint: string
}

/**
 * ZEN world file information
 */
export interface ZenWorldFile {
  name: string
  path: string
  isValid: boolean
  errorMessage?: string
  fileSize?: number
}

/**
 * Complete NPC configuration used for both preview and script generation
 */
export interface NPCConfig {
  // Game version
  gameVersion: GameVersion  // Target game (g1 = Gothic 1, g2 = Gothic 2)

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
  bodyTexture: number       // Body texture variant index (legacy - for parametric naming)
  bodyTextureFile: string | null  // Direct texture filename (e.g., "BABE_BODY_V0.PNG")
  skinColor: number         // Skin color variant (0-2 typically, legacy)
  headMesh: string          // Head mesh name (e.g., "Hum_Head_Pony")
  headTexture: number       // Head texture variant index (legacy - for parametric naming)
  headTextureFile: string | null  // Direct texture filename (e.g., "BABE_HEAD_V0.PNG")
  teethTexture: number      // Teeth texture variant (usually 0 or 1)
  armorInstance: string | null  // Armor instance name or null for no armor
  fatness: number           // Body fatness modifier (-1 to 1)
  headOffsetX: number       // Head horizontal offset
  headOffsetY: number       // Head vertical offset
  headOffsetZ: number       // Head depth offset

  // Preview settings (app-only, not saved to script)
  previewScene: string      // Scene ID for 3D preview background

  // Attributes
  strength: number
  dexterity: number
  manaMax: number
  hitpointsMax: number

  // Combat & Routine
  fightTactic: string       // Fight tactic constant (e.g., "FAI_HUMAN_STRONG")
  dailyRoutine: RoutineEntry[]  // Daily routine entries
  waypoint: string          // Default waypoint for daily routine
  zenWorldFile: string | null   // Selected ZEN world file for waypoint reference
}

/**
 * Default NPC configuration values
 */
export const DEFAULT_NPC_CONFIG: NPCConfig = {
  gameVersion: 'g1',
  instanceName: 'NPC_001',
  displayName: 'New NPC',
  gender: 'male',
  npcType: 'ambient',
  guild: 'GIL_NONE',
  level: 1,
  voice: 0,
  id: 0,

  bodyMesh: 'HUM_BODY_NAKED0',
  bodyTexture: 0,
  bodyTextureFile: null,
  skinColor: 0,
  headMesh: 'HUM_HEAD_BALD',  // G1 default head
  headTexture: 0,
  headTextureFile: null,
  teethTexture: 0,
  armorInstance: null,
  fatness: 1,
  headOffsetX: 0,
  headOffsetY: 0.10,
  headOffsetZ: 0.02,

  previewScene: 'none',

  strength: 10,
  dexterity: 10,
  manaMax: 0,
  hitpointsMax: 40,

  fightTactic: 'FAI_HUMAN_NORMAL',
  waypoint: 'START',
  dailyRoutine: [],
  zenWorldFile: null,
}

/**
 * Default female NPC configuration values
 */
export const DEFAULT_FEMALE_CONFIG: Partial<NPCConfig> = {
  gender: 'female',
  bodyMesh: 'BABE',
  headMesh: 'HEAD',
  headTexture: 0,
  voice: 18,       // Female voice sets typically start at 18
}
