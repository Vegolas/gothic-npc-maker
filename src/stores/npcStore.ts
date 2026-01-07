import { create } from 'zustand'
import type { NPCConfig, Gender } from '../types/npc'
import { DEFAULT_NPC_CONFIG } from '../types/npc'
import { getDefaultBody } from '../data/bodies'
import { getDefaultHead } from '../data/heads'
import { getDefaultVoice } from '../data/voiceSets'

/**
 * NPC Store State and Actions
 */
interface NPCStore {
  // Current NPC configuration
  config: NPCConfig

  // Actions for updating individual fields
  setInstanceName: (name: string) => void
  setDisplayName: (name: string) => void
  setGender: (gender: Gender) => void
  setNPCType: (type: NPCConfig['npcType']) => void
  setGuild: (guild: string) => void
  setLevel: (level: number) => void
  setVoice: (voice: number) => void
  setId: (id: number) => void

  // Visual actions
  setBodyMesh: (mesh: string) => void
  setBodyTexture: (texture: number) => void
  setSkinColor: (color: number) => void
  setHeadMesh: (mesh: string) => void
  setHeadTexture: (texture: number) => void
  setTeethTexture: (texture: number) => void
  setArmorInstance: (armor: string | null) => void
  setFatness: (fatness: number) => void
  setHeadOffsetX: (offset: number) => void
  setHeadOffsetY: (offset: number) => void
  setHeadOffsetZ: (offset: number) => void

  // Attribute actions
  setStrength: (value: number) => void
  setDexterity: (value: number) => void
  setManaMax: (value: number) => void
  setHitpointsMax: (value: number) => void

  // Combat & Routine actions
  setFightTactic: (tactic: string) => void
  setWaypoint: (waypoint: string) => void

  // Bulk actions
  resetConfig: () => void
  loadConfig: (config: Partial<NPCConfig>) => void
}

/**
 * Create the NPC store with Zustand
 */
export const useNPCStore = create<NPCStore>((set) => ({
  // Initial state
  config: { ...DEFAULT_NPC_CONFIG },

  // Identity setters
  setInstanceName: (instanceName) =>
    set((state) => ({ config: { ...state.config, instanceName } })),

  setDisplayName: (displayName) =>
    set((state) => ({ config: { ...state.config, displayName } })),

  setGender: (gender) =>
    set((state) => {
      // When changing gender, update related fields to appropriate defaults
      const body = getDefaultBody(gender)
      const head = getDefaultHead(gender)
      const voice = getDefaultVoice(gender)

      return {
        config: {
          ...state.config,
          gender,
          bodyMesh: body.id,
          bodyTexture: 0,
          headMesh: head.id,
          headTexture: 0,
          voice,
        },
      }
    }),

  setNPCType: (npcType) =>
    set((state) => ({ config: { ...state.config, npcType } })),

  setGuild: (guild) =>
    set((state) => ({ config: { ...state.config, guild } })),

  setLevel: (level) =>
    set((state) => ({ config: { ...state.config, level: Math.max(1, level) } })),

  setVoice: (voice) =>
    set((state) => ({ config: { ...state.config, voice } })),

  setId: (id) =>
    set((state) => ({ config: { ...state.config, id: Math.max(0, id) } })),

  // Visual setters
  setBodyMesh: (bodyMesh) =>
    set((state) => ({
      config: { ...state.config, bodyMesh, bodyTexture: 0 },
    })),

  setBodyTexture: (bodyTexture) =>
    set((state) => ({ config: { ...state.config, bodyTexture } })),

  setSkinColor: (skinColor) =>
    set((state) => ({ config: { ...state.config, skinColor } })),

  setHeadMesh: (headMesh) =>
    set((state) => ({
      config: { ...state.config, headMesh, headTexture: 0 },
    })),

  setHeadTexture: (headTexture) =>
    set((state) => ({ config: { ...state.config, headTexture } })),

  setTeethTexture: (teethTexture) =>
    set((state) => ({ config: { ...state.config, teethTexture } })),

  setArmorInstance: (armorInstance) =>
    set((state) => ({ config: { ...state.config, armorInstance } })),

  setFatness: (fatness) =>
    set((state) => ({
      config: { ...state.config, fatness: Math.max(-1, Math.min(1, fatness)) },
    })),

  setHeadOffsetX: (headOffsetX) =>
    set((state) => ({
      config: { ...state.config, headOffsetX },
    })),

  setHeadOffsetY: (headOffsetY) =>
    set((state) => ({
      config: { ...state.config, headOffsetY },
    })),

  setHeadOffsetZ: (headOffsetZ) =>
    set((state) => ({
      config: { ...state.config, headOffsetZ },
    })),

  // Attribute setters
  setStrength: (strength) =>
    set((state) => ({
      config: { ...state.config, strength: Math.max(0, strength) },
    })),

  setDexterity: (dexterity) =>
    set((state) => ({
      config: { ...state.config, dexterity: Math.max(0, dexterity) },
    })),

  setManaMax: (manaMax) =>
    set((state) => ({
      config: { ...state.config, manaMax: Math.max(0, manaMax) },
    })),

  setHitpointsMax: (hitpointsMax) =>
    set((state) => ({
      config: { ...state.config, hitpointsMax: Math.max(1, hitpointsMax) },
    })),

  // Combat & Routine setters
  setFightTactic: (fightTactic) =>
    set((state) => ({ config: { ...state.config, fightTactic } })),

  setWaypoint: (waypoint) =>
    set((state) => ({ config: { ...state.config, waypoint } })),

  // Reset to defaults
  resetConfig: () =>
    set({ config: { ...DEFAULT_NPC_CONFIG } }),

  // Load partial config (useful for presets)
  loadConfig: (newConfig) =>
    set((state) => ({
      config: { ...state.config, ...newConfig },
    })),
}))

/**
 * Selector hooks for specific parts of the config
 * These prevent unnecessary re-renders
 */
export const useNPCGender = () => useNPCStore((state) => state.config.gender)
export const useNPCVisuals = () =>
  useNPCStore((state) => ({
    bodyMesh: state.config.bodyMesh,
    bodyTexture: state.config.bodyTexture,
    skinColor: state.config.skinColor,
    headMesh: state.config.headMesh,
    headTexture: state.config.headTexture,
    armorInstance: state.config.armorInstance,
    fatness: state.config.fatness,
    headOffsetX: state.config.headOffsetX,
    headOffsetY: state.config.headOffsetY,
    headOffsetZ: state.config.headOffsetZ,
  }))
