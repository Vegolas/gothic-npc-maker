import { useNPCStore } from '../../stores/npcStore'
import { Slider } from '../ui/Slider'

/**
 * Head offset sliders component
 * Controls the X and Y position of the head mesh
 */
export function HeadOffsetSlider() {
  const headOffsetX = useNPCStore((state) => state.config.headOffsetX)
  const headOffsetY = useNPCStore((state) => state.config.headOffsetY)
  const headOffsetZ = useNPCStore((state) => state.config.headOffsetZ)
  const setHeadOffsetX = useNPCStore((state) => state.setHeadOffsetX)
  const setHeadOffsetY = useNPCStore((state) => state.setHeadOffsetY)
  const setHeadOffsetZ = useNPCStore((state) => state.setHeadOffsetZ)

  return (
    <div className="space-y-2">
      <Slider
        label="Head Offset X"
        min={-0.5}
        max={0.5}
        step={0.01}
        value={headOffsetX}
        onChange={(e) => setHeadOffsetX(Number(e.target.value))}
        valueFormat={(v) => v.toFixed(2)}
      />
      <Slider
        label="Head Offset Y"
        min={-0.5}
        max={0.5}
        step={0.01}
        value={headOffsetY}
        onChange={(e) => setHeadOffsetY(Number(e.target.value))}
        valueFormat={(v) => v.toFixed(2)}
      />
      <Slider
        label="Head Offset Z"
        min={-0.5}
        max={0.5}
        step={0.01}
        value={headOffsetZ}
        onChange={(e) => setHeadOffsetZ(Number(e.target.value))}
        valueFormat={(v) => v.toFixed(2)}
      />
    </div>
  )
}
