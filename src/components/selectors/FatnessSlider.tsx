import { useNPCStore } from '../../stores/npcStore'
import { SliderNew } from '../ui/slider-new'
import { FATNESS_RANGE } from '../../config/constants'

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
      min={FATNESS_RANGE.min}
      max={FATNESS_RANGE.max}
      step={FATNESS_RANGE.step}
      value={[fatness]}
      onValueChange={([value]) => setFatness(value)}
      valueFormat={(v) => v.toFixed(2)}
    />
  )
}
