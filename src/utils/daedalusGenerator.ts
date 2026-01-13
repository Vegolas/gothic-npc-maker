/**
 * Daedalus Script Generator for Gothic NPCs
 * Generates valid Daedalus script code from NPC configuration
 */

import type { NPCConfig } from '../types/npc'

/**
 * Map NPC type to Daedalus constant
 */
function getNPCTypeConstant(type: NPCConfig['npcType']): string {
  const map: Record<NPCConfig['npcType'], string> = {
    main: 'NPCTYPE_MAIN',
    ambient: 'NPCTYPE_AMBIENT',
    friend: 'NPCTYPE_FRIEND',
  }
  return map[type]
}

/**
 * Get the visual MDS file based on gender
 * Gothic uses different skeleton files for male/female
 */
function getVisualMDS(gender: 'male' | 'female'): string {
  return gender === 'male' ? 'HUMANS.MDS' : 'HUMANS.MDS' // Same file for both, typically
}

/**
 * Format armor instance for Mdl_SetVisualBody
 * Returns -1 for no armor, or the armor instance name
 */
function formatArmorInstance(armor: string | null): string {
  return armor ? armor : '-1'
}

/**
 * Format head mesh name with HUM_HEAD_ prefix
 * Gothic requires head mesh names to have this prefix in scripts
 */
function formatHeadMesh(headMesh: string): string {
  // If already has the prefix, return as-is
  if (headMesh.toUpperCase().startsWith('HUM_HEAD_')) {
    return headMesh
  }
  return `Hum_Head_${headMesh}`
}

/**
 * Generate complete Daedalus script for an NPC
 */
export function generateDaedalusScript(config: NPCConfig): string {
  const {
    instanceName,
    displayName,
    gender,
    npcType,
    guild,
    level,
    voice,
    id,
    bodyMesh,
    bodyTexture,
    skinColor,
    headMesh,
    headTexture,
    teethTexture,
    armorInstance,
    fatness,
    strength,
    dexterity,
    manaMax,
    hitpointsMax,
    fightTactic,
    dailyRoutine,
    equipment,
  } = config

  // Generate equipment entries
  const equipmentEntries = equipment && equipment.length > 0
    ? equipment.map(item => {
        if (item.functionType === 'CreateInvItems') {
          return `    ${item.functionType}(self, ${item.itemName}, ${item.count});`
        } else {
          return `    ${item.functionType}(self, ${item.itemName});`
        }
      }).join('\n')
    : ''

  // Generate routine entries
  const routineEntries = dailyRoutine.length > 0
    ? dailyRoutine.map(entry => {
        const startH = entry.startHour.toString().padStart(2, '0')
        const startM = entry.startMinute.toString().padStart(2, '0')
        const endH = entry.endHour.toString().padStart(2, '0')
        const endM = entry.endMinute.toString().padStart(2, '0')
        return `    ${entry.action}(${startH}, ${startM}, ${endH}, ${endM}, "${entry.waypoint}");`
      }).join('\n')
    : `    TA_Stand_Guarding(08, 00, 20, 00, "START");\n    TA_Stand_Guarding(20, 00, 08, 00, "START");`

  const script = `// Generated NPC: ${displayName}
// Instance: ${instanceName}

instance ${instanceName} (Npc_Default)
{
    // Identity
    name        = "${displayName}";
    npctype     = ${getNPCTypeConstant(npcType)};
    guild       = ${guild};
    level       = ${level};
    voice       = ${voice};
    id          = ${id};

    // Attributes
    attribute[ATR_STRENGTH]      = ${strength};
    attribute[ATR_DEXTERITY]     = ${dexterity};
    attribute[ATR_MANA_MAX]      = ${manaMax};
    attribute[ATR_MANA]          = ${manaMax};
    attribute[ATR_HITPOINTS_MAX] = ${hitpointsMax};
    attribute[ATR_HITPOINTS]     = ${hitpointsMax};

    // Visuals
    Mdl_SetVisual(self, "${getVisualMDS(gender)}");
    Mdl_SetVisualBody(self, "${bodyMesh}", ${bodyTexture}, ${skinColor}, "${formatHeadMesh(headMesh)}", ${headTexture}, ${teethTexture}, ${formatArmorInstance(armorInstance)});

    // Body configuration
    B_Scale(self);
    Mdl_SetModelFatness(self, ${fatness.toFixed(1)});

    // Combat
    fight_tactic = ${fightTactic};

    // Talents
    Npc_SetTalentSkill(self, NPC_TALENT_1H, 0);
    Npc_SetTalentSkill(self, NPC_TALENT_2H, 0);
    Npc_SetTalentSkill(self, NPC_TALENT_BOW, 0);
    Npc_SetTalentSkill(self, NPC_TALENT_CROSSBOW, 0);
${equipmentEntries ? '\n    // Equipment\n' + equipmentEntries + '\n' : ''}
    // Daily routine
    daily_routine = Rtn_Start_${instanceName};
};

// Daily routine function
func void Rtn_Start_${instanceName}()
{
${routineEntries}
};
`

  return script
}

/**
 * Generate just the Mdl_SetVisualBody line
 * Useful for quick reference
 */
export function generateVisualBodyLine(config: NPCConfig): string {
  return `Mdl_SetVisualBody(self, "${config.bodyMesh}", ${config.bodyTexture}, ${config.skinColor}, "${formatHeadMesh(config.headMesh)}", ${config.headTexture}, ${config.teethTexture}, ${formatArmorInstance(config.armorInstance)});`
}

/**
 * Validate instance name for Daedalus compatibility
 * - Must start with a letter
 * - Only alphanumeric and underscores
 * - All uppercase recommended
 */
export function validateInstanceName(name: string): { valid: boolean; error?: string } {
  if (!name) {
    return { valid: false, error: 'Instance name is required' }
  }
  if (!/^[A-Z]/.test(name)) {
    return { valid: false, error: 'Must start with a letter' }
  }
  if (!/^[A-Z0-9_]+$/.test(name)) {
    return { valid: false, error: 'Only letters, numbers, and underscores allowed' }
  }
  if (name.length > 64) {
    return { valid: false, error: 'Name too long (max 64 characters)' }
  }
  return { valid: true }
}
