import { useNPCStore } from '../../stores/npcStore'
import { Slider } from '../ui/Slider'

/**
 * Fatness slider component
 * Controls the body scaling (-1 to 1)
 */
export function FatnessSlider() {
  const fatness = useNPCStore((state) => state.config.fatness)
  const setFatness = useNPCStore((state) => state.setFatness)

  return (
    <Slider
      label="Fatness"
      min={-1}
      max={1}
      step={0.1}
      value={fatness}
      onChange={(e) => setFatness(Number(e.target.value))}
      valueFormat={(v) => v.toFixed(1)}
    />
  )
}
