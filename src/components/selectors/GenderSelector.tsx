import { useNPCStore } from '../../stores/npcStore'
import type { Gender } from '../../types/npc'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

/**
 * Gender selector component
 * Toggles between male and female, updating related defaults
 */
export function GenderSelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const setGender = useNPCStore((state) => state.setGender)

  return (
    <ToggleGroup
      type="single"
      value={gender}
      onValueChange={(value) => value && setGender(value as Gender)}
      label="Gender"
      className="w-full"
    >
      <ToggleGroupItem value="male" className="flex-1">
        Male
      </ToggleGroupItem>
      <ToggleGroupItem value="female" className="flex-1">
        Female
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
