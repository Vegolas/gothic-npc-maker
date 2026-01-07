import {
  GenderSelector,
  BodySelector,
  HeadSelector,
  ArmorSelector,
  BodyTextureSelector,
  HeadTextureSelector,
  SkinColorSelector,
  FatnessSlider,
  HeadOffsetSlider,
} from '../selectors'

/**
 * Left sidebar containing all visual selection options.
 * Includes: Gender, Body, Head, Armor, Textures, Fatness selectors
 */
export function Sidebar() {
  return (
    <aside className="w-72 bg-gothic-darker border-r border-gothic-stone overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gothic-gold uppercase tracking-wider mb-4">
          Visual Options
        </h2>

        <div className="space-y-4">
          {/* Gender toggle */}
          <GenderSelector />

          {/* Mesh selectors */}
          <div className="pt-2 border-t border-gothic-stone/50">
            <BodySelector />
          </div>

          <HeadSelector />

          <ArmorSelector />

          {/* Texture selectors */}
          <div className="pt-2 border-t border-gothic-stone/50">
            <BodyTextureSelector />
          </div>

          <HeadTextureSelector />

          <SkinColorSelector />

          {/* Body modifiers */}
          <div className="pt-2 border-t border-gothic-stone/50">
            <FatnessSlider />
          </div>

          <HeadOffsetSlider />
        </div>
      </div>
    </aside>
  )
}
