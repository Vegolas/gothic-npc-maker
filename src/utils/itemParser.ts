/**
 * Daedalus Item Script Parser
 * Parses item definitions from Daedalus scripts
 */

export interface ParsedItem {
  instance: string       // Instance name (e.g., "ItMw_1H_Sword_01")
  displayName: string    // In-game visible name (e.g., "Rusty Sword")
  mainFlag: string       // Main category flag
  isMulti: boolean       // Whether item has ITEM_MULTI flag (stackable)
  category: 'melee' | 'ranged' | 'rune' | 'misc'  // Derived category
}

/**
 * Parse a single Daedalus script file content
 * Extracts all INSTANCE declarations with their properties
 */
export function parseItemScript(scriptContent: string): ParsedItem[] {
  const items: ParsedItem[] = []

  // Match INSTANCE declarations (case insensitive)
  // Pattern: INSTANCE ItemName (C_Item) { ... }
  const instanceRegex = /INSTANCE\s+(\w+)\s*\([^)]+\)\s*\{([^}]+)\}/gi

  let match
  while ((match = instanceRegex.exec(scriptContent)) !== null) {
    const instance = match[1]
    const body = match[2]

    // Extract name (in-game display name)
    const nameMatch = body.match(/name\s*=\s*"([^"]+)"/i)
    const displayName = nameMatch ? nameMatch[1] : instance

    // Extract mainflag
    const mainFlagMatch = body.match(/mainflag\s*=\s*(\w+)/i)
    const mainFlag = mainFlagMatch ? mainFlagMatch[1] : ''

    // Check if item has ITEM_MULTI flag
    const isMulti = /flags\s*=\s*ITEM_MULTI/i.test(body)

    // Determine category based on mainflag
    let category: ParsedItem['category'] = 'misc'
    if (mainFlag === 'ITEM_KAT_NF') {
      category = 'melee'
    } else if (mainFlag === 'ITEM_KAT_FF') {
      category = 'ranged'
    } else if (mainFlag === 'ITEM_KAT_RUNE') {
      category = 'rune'
    }

    items.push({
      instance,
      displayName,
      mainFlag,
      isMulti,
      category,
    })
  }

  return items
}

/**
 * Check if an item can be equipped based on category
 */
export function canEquipItem(item: ParsedItem): boolean {
  return item.category === 'melee' || item.category === 'ranged' || item.category === 'rune'
}

/**
 * Filter items based on function type
 */
export function filterItemsByFunction(items: ParsedItem[], functionType: string): ParsedItem[] {
  if (functionType === 'EquipItem') {
    // Only weapons and runes can be equipped
    return items.filter(canEquipItem)
  }
  // CreateInvItem and CreateInvItems can use any item
  return items
}
