import { useNPCStore } from '../../stores/npcStore'
import { SliderNew } from '../ui/slider-new'
import { InputNew } from '../ui/input-new'
import { ATTRIBUTE_RANGES } from '../../config/constants'

/**
 * Attribute editor component
 * Edits NPC attributes: STR, DEX, MANA, HP
 */
export function AttributeEditor() {
  const config = useNPCStore((state) => state.config)
  const store = useNPCStore()

  return (
    <div className="space-y-5">
      {/* Strength */}
      <div className="grid grid-cols-[1fr,70px] gap-3 items-end">
        <SliderNew
          label="Strength"
          min={ATTRIBUTE_RANGES.strength.min}
          max={ATTRIBUTE_RANGES.strength.max}
          step={ATTRIBUTE_RANGES.strength.step}
          value={[config.strength]}
          onValueChange={([value]) => store.setStrength(value)}
          showValue={false}
        />
        <InputNew
          type="number"
          value={config.strength}
          onChange={(e) => store.setStrength(parseInt(e.target.value) || 0)}
          min={ATTRIBUTE_RANGES.strength.min}
          className="text-center"
        />
      </div>

      {/* Dexterity */}
      <div className="grid grid-cols-[1fr,70px] gap-3 items-end">
        <SliderNew
          label="Dexterity"
          min={ATTRIBUTE_RANGES.dexterity.min}
          max={ATTRIBUTE_RANGES.dexterity.max}
          step={ATTRIBUTE_RANGES.dexterity.step}
          value={[config.dexterity]}
          onValueChange={([value]) => store.setDexterity(value)}
          showValue={false}
        />
        <InputNew
          type="number"
          value={config.dexterity}
          onChange={(e) => store.setDexterity(parseInt(e.target.value) || 0)}
          min={ATTRIBUTE_RANGES.dexterity.min}
          className="text-center"
        />
      </div>

      {/* Mana */}
      <div className="grid grid-cols-[1fr,70px] gap-3 items-end">
        <SliderNew
          label="Mana"
          min={ATTRIBUTE_RANGES.mana.min}
          max={ATTRIBUTE_RANGES.mana.max}
          step={ATTRIBUTE_RANGES.mana.step}
          value={[config.manaMax]}
          onValueChange={([value]) => store.setManaMax(value)}
          showValue={false}
        />
        <InputNew
          type="number"
          value={config.manaMax}
          onChange={(e) => store.setManaMax(parseInt(e.target.value) || 0)}
          min={ATTRIBUTE_RANGES.mana.min}
          className="text-center"
        />
      </div>

      {/* Hitpoints */}
      <div className="grid grid-cols-[1fr,70px] gap-3 items-end">
        <SliderNew
          label="Hitpoints"
          min={ATTRIBUTE_RANGES.hitpoints.min}
          max={ATTRIBUTE_RANGES.hitpoints.max}
          step={ATTRIBUTE_RANGES.hitpoints.step}
          value={[config.hitpointsMax]}
          onValueChange={([value]) => store.setHitpointsMax(value)}
          showValue={false}
        />
        <InputNew
          type="number"
          value={config.hitpointsMax}
          onChange={(e) => store.setHitpointsMax(parseInt(e.target.value) || 1)}
          min={ATTRIBUTE_RANGES.hitpoints.min}
          className="text-center"
        />
      </div>
    </div>
  )
}
