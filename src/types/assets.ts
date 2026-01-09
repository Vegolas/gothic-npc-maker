/**
 * Asset Definition Types for Gothic NPC Creator
 * These types define the available meshes, textures, and other assets
 */

import type { Gender } from './npc'

/**
 * Body mesh definition
 */
export interface BodyMesh {
  id: string              // Internal mesh ID (e.g., "hum_body_Naked0")
  name: string            // Display name (e.g., "Male Standard")
  gender: Gender
  fileName: string        // GLTF file name (e.g., "HUM_BODY_NAKED0.glb")
  textureVariants: number // Number of available texture variants
}

/**
 * Head mesh definition
 */
export interface HeadMesh {
  id: string              // Internal mesh ID (e.g., "Hum_Head_Pony")
  name: string            // Display name (e.g., "Ponytail")
  gender: Gender
  fileName: string        // GLTF file name
  textureVariants: number // Number of available texture variants
}

/**
 * Armor definition
 */
export interface Armor {
  id: string | null       // Armor instance name or null for no armor
  name: string            // Display name
  fileName: string | null // GLTF file name or null
  guild?: string          // Associated guild (for filtering)
}

/**
 * Guild definition
 */
export interface Guild {
  id: string              // Daedalus constant (e.g., "GIL_GRD")
  name: string            // Display name (e.g., "Guard")
}

/**
 * Voice set definition
 */
export interface VoiceSet {
  id: number              // Voice set index
  name: string            // Display name
  gender: Gender
  audioSamples?: string[] // Array of audio file paths for preview
}

/**
 * Fight tactic definition
 */
export interface FightTactic {
  id: string              // Daedalus constant (e.g., "FAI_HUMAN_STRONG")
  name: string            // Display name
}

/**
 * Texture variant mapping
 * Maps variant indices to actual texture file names
 */
export interface TextureMapping {
  meshId: string          // The mesh this texture applies to
  gender: Gender
  variants: TextureVariant[]
}

export interface TextureVariant {
  index: number           // Variant index used in Daedalus
  fileName: string        // Texture file name (e.g., "HUM_BODY_NAKED_V0_C0.png")
  skinColors?: number[]   // Available skin color variants for this texture
}
