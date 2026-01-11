import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { NPCConfig, Gender, GameVersion, RoutineEntry } from '../types/npc'
import { DEFAULT_NPC_CONFIG } from '../types/npc'
import { discoverBodies, discoverHeads, discoverBodyTextureFiles, discoverHeadTextureFiles, discoverHeadVariantsForSkinColor } from '../utils/assetDiscovery'
import { getDefaultVoice, getHeadOffsets, FATNESS_RANGE, DEFAULT_TEXTURE_INDICES } from '../config/constants'

/**
 * NPC Store State and Actions
 */
interface NPCStore {
  // Current NPC configuration
  config: NPCConfig

  // Game version action
  setGameVersion: (version: GameVersion) => void

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
  setBodyTextureFile: (file: string | null) => void
  setSkinColor: (color: number) => void
  setHeadMesh: (mesh: string) => void
  setHeadTexture: (texture: number) => void
  setHeadTextureFile: (file: string | null) => void
  setTeethTexture: (texture: number) => void
  setArmorInstance: (armor: string | null) => void
  setFatness: (fatness: number) => void
  setHeadOffsetX: (offset: number) => void
  setHeadOffsetY: (offset: number) => void
  setHeadOffsetZ: (offset: number) => void

  // Preview settings
  setPreviewScene: (sceneId: string) => void

  // Attribute actions
  setStrength: (value: number) => void
  setDexterity: (value: number) => void
  setManaMax: (value: number) => void
  setHitpointsMax: (value: number) => void

  // Combat & Routine actions
  setFightTactic: (tactic: string) => void
  setWaypoint: (waypoint: string) => void
  setDailyRoutine: (routine: RoutineEntry[]) => void
  setZenWorldFile: (file: string | null) => void

  // Bulk actions
  resetConfig: () => void
  loadConfig: (config: Partial<NPCConfig>) => void
}

/**
 * Create the NPC store with Zustand and localStorage persistence
 */
