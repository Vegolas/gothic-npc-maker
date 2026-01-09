import { useNPCStore } from '../../stores/npcStore'
import { discoverHeads } from '../../utils/assetDiscovery'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select-new'

/**
 * Head mesh selector component
 * Dynamically discovers available heads based on selected gender and game version
 */
export function HeadSelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const headMesh = useNPCStore((state) => state.config.headMesh)
  const setHeadMesh = useNPCStore((state) => state.setHeadMesh)

  const heads = discoverHeads(gameVersion, gender)

  return (
    <Select value={headMesh} onValueChange={setHeadMesh}>
      <SelectTrigger label="Head Type">
        <SelectValue placeholder="Select head" />
      </SelectTrigger>
      <SelectContent>
        {heads.map((head) => (
          <SelectItem key={head.id} value={head.id}>
            {head.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
