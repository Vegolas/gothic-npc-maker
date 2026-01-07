import { useNPCStore } from '../../stores/npcStore'
import type { Gender } from '../../types/npc'

/**
 * Gender selector component
 * Toggles between male and female, updating related defaults
 */
export function GenderSelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const setGender = useNPCStore((state) => state.setGender)

  const handleGenderChange = (newGender: Gender) => {
    if (newGender !== gender) {
      setGender(newGender)
    }
  }

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide">
        Gender
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => handleGenderChange('male')}
          className={`
            flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
            ${gender === 'male'
              ? 'bg-gothic-gold text-gothic-dark'
              : 'bg-gothic-dark border border-gothic-stone text-gray-300 hover:bg-gothic-stone/30'
            }
          `}
        >
          Male
        </button>
        <button
          onClick={() => handleGenderChange('female')}
          className={`
            flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
            ${gender === 'female'
              ? 'bg-gothic-gold text-gothic-dark'
              : 'bg-gothic-dark border border-gothic-stone text-gray-300 hover:bg-gothic-stone/30'
            }
          `}
        >
          Female
        </button>
      </div>
    </div>
  )
}
