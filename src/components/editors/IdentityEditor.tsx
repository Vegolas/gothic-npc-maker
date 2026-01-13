import { useState, useEffect } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import { getGuilds } from '../../data/guilds'
import { getFightTactics } from '../../data/fightTactics'
import { ATTRIBUTE_RANGES, NPC_TYPES } from '../../config/constants'
import { InputNew } from '../ui/input-new'
import { SliderNew } from '../ui/slider-new'
import { VoiceSelector } from '../selectors'
import { Separator } from '../ui/separator'
import { ComboBox } from '../ui/combo-box'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select-new'

/**
 * Identity editor component
 * Edits NPC identity, attributes, and combat settings
 */
export function IdentityEditor() {
  const config = useNPCStore((state) => state.config)
  const store = useNPCStore()
  const [guilds, setGuilds] = useState<string[]>([])
  const [tactics, setTactics] = useState<string[]>([])

  // Load guilds and tactics when game version changes
  useEffect(() => {
    getGuilds(config.gameVersion).then(setGuilds)
    getFightTactics(config.gameVersion).then(setTactics)
  }, [config.gameVersion])

  return (
    <div className="space-y-5">
      {/* IDENTITY SECTION */}
      <div>
        <h3 className="text-xs font-display text-ember uppercase tracking-wider mb-3">
          Identity
        </h3>
        <div className="space-y-4">
          {/* Instance name (Daedalus identifier) */}
          <InputNew
            label="Instance Name"
            value={config.instanceName}
            onChange={(e) => store.setInstanceName(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '_'))}
            placeholder="NPC_001"
            className="font-mono"
          />

          {/* Display name (in-game) */}
          <InputNew
            label="Display Name"
            value={config.displayName}
            onChange={(e) => store.setDisplayName(e.target.value)}
            placeholder="Guard"
          />

          {/* Two-column layout for selects */}
          <div className="grid grid-cols-2 gap-3">
            <Select value={config.guild} onValueChange={(value) => store.setGuild(value)}>
              <SelectTrigger label="Guild">
                <SelectValue placeholder="Select guild" />
              </SelectTrigger>
              <SelectContent>
                {guilds.map((guildId) => (
                  <SelectItem key={guildId} value={guildId}>
                    {guildId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={config.npcType} onValueChange={(value) => store.setNPCType(value as typeof NPC_TYPES[number])}>
              <SelectTrigger label="NPC Type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {NPC_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Number inputs */}
          <div className="grid grid-cols-2 gap-3">
            <InputNew
              label="Level"
              type="number"
              value={config.level}
              onChange={(e) => store.setLevel(parseInt(e.target.value) || 1)}
              min={1}
            />

            <InputNew
              label="ID"
              type="number"
              value={config.id}
              onChange={(e) => store.setId(parseInt(e.target.value) || 0)}
              min={0}
            />
          </div>

          {/* Voice set with preview */}
          <VoiceSelector />
        </div>
      </div>

      <Separator />

      {/* ATTRIBUTES SECTION */}
      <div>
        <h3 className="text-xs font-display text-ember uppercase tracking-wider mb-3">
          Attributes
        </h3>
        <div className="space-y-4">
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
      </div>

      <Separator />

      {/* COMBAT SECTION */}
      <div>
        <h3 className="text-xs font-display text-ember uppercase tracking-wider mb-3">
          Combat
        </h3>
        <ComboBox
          label="Fight Tactic"
          value={config.fightTactic}
          onChange={(value) => store.setFightTactic(value)}
          suggestions={tactics}
          placeholder="Type or select tactic"
        />
      </div>
    </div>
  )
}
