import { useNPCStore } from '../../stores/npcStore'
import { ARMORS } from '../../data/armors'
import { Select, type SelectOption } from '../ui/Select'

/**
 * Armor selector component
 * Shows all available armors, with "No Armor" option
 */
export function ArmorSelector() {
  const armorInstance = useNPCStore((state) => state.config.armorInstance)
  const setArmorInstance = useNPCStore((state) => state.setArmorInstance)

  const options: SelectOption[] = ARMORS.map((armor) => ({
    value: armor.id ?? '__none__',  // Use special value for null
    label: armor.name,
  }))

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setArmorInstance(value === '__none__' ? null : value)
  }

  return (
    <Select
      label="Armor"
      options={options}
      value={armorInstance ?? '__none__'}
      onChange={handleChange}
    />
  )
}
