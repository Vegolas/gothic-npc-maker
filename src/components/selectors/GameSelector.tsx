import { useNPCStore } from '../../stores/npcStore'
import type { GameVersion } from '../../types/npc'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

/**
 * Game version selector component
 * Toggles between Gothic 1 and Gothic 2 assets
 */
export function GameSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const setGameVersion = useNPCStore((state) => state.setGameVersion)

  return (
    <ToggleGroup
      type="single"
      value={gameVersion}
      onValueChange={(value) => value && setGameVersion(value as GameVersion)}
    >
      <ToggleGroupItem value="g1" variant="ember">
        Gothic I
      </ToggleGroupItem>
      <ToggleGroupItem value="g2" variant="ember">
        Gothic II
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
