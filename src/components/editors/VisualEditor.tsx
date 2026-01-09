import {
  GenderSelector,
  BodySelector,
  HeadSelector,
  ArmorSelector,
  BodyTextureSelector,
  HeadTextureSelector,
  FatnessSlider,
} from '../selectors'
import { Separator } from '../ui/separator'

/**
 * Visual editor component
 * Configures NPC appearance: body, head, armor, textures, and body modifiers
 */
export function VisualEditor() {
  return (
    <div className="space-y-5">
      {/* Gender Selection */}
      <div>
        <h3 className="text-xs font-display text-ember uppercase tracking-wider mb-3">
          Character
        </h3>
        <div className="space-y-4">
          <GenderSelector />
          <BodySelector />
          <HeadSelector />
        </div>
      </div>

      <Separator />

      {/* Equipment */}
      <div>
        <h3 className="text-xs font-display text-ember uppercase tracking-wider mb-3">
          Equipment
        </h3>
        <ArmorSelector />
      </div>

      <Separator />

      {/* Textures */}
      <div>
        <h3 className="text-xs font-display text-ember uppercase tracking-wider mb-3">
          Textures
        </h3>
        <div className="space-y-4">
          <BodyTextureSelector />
        </div>
      </div>

      <Separator />

      {/* Body Modifiers */}
      <div>
        <h3 className="text-xs font-display text-ember uppercase tracking-wider mb-3">
          Body Modifiers
        </h3>
        <FatnessSlider />
      </div>
    </div>
  )
}
