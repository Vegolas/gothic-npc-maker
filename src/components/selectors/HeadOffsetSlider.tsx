import { useNPCStore } from '../../stores/npcStore'
import { SliderNew } from '../ui/slider-new'

/**
 * Head offset sliders component
 * Controls the X, Y, and Z position of the head mesh
 */
export function HeadOffsetSlider() {
  const headOffsetX = useNPCStore((state) => state.config.headOffsetX)
  const headOffsetY = useNPCStore((state) => state.config.headOffsetY)
  const headOffsetZ = useNPCStore((state) => state.config.headOffsetZ)
  const setHeadOffsetX = useNPCStore((state) => state.setHeadOffsetX)
  const setHeadOffsetY = useNPCStore((state) => state.setHeadOffsetY)
  const setHeadOffsetZ = useNPCStore((state) => state.setHeadOffsetZ)

  return (
    <div className="space-y-4">
      <SliderNew
        label="Head Offset X"
        min={-0.5}
        max={0.5}
        step={0.01}
        value={[headOffsetX]}
        onValueChange={([value]) => setHeadOffsetX(value)}
        valueFormat={(v) => v.toFixed(2)}
      />
      <SliderNew
        label="Head Offset Y"
        min={-0.5}
        max={0.5}
        step={0.01}
        value={[headOffsetY]}
        onValueChange={([value]) => setHeadOffsetY(value)}
        valueFormat={(v) => v.toFixed(2)}
      />
      <SliderNew
        label="Head Offset Z"
        min={-0.5}
        max={0.5}
        step={0.01}
        value={[headOffsetZ]}
        onValueChange={([value]) => setHeadOffsetZ(value)}
        valueFormat={(v) => v.toFixed(2)}
      />
    </div>
  )
}
