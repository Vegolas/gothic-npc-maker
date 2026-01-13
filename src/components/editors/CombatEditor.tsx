import { useState, useEffect } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import { getFightTactics } from '../../data/fightTactics'
import { InputNew } from '../ui/input-new'
import { ComboBox } from '../ui/combo-box'

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
      <ComboBox
        label="Fight Tactic"
        value={config.fightTactic}
        onChange={(value) => store.setFightTactic(value)}
        suggestions={tactics}
        placeholder="Type or select tactic"
      />

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
