import { useEffect } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import type { RoutineEntry } from '../../types/npc'
import { InputNew } from '../ui/input-new'
import { ComboBox } from '../ui/combo-box'
import { Plus, Trash2 } from 'lucide-react'
import { parseActions } from '../../utils/taParser'
import { useState } from 'react'
import { ZenFileSelector, useZenWaypoints } from '../selectors/ZenFileSelector'

/**
 * Routine editor component
 * Allows users to define daily routines for NPCs
 */
export function RoutineEditor() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const dailyRoutine = useNPCStore((state) => state.config.dailyRoutine)
  const setDailyRoutine = useNPCStore((state) => state.setDailyRoutine)
  const [availableActions, setAvailableActions] = useState<string[]>([])
  const zenWaypoints = useZenWaypoints()

  // Load actions from Ta.d when game version changes
  useEffect(() => {
    parseActions(gameVersion).then(setAvailableActions)
  }, [gameVersion])

  const addEntry = () => {
    const newEntry: RoutineEntry = {
      id: Math.random().toString(36).substr(2, 9),
      action: '',
      startHour: 0,
      startMinute: 0,
      endHour: 0,
      endMinute: 0,
      waypoint: ''
    }
    setDailyRoutine([...dailyRoutine, newEntry])
  }

  const removeEntry = (id: string) => {
    setDailyRoutine(dailyRoutine.filter(entry => entry.id !== id))
  }

  const updateEntry = (id: string, field: keyof RoutineEntry, value: string | number) => {
    setDailyRoutine(dailyRoutine.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ))
  }

  return (
    <div className="space-y-4">
      {/* ZEN File Selector */}
      <div className="pb-4 border-b border-stone/30">
        <h3 className="text-xs font-display text-ember uppercase tracking-wider mb-3">
          World File
        </h3>
        <ZenFileSelector />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xs font-display text-ember uppercase tracking-wider">
          Daily Routine
        </h3>
        <button
          onClick={addEntry}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs
            bg-stone/40 border border-stone/50 text-text-dim
            hover:bg-stone/60 hover:text-ember hover:border-ember/50
            transition-all duration-150"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Entry
        </button>
      </div>

      {dailyRoutine.length === 0 && (
        <div className="text-center py-8 text-text-muted text-sm">
          No routine entries. Click "Add Entry" to start.
        </div>
      )}

      <div className="space-y-3">
        {dailyRoutine.map((entry) => (
          <div key={entry.id} className="p-3 rounded-md bg-stone/20 border border-stone/30 space-y-3">
            {/* Action and Delete */}
            <div className="flex gap-2">
              <ComboBox
                label="Action"
                value={entry.action}
                onChange={(value) => updateEntry(entry.id, 'action', value)}
                suggestions={availableActions}
                placeholder="Type or select action (e.g. TA_SLEEP)"
                className="flex-1"
              />
              <button
                onClick={() => removeEntry(entry.id)}
                className="self-end p-2 rounded-md text-text-muted hover:text-blood hover:bg-blood/10
                  border border-stone/30 hover:border-blood/30 transition-all duration-150"
                title="Remove entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-[auto,1fr,auto,1fr] gap-2 items-end">
              <span className="text-xs text-text-dim pb-2">From:</span>
              <div className="grid grid-cols-2 gap-2">
                <InputNew
                  label="Hour"
                  type="number"
                  value={entry.startHour}
                  onChange={(e) => updateEntry(entry.id, 'startHour', Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                  min={0}
                  max={23}
                  className="text-center"
                />
                <InputNew
                  label="Minute"
                  type="number"
                  value={entry.startMinute}
                  onChange={(e) => updateEntry(entry.id, 'startMinute', Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  min={0}
                  max={59}
                  className="text-center"
                />
              </div>
              <span className="text-xs text-text-dim pb-2">To:</span>
              <div className="grid grid-cols-2 gap-2">
                <InputNew
                  label="Hour"
                  type="number"
                  value={entry.endHour}
                  onChange={(e) => updateEntry(entry.id, 'endHour', Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                  min={0}
                  max={23}
                  className="text-center"
                />
                <InputNew
                  label="Minute"
                  type="number"
                  value={entry.endMinute}
                  onChange={(e) => updateEntry(entry.id, 'endMinute', Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  min={0}
                  max={59}
                  className="text-center"
                />
              </div>
            </div>

            {/* Waypoint */}
            <ComboBox
              label="Waypoint"
              value={entry.waypoint}
              onChange={(value) => updateEntry(entry.id, 'waypoint', value.toUpperCase())}
              suggestions={zenWaypoints.length > 0 ? zenWaypoints : []}
              placeholder={zenWaypoints.length > 0 ? "Select or type waypoint" : "WP_MARKET_01 (select a world file for suggestions)"}
              className="font-mono"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
