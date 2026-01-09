import { useEffect } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import { discoverArmors } from '../../utils/assetDiscovery'
import { cn } from '../../lib/utils'
import {
  useThumbnailStore,
  getArmorThumbnailKey,
} from '../../stores/thumbnailStore'
import { queueArmorThumbnail } from '../preview/ThumbnailRenderer'
import type { GameVersion } from '../../types/npc'

/**
 * Armor selector component
 * Visual card-based selector with cached thumbnail previews
 * Hidden for G1 Female (armors don't work with G1 females)
 */
export function ArmorSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const gender = useNPCStore((state) => state.config.gender)
  const armorInstance = useNPCStore((state) => state.config.armorInstance)
  const setArmorInstance = useNPCStore((state) => state.setArmorInstance)

  // Hide armor selector for G1 Female (armors don't work)
  if (gameVersion === 'g1' && gender === 'female') {
    return null
  }

  const armors = discoverArmors(gameVersion)

  // Queue thumbnail generation for all armors
  useEffect(() => {
    armors.forEach((armor) => {
      queueArmorThumbnail(armor.id, armor.path, gameVersion)
    })
  }, [armors, gameVersion])

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-text-primary">
        Armor
      </label>
      <div className="grid grid-cols-8 gap-1 max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-iron-dark scrollbar-track-obsidian p-2">
        {/* No Armor option */}
        <NoArmorCard
          isSelected={armorInstance === null}
          onClick={() => setArmorInstance(null)}
        />
        {/* Armor options */}
        {armors.map((armor) => (
          <ArmorCard
            key={armor.id}
            id={armor.id}
            name={armor.name}
            path={armor.path}
            isSelected={armorInstance === armor.id}
            onClick={() => setArmorInstance(armor.id)}
            gameVersion={gameVersion}
          />
        ))}
      </div>
    </div>
  )
}

interface NoArmorCardProps {
  isSelected: boolean
  onClick: () => void
}

function NoArmorCard({ isSelected, onClick }: NoArmorCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded-lg border-2 overflow-hidden transition-all",
        "hover:scale-105 hover:shadow-lg",
        "flex items-center justify-center",
        isSelected
          ? "border-ember shadow-md shadow-ember/20 bg-obsidian-dark"
          : "border-iron-dark hover:border-iron bg-obsidian"
      )}
    >
      {/* No armor icon */}
      <div className="absolute inset-0 flex items-center justify-center bg-obsidian-darker">
        <svg
          className="w-8 h-8 text-iron opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker via-obsidian-darker/90 to-transparent p-0.5 pt-3">
        <p className="text-[10px] font-medium text-text-primary truncate text-center leading-tight">
          None
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0.5 right-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-ember flex items-center justify-center">
            <svg className="w-1.5 h-1.5 text-obsidian-darker" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </button>
  )
}

interface ArmorCardProps {
  id: string
  name: string
  path: string
  isSelected: boolean
  onClick: () => void
  gameVersion: GameVersion
}

function ArmorCard({ id, name, isSelected, onClick, gameVersion }: ArmorCardProps) {
  const thumbnailKey = getArmorThumbnailKey(id, gameVersion)
  const thumbnail = useThumbnailStore((state) => state.getThumbnail(thumbnailKey))
  const isPending = useThumbnailStore((state) => state.isPending(thumbnailKey))

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded-lg border-2 overflow-hidden transition-all",
        "hover:scale-105 hover:shadow-lg",
        isSelected
          ? "border-ember shadow-md shadow-ember/20 bg-obsidian-dark"
          : "border-iron-dark hover:border-iron bg-obsidian"
      )}
    >
      {/* Thumbnail Preview */}
      <div className="absolute inset-0 flex items-center justify-center bg-obsidian-darker">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : isPending ? (
          <div className="w-6 h-6 border-2 border-ember/30 border-t-ember rounded-full animate-spin" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-stone/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
        )}
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker via-obsidian-darker/90 to-transparent p-0.5 pt-3">
        <p className="text-[10px] font-medium text-text-primary truncate text-center leading-tight">
          {formatArmorName(name)}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0.5 right-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-ember flex items-center justify-center">
            <svg className="w-1.5 h-1.5 text-obsidian-darker" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </button>
  )
}

/**
 * Format armor name for display in the card
 * Truncates long names and removes common prefixes
 */
function formatArmorName(name: string): string {
  // Remove common prefixes
  let formatted = name
    .replace(/^ITAR /i, '')
    .replace(/^YOURH /i, '')
    .replace(/^VLK /i, 'V.')
    .replace(/^MIL /i, 'M.')
    .replace(/^KDF /i, 'K.')
    .replace(/^NOV /i, 'N.')
    .replace(/^PAL /i, 'P.')
    .replace(/^SLD /i, 'S.')
    .replace(/^BAU /i, 'B.')
    .replace(/^PIR /i, 'Pi.')
    .replace(/^DJG /i, 'D.')
    .replace(/^BDT /i, 'Bd.')
    .replace(/YOURHANNES/i, 'YH')

  // Truncate if still too long
  if (formatted.length > 8) {
    formatted = formatted.substring(0, 7) + '…'
  }

  return formatted
}
