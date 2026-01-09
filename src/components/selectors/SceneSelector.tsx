import { useNPCStore } from '../../stores/npcStore'
import { getScenes } from '../../data/scenes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select-new'

/**
 * Scene selector for 3D preview background
 * Allows user to select different scene environments
 */
export function SceneSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const previewScene = useNPCStore((state) => state.config.previewScene)
  const setPreviewScene = useNPCStore((state) => state.setPreviewScene)

  const scenes = getScenes(gameVersion)

  return (
    <Select value={previewScene} onValueChange={setPreviewScene}>
      <SelectTrigger label="Preview Scene">
        <SelectValue placeholder="Select scene" />
      </SelectTrigger>
      <SelectContent>
        {scenes.map((scene) => (
          <SelectItem key={scene.id} value={scene.id}>
            {scene.id === 'none' ? 'None (Simple Floor)' : scene.id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
