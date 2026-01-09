import { useState, useEffect } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import { getFightTactics } from '../../data/fightTactics'
import { InputNew } from '../ui/input-new'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select-new'

/**
 * Combat editor component
 * Edits fight tactic and waypoint
 */
export function CombatEditor() {
  const config = useNPCStore((state) => state.config)
  const store = useNPCStore()
  const [tactics, setTactics] = useState<string[]>([])

  // Load tactics when game version changes
  useEffect(() => {
    getFightTactics(config.gameVersion).then(setTactics)
  }, [config.gameVersion])

  return (
    <div className="space-y-4">
      <Select value={config.fightTactic} onValueChange={(value) => store.setFightTactic(value)}>
        <SelectTrigger label="Fight Tactic">
          <SelectValue placeholder="Select tactic" />
        </SelectTrigger>
        <SelectContent>
          {tactics.map((tacticId) => (
            <SelectItem key={tacticId} value={tacticId}>
              {tacticId}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <InputNew
        label="Default Waypoint"
        value={config.waypoint}
        onChange={(e) => store.setWaypoint(e.target.value.toUpperCase())}
        placeholder="WP_MARKET_01"
        className="font-mono"
      />
    </div>
  )
}
