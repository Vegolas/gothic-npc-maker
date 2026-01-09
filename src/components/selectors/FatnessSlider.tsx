import { useNPCStore } from '../../stores/npcStore'
import { SliderNew } from '../ui/slider-new'

/**
 * Fatness slider component
 * Controls the body scaling (0.8 to 1.2, where 1 is normal)
 */
export function FatnessSlider() {
  const fatness = useNPCStore((state) => state.config.fatness)
  const setFatness = useNPCStore((state) => state.setFatness)

  return (
    <SliderNew
      label="Fatness"
      min={0.8}
      max={1.2}
      step={0.02}
      value={[fatness]}
      onValueChange={([value]) => setFatness(value)}
      valueFormat={(v) => v.toFixed(2)}
    />
  )
}
