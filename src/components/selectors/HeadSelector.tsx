import { useEffect } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import { discoverHeads } from '../../utils/assetDiscovery'
import { cn } from '../../lib/utils'
import {
  useThumbnailStore,
  getHeadThumbnailKey,
} from '../../stores/thumbnailStore'
import { queueHeadThumbnail } from '../preview/ThumbnailRenderer'
import type { GameVersion, Gender } from '../../types/npc'

/**
 * Head mesh selector component
 * Visual card-based selector with cached thumbnail previews
 * Hidden if only one head option exists
 */
export function HeadSelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const headMesh = useNPCStore((state) => state.config.headMesh)
  const headTextureVariant = useNPCStore((state) => state.config.headTexture)
  const skinColor = useNPCStore((state) => state.config.skinColor)
  const setHeadMesh = useNPCStore((state) => state.setHeadMesh)

  const heads = discoverHeads(gameVersion, gender)

  // Queue thumbnail generation for all heads
  useEffect(() => {
    heads.forEach((head) => {
      queueHeadThumbnail(
        head.id,
        head.path,
        headTextureVariant,
        skinColor,
        gender,
        gameVersion
      )
    })
  }, [heads, headTextureVariant, skinColor, gender, gameVersion])

  // Hide selector if only one option
  if (heads.length <= 1) {
    return null
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-text-primary">
        Head Type
      </label>
      <div className="grid grid-cols-8 gap-1 max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-iron-dark scrollbar-track-obsidian p-2">
        {heads.map((head) => (
          <HeadCard
            key={head.id}
            id={head.id}
            name={head.name}
            path={head.path}
            isSelected={headMesh === head.id}
            onClick={() => setHeadMesh(head.id)}
            textureVariant={headTextureVariant}
            skinColor={skinColor}
            gender={gender}
            gameVersion={gameVersion}
          />
        ))}
      </div>
    </div>
  )
}

interface HeadCardProps {
  id: string
  name: string
  path: string
  isSelected: boolean
  onClick: () => void
  textureVariant: number
  skinColor: number
  gender: Gender
  gameVersion: GameVersion
}

function HeadCard({
  id,
  name,
  isSelected,
  onClick,
  textureVariant,
  skinColor,
  gender,
  gameVersion
}: HeadCardProps) {
  const thumbnailKey = getHeadThumbnailKey(id, textureVariant, skinColor, gameVersion, gender)
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker via-obsidian-darker/90 to-transparent p-0.5 pt-3">
        <p className="text-[12px] font-medium text-text-primary truncate text-center leading-tight">
          {name.replace('HUM HEAD ', '').substring(0, 6)}
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
