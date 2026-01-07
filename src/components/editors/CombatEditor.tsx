import { useNPCStore } from '../../stores/npcStore'
import { FIGHT_TACTICS } from '../../data/fightTactics'
import { Input } from '../ui/Input'
import { Select, type SelectOption } from '../ui/Select'

/**
 * Combat editor component
 * Edits fight tactic and waypoint
 */
export function CombatEditor() {
  const config = useNPCStore((state) => state.config)
  const store = useNPCStore()

  const tacticOptions: SelectOption[] = FIGHT_TACTICS.map((tactic) => ({
    value: tactic.id,
    label: tactic.name,
  }))

  return (
    <div className="space-y-3">
      <Select
        label="Fight Tactic"
        options={tacticOptions}
        value={config.fightTactic}
        onChange={(e) => store.setFightTactic(e.target.value)}
      />

      <Input
        label="Default Waypoint"
        value={config.waypoint}
        onChange={(e) => store.setWaypoint(e.target.value.toUpperCase())}
        placeholder="WP_MARKET_01"
      />
    </div>
  )
}
