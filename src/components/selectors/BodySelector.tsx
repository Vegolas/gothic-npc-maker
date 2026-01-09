import { useNPCStore } from '../../stores/npcStore'
import { discoverBodies } from '../../utils/assetDiscovery'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select-new'

/**
 * Body mesh selector component
 * Dynamically discovers available bodies based on selected gender and game version
 * Hidden if only one body option exists
 */
export function BodySelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const bodyMesh = useNPCStore((state) => state.config.bodyMesh)
  const setBodyMesh = useNPCStore((state) => state.setBodyMesh)

  const bodies = discoverBodies(gameVersion, gender)

  // Hide selector if only one option
  if (bodies.length <= 1) {
    return null
  }

  return (
    <Select value={bodyMesh} onValueChange={setBodyMesh}>
      <SelectTrigger label="Body Type">
        <SelectValue placeholder="Select body" />
      </SelectTrigger>
      <SelectContent>
        {bodies.map((body) => (
          <SelectItem key={body.id} value={body.id}>
            {body.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