export const useNPCStore = create<NPCStore>()(
  persist(
    (set) => ({
      // Initial state
      config: { ...DEFAULT_NPC_CONFIG },

      // Game version setter
      setGameVersion: (gameVersion) =>
        set((state) => {
          // Get head offsets based on gender and game version from config
          const offsets = getHeadOffsets(gameVersion, state.config.gender)

          return {
            config: {
              ...state.config,
              gameVersion,
              headOffsetX: offsets.x,
              headOffsetY: offsets.y,
              headOffsetZ: offsets.z,
            }
          }
        }),

  // Identity setters
  setInstanceName: (instanceName) =>
    set((state) => ({ config: { ...state.config, instanceName } })),

  setDisplayName: (displayName) =>
    set((state) => ({ config: { ...state.config, displayName } })),

  setGender: (gender) =>
    set((state) => {
      // When changing gender, update related fields to appropriate defaults
      const bodies = discoverBodies(state.config.gameVersion, gender)
      const heads = discoverHeads(state.config.gameVersion, gender)
      const voice = getDefaultVoice(gender)

      const newBodyMesh = bodies[0]?.id || ''
      const newHeadMesh = heads[0]?.id || ''

      const isG1Female = state.config.gameVersion === 'g1' && gender === 'female'

      // For G1 Female: use file-based textures
      // For others: use variant-based (textureFile should be null)
      let bodyTextureFile = null
      let headTextureFile = null
      const defaultTextureIndex = DEFAULT_TEXTURE_INDICES[gender]

      if (isG1Female) {
        const bodyTextureFiles = discoverBodyTextureFiles(newBodyMesh, state.config.gameVersion, gender)
        const headTextureFiles = discoverHeadTextureFiles(newHeadMesh, state.config.gameVersion, gender)
        bodyTextureFile = bodyTextureFiles[defaultTextureIndex] || bodyTextureFiles[0] || null
        headTextureFile = headTextureFiles[defaultTextureIndex] || headTextureFiles[0] || null
      }

      // Get head offsets from config
      const offsets = getHeadOffsets(state.config.gameVersion, gender)

      return {
        config: {
          ...state.config,
          gender,
          bodyMesh: newBodyMesh,
          bodyTexture: defaultTextureIndex,
          bodyTextureFile,
          headMesh: newHeadMesh,
          headTexture: defaultTextureIndex,
          headTextureFile,
          armorInstance: isG1Female ? null : state.config.armorInstance, // Clear armor for G1 Female
          voice,
          headOffsetX: offsets.x,
          headOffsetY: offsets.y,
          headOffsetZ: offsets.z,
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
    set((state) => {
      // Initialize texture file to first available
      const textureFiles = discoverBodyTextureFiles(bodyMesh, state.config.gameVersion, state.config.gender)
      const defaultIndex = DEFAULT_TEXTURE_INDICES[state.config.gender]
      return {
        config: {
          ...state.config,
          bodyMesh,
          bodyTexture: defaultIndex,
          bodyTextureFile: textureFiles[defaultIndex] || textureFiles[0] || null,
        },
      }
    }),

  setBodyTexture: (bodyTexture) =>
    set((state) => ({ config: { ...state.config, bodyTexture } })),

  setBodyTextureFile: (bodyTextureFile) =>
    set((state) => ({ config: { ...state.config, bodyTextureFile } })),

  setSkinColor: (skinColor) =>
    set((state) => ({ config: { ...state.config, skinColor } })),

  setHeadMesh: (headMesh) =>
    set((state) => {
      const isG1Female = state.config.gameVersion === 'g1' && state.config.gender === 'female'

      if (isG1Female) {
        // G1 Female: file-based selection
        const textureFiles = discoverHeadTextureFiles(headMesh, state.config.gameVersion, state.config.gender)
        const defaultIndex = DEFAULT_TEXTURE_INDICES[state.config.gender]
        return {
          config: {
            ...state.config,
            headMesh,
            headTexture: defaultIndex,
            headTextureFile: textureFiles[defaultIndex] || textureFiles[0] || null,
          },
        }
      } else {
        // Others: variant-based selection - keep current variant if valid, otherwise use first available
        const availableVariants = discoverHeadVariantsForSkinColor(
          headMesh,
          state.config.skinColor,
          state.config.gameVersion,
          state.config.gender
        )

        // Keep current variant if it exists for the new head, otherwise use first available
        const currentVariant = state.config.headTexture
        const newVariant = availableVariants.includes(currentVariant)
          ? currentVariant
          : (availableVariants.length > 0 ? availableVariants[0] : 0)

        return {
          config: {
            ...state.config,
            headMesh,
            headTexture: newVariant,
            headTextureFile: null,
          },
        }
      }
    }),

  setHeadTexture: (headTexture) =>
    set((state) => ({ config: { ...state.config, headTexture } })),

  setHeadTextureFile: (headTextureFile) =>
    set((state) => ({ config: { ...state.config, headTextureFile } })),

  setTeethTexture: (teethTexture) =>
    set((state) => ({ config: { ...state.config, teethTexture } })),

  setArmorInstance: (armorInstance) =>
    set((state) => ({ config: { ...state.config, armorInstance } })),

  setFatness: (fatness) =>
    set((state) => ({
      config: { ...state.config, fatness: Math.max(FATNESS_RANGE.min, Math.min(FATNESS_RANGE.max, fatness)) },
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

  // Preview settings
  setPreviewScene: (previewScene) =>
    set((state) => ({
      config: { ...state.config, previewScene },
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

  setDailyRoutine: (dailyRoutine) =>
    set((state) => ({ config: { ...state.config, dailyRoutine } })),

  setZenWorldFile: (zenWorldFile) =>
    set((state) => ({ config: { ...state.config, zenWorldFile } })),

  // Reset to defaults
  resetConfig: () =>
    set({ config: { ...DEFAULT_NPC_CONFIG } }),

  // Load partial config (useful for presets)
  loadConfig: (newConfig) =>
    set((state) => ({
      config: { ...state.config, ...newConfig },
    })),
}),
    {
      name: 'npc-creator-storage', // localStorage key
      version: 1, // Version for migration if needed
    }
  )
)

/**
 * Selector hooks for specific parts of the config
 * These prevent unnecessary re-renders
 */
export const useNPCGameVersion = () => useNPCStore((state) => state.config.gameVersion)
export const useNPCGender = () => useNPCStore((state) => state.config.gender)
export const useNPCVisuals = () =>
  useNPCStore((state) => ({
    bodyMesh: state.config.bodyMesh,
    bodyTexture: state.config.bodyTexture,
    bodyTextureFile: state.config.bodyTextureFile,
    skinColor: state.config.skinColor,
    headMesh: state.config.headMesh,
    headTexture: state.config.headTexture,
    headTextureFile: state.config.headTextureFile,
    armorInstance: state.config.armorInstance,
    fatness: state.config.fatness,
    headOffsetX: state.config.headOffsetX,
    headOffsetY: state.config.headOffsetY,
    headOffsetZ: state.config.headOffsetZ,
  }))
