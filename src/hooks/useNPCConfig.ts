/**
 * Custom hooks for accessing NPC configuration
 * Provides convenient access patterns for different parts of the app
 */

import { useNPCStore, useNPCGender, useNPCVisuals } from '../stores/npcStore'
import type { NPCConfig } from '../types/npc'

/**
 * Main hook for accessing full NPC config and all actions
 */
export function useNPCConfig() {
  const store = useNPCStore()
  return store
}

/**
 * Hook for accessing only the NPC configuration (no actions)
 */
export function useNPCConfigValue(): NPCConfig {
  return useNPCStore((state) => state.config)
}

/**
 * Hook for identity-related config
 */
export function useNPCIdentity() {
  return useNPCStore((state) => ({
    instanceName: state.config.instanceName,
    displayName: state.config.displayName,
    gender: state.config.gender,
    npcType: state.config.npcType,
    guild: state.config.guild,
    level: state.config.level,
    voice: state.config.voice,
    id: state.config.id,
  }))
}

/**
 * Hook for attribute-related config
 */
export function useNPCAttributes() {
  return useNPCStore((state) => ({
    strength: state.config.strength,
    dexterity: state.config.dexterity,
    manaMax: state.config.manaMax,
    hitpointsMax: state.config.hitpointsMax,
  }))
}

/**
 * Hook for combat-related config
 */
export function useNPCCombat() {
  return useNPCStore((state) => ({
    fightTactic: state.config.fightTactic,
    waypoint: state.config.waypoint,
  }))
}

// Re-export convenience hooks
export { useNPCGender, useNPCVisuals }
