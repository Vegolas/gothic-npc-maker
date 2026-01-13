import { useState, useEffect } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import { InputNew } from '../ui/input-new'
import { ComboBox } from '../ui/combo-box'
import { Button } from '../ui/Button'
import { Trash2, Plus } from 'lucide-react'
import type { EquipmentItem } from '../../types/npc'
import { discoverItems } from '../../utils/assetDiscovery'
import { filterItemsByFunction, type ParsedItem } from '../../utils/itemParser'

const FUNCTION_TYPES = ['EquipItem', 'CreateInvItem', 'CreateInvItems']

/**
 * Equipment editor component
 * Allows adding items with different equipment functions
 */
export function EquipmentEditor() {
  const config = useNPCStore((state) => state.config)
  const store = useNPCStore()
  const [allItems, setAllItems] = useState<ParsedItem[]>([])

  // Ensure equipment array exists (backwards compatibility)
  const equipment = config.equipment ?? []

  // Load items when game version changes
  useEffect(() => {
    discoverItems(config.gameVersion).then(setAllItems)
  }, [config.gameVersion])

  const handleAddItem = () => {
    const newItem: EquipmentItem = {
      id: Date.now().toString(),
      functionType: 'CreateInvItem',
      itemName: '',
      count: 1,
    }
    store.addEquipmentItem(newItem)
  }

  const handleRemoveItem = (id: string) => {
    store.removeEquipmentItem(id)
  }

  const handleUpdateItem = (id: string, updates: Partial<EquipmentItem>) => {
    store.updateEquipmentItem(id, updates)
  }

  // Get filtered item suggestions based on function type
  const getItemSuggestions = (functionType: string): string[] => {
    const filtered = filterItemsByFunction(allItems, functionType)
    return filtered.map(item => item.instance)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-display text-ember uppercase tracking-wider">
          Equipment & Inventory
        </h3>
        <Button
          onClick={handleAddItem}
          size="sm"
          className="gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Item
        </Button>
      </div>

      {equipment.length === 0 ? (
        <div className="py-8 text-center text-text-muted text-sm">
          No items added yet. Click "Add Item" to start.
        </div>
      ) : (
        <div className="space-y-2">
          {equipment.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-stone/40 rounded-md border border-stone/60"
            >
              {/* Single row layout: Function | Item Instance | Count (if needed) | Remove */}
              <div className="flex items-end gap-2">
                {/* Function - Fixed width ~15 chars */}
                <div className="w-[180px] flex-shrink-0">
                  <ComboBox
                    label="Function"
                    value={item.functionType}
                    onChange={(value) => handleUpdateItem(item.id, { functionType: value })}
                    suggestions={FUNCTION_TYPES}
                    placeholder="Function"
                    alwaysShowAll={true}
                  />
                </div>

                {/* Item Instance - Takes most of the width */}
                <div className="flex-1 min-w-0">
                  <ComboBox
                    label="Item"
                    value={item.itemName}
                    onChange={(value) => handleUpdateItem(item.id, { itemName: value })}
                    suggestions={getItemSuggestions(item.functionType)}
                    placeholder="ItMw_1H_Sword_05"
                    className="font-mono"
                  />
                </div>

                {/* Count - Only show for CreateInvItems, max 3 chars */}
                {item.functionType === 'CreateInvItems' && (
                  <div className="w-[70px] flex-shrink-0">
                    <InputNew
                      label="Count"
                      type="number"
                      value={item.count}
                      onChange={(e) => handleUpdateItem(item.id, { count: parseInt(e.target.value) || 1 })}
                      min={1}
                      className="text-center"
                    />
                  </div>
                )}

                {/* Remove button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="h-10 w-10 flex-shrink-0 rounded-md bg-obsidian/80 border border-stone/60 text-text-muted hover:text-ember hover:border-ember/50 transition-all duration-150 flex items-center justify-center"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Example hint */}
      <div className="mt-6 p-3 bg-obsidian/60 rounded-md border border-stone/30">
        <p className="text-xs font-display text-text-dim uppercase tracking-wider mb-2">
          Examples
        </p>
        <div className="space-y-1 text-xs text-text-muted font-mono">
          <div>EquipItem(self, ItMw_1H_Sword_05);</div>
          <div>CreateInvItem(self, ItFoSoup);</div>
          <div>CreateInvItems(self, ItMi_Plants_Swampherb_01, 2);</div>
        </div>
      </div>
    </div>
  )
}
