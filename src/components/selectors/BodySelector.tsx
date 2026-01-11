import { useEffect } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import { discoverBodies } from '../../utils/assetDiscovery'
import { cn } from '../../lib/utils'
import {
  useThumbnailStore,
  getBodyThumbnailKey,
} from '../../stores/thumbnailStore'
import { queueBodyThumbnail } from '../preview/ThumbnailRenderer'
import type { GameVersion, Gender } from '../../types/npc'

/**
 * Body mesh selector component
 * Visual card-based selector with cached thumbnail previews
 * Dynamically discovers available bodies based on selected gender and game version
 * Hidden if only one body option exists
 */
export function BodySelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const bodyMesh = useNPCStore((state) => state.config.bodyMesh)
  const setBodyMesh = useNPCStore((state) => state.setBodyMesh)

  const bodies = discoverBodies(gameVersion, gender)

  // Queue thumbnail generation for all bodies
  useEffect(() => {
    bodies.forEach((body) => {
      queueBodyThumbnail(body.id, body.path, gameVersion, gender)
    })
  }, [bodies, gameVersion, gender])

  // Hide selector if only one option
  if (bodies.length <= 1) {
    return null
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-text-primary">
        Body Type
      </label>
      <div className="grid grid-cols-8 gap-1">
        {bodies.map((body) => (
          <BodyCard
            key={body.id}
            id={body.id}
            name={body.name}
            path={body.path}
            isSelected={bodyMesh === body.id}
            onClick={() => setBodyMesh(body.id)}
            gameVersion={gameVersion}
            gender={gender}
          />
        ))}
      </div>
    </div>
  )
}

interface BodyCardProps {
  id: string
  name: string
  path: string
  isSelected: boolean
  onClick: () => void
  gameVersion: GameVersion
  gender: Gender
}

function BodyCard({ id, name, isSelected, onClick, gameVersion, gender }: BodyCardProps) {
  const thumbnailKey = getBodyThumbnailKey(id, gameVersion, gender)
  const thumbnail = useThumbnailStore((state) => state.getThumbnail(thumbnailKey))
  const isPending = useThumbnailStore((state) => state.isPending(thumbnailKey))

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded border overflow-hidden transition-all",
        "hover:scale-105 hover:shadow-md",
        isSelected
          ? "border-ember shadow-sm shadow-ember/20 bg-obsidian-dark"
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
          <div className="w-4 h-4 border-2 border-ember/30 border-t-ember rounded-full animate-spin" />
        ) : (
          <div className="w-5 h-5 rounded-full bg-stone/30 flex items-center justify-center">
            <svg className="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        )}
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker via-obsidian-darker/90 to-transparent px-0.5 pb-0.5 pt-2">
        <p className="text-[8px] font-medium text-text-primary text-center leading-tight break-words">
          {formatBodyName(name)}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0.5 right-0.5">
          <div className="w-2 h-2 rounded-full bg-ember flex items-center justify-center">
            <svg className="w-1 h-1 text-obsidian-darker" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </button>
  )
}

/**
 * Format body name for display in the card
 */
function formatBodyName(name: string): string {
  // Remove common prefixes and clean up
  let formatted = name
    .replace(/^HUM BODY /i, '')
    .replace(/^BABE /i, '')
    .replace(/\d+$/, '') // Remove trailing numbers
    .trim()

  // Capitalize first letter
  if (formatted.length > 0) {
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase()
  }

  return formatted || name
}
