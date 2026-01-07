/**
 * Armor definitions for Gothic NPC Creator
 * Based on Gothic 2 armor instances
 */

import type { Armor } from '../types/assets'

/**
 * Available armor options
 * The id is the Daedalus armor instance name, or null for no armor
 */
export const ARMORS: Armor[] = [
  {
    id: null,
    name: 'No Armor (Naked)',
    fileName: null,
  },
  {
    id: 'ITAR_VLK_L',
    name: 'Citizen Light Armor',
    fileName: 'ARMOR_BDT_M.glb',
    guild: 'GIL_VLK',
  },
  // Additional armors can be added here:
  // Guard armors
  // { id: 'ITAR_GRD_L', name: 'Guard Light Armor', fileName: 'HUM_GRDL_ARMOR.glb', guild: 'GIL_GRD' },
  // { id: 'ITAR_GRD_M', name: 'Guard Medium Armor', fileName: 'HUM_GRDM_ARMOR.glb', guild: 'GIL_GRD' },
  // { id: 'ITAR_GRD_H', name: 'Guard Heavy Armor', fileName: 'HUM_GRDH_ARMOR.glb', guild: 'GIL_GRD' },
  // Mercenary armors
  // { id: 'ITAR_SLD_L', name: 'Mercenary Light Armor', fileName: 'HUM_SLDL_ARMOR.glb', guild: 'GIL_SLD' },
  // { id: 'ITAR_SLD_M', name: 'Mercenary Medium Armor', fileName: 'HUM_SLDM_ARMOR.glb', guild: 'GIL_SLD' },
  // { id: 'ITAR_SLD_H', name: 'Mercenary Heavy Armor', fileName: 'HUM_SLDH_ARMOR.glb', guild: 'GIL_SLD' },
  // Mage robes
  // { id: 'ITAR_KDF_L', name: 'Fire Mage Robe', fileName: 'HUM_KDFL_ARMOR.glb', guild: 'GIL_KDF' },
  // { id: 'ITAR_KDW_L', name: 'Water Mage Robe', fileName: 'HUM_KDWL_ARMOR.glb', guild: 'GIL_KDW' },
  // Militia
  // { id: 'ITAR_MIL_L', name: 'Militia Light Armor', fileName: 'HUM_MILL_ARMOR.glb', guild: 'GIL_MIL' },
  // { id: 'ITAR_MIL_M', name: 'Militia Medium Armor', fileName: 'HUM_MILM_ARMOR.glb', guild: 'GIL_MIL' },
]

/**
 * Get armor by ID
 */
export function getArmorById(id: string | null): Armor | undefined {
  return ARMORS.find(armor => armor.id === id)
}

/**
 * Get armors filtered by guild (optional)
 */
export function getArmorsByGuild(guild?: string): Armor[] {
  if (!guild || guild === 'GIL_NONE') {
    return ARMORS
  }
  return ARMORS.filter(armor => !armor.guild || armor.guild === guild)
}
