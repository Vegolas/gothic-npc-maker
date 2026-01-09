import { useNPCStore } from '../../stores/npcStore'
import { SliderNew } from '../ui/slider-new'
import { InputNew } from '../ui/input-new'

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
          min={0}
          max={200}
          step={5}
          value={[config.strength]}
          onValueChange={([value]) => store.setStrength(value)}
          showValue={false}
        />
        <InputNew
          type="number"
          value={config.strength}
          onChange={(e) => store.setStrength(parseInt(e.target.value) || 0)}
          min={0}
          className="text-center"
        />
      </div>

      {/* Dexterity */}
      <div className="grid grid-cols-[1fr,70px] gap-3 items-end">
        <SliderNew
          label="Dexterity"
          min={0}
          max={200}
          step={5}
          value={[config.dexterity]}
          onValueChange={([value]) => store.setDexterity(value)}
          showValue={false}
        />
        <InputNew
          type="number"
          value={config.dexterity}
          onChange={(e) => store.setDexterity(parseInt(e.target.value) || 0)}
          min={0}
          className="text-center"
        />
      </div>

      {/* Mana */}
      <div className="grid grid-cols-[1fr,70px] gap-3 items-end">
        <SliderNew
          label="Mana"
          min={0}
          max={500}
          step={10}
          value={[config.manaMax]}
          onValueChange={([value]) => store.setManaMax(value)}
          showValue={false}
        />
        <InputNew
          type="number"
          value={config.manaMax}
          onChange={(e) => store.setManaMax(parseInt(e.target.value) || 0)}
          min={0}
          className="text-center"
        />
      </div>

      {/* Hitpoints */}
      <div className="grid grid-cols-[1fr,70px] gap-3 items-end">
        <SliderNew
          label="Hitpoints"
          min={1}
          max={1000}
          step={10}
          value={[config.hitpointsMax]}
          onValueChange={([value]) => store.setHitpointsMax(value)}
          showValue={false}
        />
        <InputNew
          type="number"
          value={config.hitpointsMax}
          onChange={(e) => store.setHitpointsMax(parseInt(e.target.value) || 1)}
          min={1}
          className="text-center"
        />
      </div>
    </div>
  )
}
