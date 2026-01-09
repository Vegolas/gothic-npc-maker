import { useNPCStore } from '../../stores/npcStore'
import { discoverArmors } from '../../utils/assetDiscovery'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select-new'

/**
 * Armor selector component
 * Dynamically discovers available armors
 */
export function ArmorSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const armorInstance = useNPCStore((state) => state.config.armorInstance)
  const setArmorInstance = useNPCStore((state) => state.setArmorInstance)

  const armors = [
    { id: '__none__', name: 'No Armor (Naked)' },
    ...discoverArmors(gameVersion)
  ]

  const handleChange = (value: string) => {
    setArmorInstance(value === '__none__' ? null : value)
  }

  return (
    <Select value={armorInstance ?? '__none__'} onValueChange={handleChange}>
      <SelectTrigger label="Armor">
        <SelectValue placeholder="Select armor" />
      </SelectTrigger>
      <SelectContent>
        {armors.map((armor) => (
          <SelectItem key={armor.id ?? '__none__'} value={armor.id ?? '__none__'}>
            {armor.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
