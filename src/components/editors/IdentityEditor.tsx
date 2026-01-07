import { useNPCStore } from '../../stores/npcStore'
import { HUMAN_GUILDS } from '../../data/guilds'
import { getVoiceSetsByGender } from '../../data/voiceSets'
import { Input } from '../ui/Input'
import { Select, type SelectOption } from '../ui/Select'

/**
 * Identity editor component
 * Edits NPC name, instance, guild, level, voice, and ID
 */
export function IdentityEditor() {
  const config = useNPCStore((state) => state.config)
  const store = useNPCStore()

  // Guild options
  const guildOptions: SelectOption[] = HUMAN_GUILDS.map((guild) => ({
    value: guild.id,
    label: guild.name,
  }))

  // Voice options based on gender
  const voiceSets = getVoiceSetsByGender(config.gender)
  const voiceOptions: SelectOption[] = voiceSets.map((voice) => ({
    value: String(voice.id),
    label: voice.name,
  }))

  // NPC type options
  const npcTypeOptions: SelectOption[] = [
    { value: 'main', label: 'Main' },
    { value: 'ambient', label: 'Ambient' },
    { value: 'friend', label: 'Friend' },
  ]

  return (
    <div className="space-y-3">
      {/* Instance name (Daedalus identifier) */}
      <Input
        label="Instance Name"
        value={config.instanceName}
        onChange={(e) => store.setInstanceName(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '_'))}
        placeholder="NPC_001"
      />

      {/* Display name (in-game) */}
      <Input
        label="Display Name"
        value={config.displayName}
        onChange={(e) => store.setDisplayName(e.target.value)}
        placeholder="Guard"
      />

      {/* Two-column layout for smaller inputs */}
      <div className="grid grid-cols-2 gap-2">
        <Select
          label="Guild"
          options={guildOptions}
          value={config.guild}
          onChange={(e) => store.setGuild(e.target.value)}
        />

        <Select
          label="NPC Type"
          options={npcTypeOptions}
          value={config.npcType}
          onChange={(e) => store.setNPCType(e.target.value as 'main' | 'ambient' | 'friend')}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Level"
          type="number"
          value={config.level}
          onChange={(e) => store.setLevel(parseInt(e.target.value) || 1)}
          min={1}
        />

        <Input
          label="ID"
          type="number"
          value={config.id}
          onChange={(e) => store.setId(parseInt(e.target.value) || 0)}
          min={0}
        />
      </div>

      <Select
        label="Voice Set"
        options={voiceOptions}
        value={String(config.voice)}
        onChange={(e) => store.setVoice(parseInt(e.target.value))}
      />
    </div>
  )
}
