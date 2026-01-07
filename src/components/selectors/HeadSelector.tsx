import { useNPCStore } from '../../stores/npcStore'
import { getHeadsByGender } from '../../data/heads'
import { Select, type SelectOption } from '../ui/Select'

/**
 * Head mesh selector component
 * Filters available heads based on selected gender
 */
export function HeadSelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const headMesh = useNPCStore((state) => state.config.headMesh)
  const setHeadMesh = useNPCStore((state) => state.setHeadMesh)

  const heads = getHeadsByGender(gender)
  const options: SelectOption[] = heads.map((head) => ({
    value: head.id,
    label: head.name,
  }))

  return (
    <Select
      label="Head Type"
      options={options}
      value={headMesh}
      onChange={(e) => setHeadMesh(e.target.value)}
    />
  )
}
