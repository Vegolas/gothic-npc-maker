import { useNPCStore } from '../../stores/npcStore'
import { Input } from '../ui/Input'
import { Slider } from '../ui/Slider'

/**
 * Attribute editor component
 * Edits NPC attributes: STR, DEX, MANA, HP
 */
export function AttributeEditor() {
  const config = useNPCStore((state) => state.config)
  const store = useNPCStore()

  return (
    <div className="space-y-3">
      {/* Strength */}
      <div className="grid grid-cols-[1fr,60px] gap-2 items-end">
        <Slider
          label="Strength"
          min={0}
          max={200}
          step={5}
          value={config.strength}
          onChange={(e) => store.setStrength(parseInt(e.target.value))}
          showValue={false}
        />
        <Input
          type="number"
          value={config.strength}
          onChange={(e) => store.setStrength(parseInt(e.target.value) || 0)}
          min={0}
          className="text-center"
        />
      </div>

      {/* Dexterity */}
      <div className="grid grid-cols-[1fr,60px] gap-2 items-end">
        <Slider
          label="Dexterity"
          min={0}
          max={200}
          step={5}
          value={config.dexterity}
          onChange={(e) => store.setDexterity(parseInt(e.target.value))}
          showValue={false}
        />
        <Input
          type="number"
          value={config.dexterity}
          onChange={(e) => store.setDexterity(parseInt(e.target.value) || 0)}
          min={0}
          className="text-center"
        />
      </div>

      {/* Mana */}
      <div className="grid grid-cols-[1fr,60px] gap-2 items-end">
        <Slider
          label="Mana"
          min={0}
          max={500}
          step={10}
          value={config.manaMax}
          onChange={(e) => store.setManaMax(parseInt(e.target.value))}
          showValue={false}
        />
        <Input
          type="number"
          value={config.manaMax}
          onChange={(e) => store.setManaMax(parseInt(e.target.value) || 0)}
          min={0}
          className="text-center"
        />
      </div>

      {/* Hitpoints */}
      <div className="grid grid-cols-[1fr,60px] gap-2 items-end">
        <Slider
          label="Hitpoints"
          min={1}
          max={1000}
          step={10}
          value={config.hitpointsMax}
          onChange={(e) => store.setHitpointsMax(parseInt(e.target.value))}
          showValue={false}
        />
        <Input
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
