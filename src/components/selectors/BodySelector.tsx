import { useNPCStore } from '../../stores/npcStore'
import { getBodiesByGender } from '../../data/bodies'
import { Select, type SelectOption } from '../ui/Select'

/**
 * Body mesh selector component
 * Filters available bodies based on selected gender
 */
export function BodySelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const bodyMesh = useNPCStore((state) => state.config.bodyMesh)
  const setBodyMesh = useNPCStore((state) => state.setBodyMesh)

  const bodies = getBodiesByGender(gender)
  const options: SelectOption[] = bodies.map((body) => ({
    value: body.id,
    label: body.name,
  }))

  return (
    <Select
      label="Body Type"
      options={options}
      value={bodyMesh}
      onChange={(e) => setBodyMesh(e.target.value)}
    />
  )
}
