import { useState, useEffect } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import {
  discoverBodyTextureFiles,
  discoverHeadTextureFiles,
  discoverBodyTextureVariants,
  discoverHeadVariantsForSkinColor,
  getBodyDirectory,
} from '../../utils/assetDiscovery'
import { getBodyTexturePath, getHeadTexturePath } from '../../utils/assetPaths'
import { SliderNew } from '../ui/slider-new'
import { Switch } from '../ui/switch'
import { cn } from '../../lib/utils'
import type { GameVersion, Gender } from '../../types/npc'

/**
 * Unified texture selector with smart filtering
 * Supports both slider and card-based views
 */
export function TextureSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const gender = useNPCStore((state) => state.config.gender)

  // G1 Female uses file-based selection
  const isG1Female = gameVersion === 'g1' && gender === 'female'

  // Render appropriate selector (no early return to avoid hooks issues)
  return isG1Female ? <G1FemaleTextureSelector /> : <StandardTextureSelector />
}

/**
 * G1 Female texture selector - file-based with card/slider switch
 */
function G1FemaleTextureSelector() {
  const [useCardView, setUseCardView] = useState(true)

  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const gender = useNPCStore((state) => state.config.gender)
  const bodyMesh = useNPCStore((state) => state.config.bodyMesh)
  const headMesh = useNPCStore((state) => state.config.headMesh)
  const bodyTextureFile = useNPCStore((state) => state.config.bodyTextureFile)
  const headTextureFile = useNPCStore((state) => state.config.headTextureFile)
  const setBodyTextureFile = useNPCStore((state) => state.setBodyTextureFile)
  const setHeadTextureFile = useNPCStore((state) => state.setHeadTextureFile)

  const bodyTextureFiles = discoverBodyTextureFiles(bodyMesh, gameVersion, gender)
  const headTextureFiles = discoverHeadTextureFiles(headMesh, gameVersion, gender)

  const bodyDirectory = getBodyDirectory(bodyMesh, gameVersion, gender)

  const bodyIndex = bodyTextureFile && bodyTextureFiles.length > 0
    ? bodyTextureFiles.indexOf(bodyTextureFile)
    : 0
  const safeBodyIndex = bodyIndex >= 0 && bodyIndex < bodyTextureFiles.length ? bodyIndex : 0

  const headIndex = headTextureFile && headTextureFiles.length > 0
    ? headTextureFiles.indexOf(headTextureFile)
    : 0
  const safeHeadIndex = headIndex >= 0 && headIndex < headTextureFiles.length ? headIndex : 0

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">View Mode</span>
        <Switch
          checked={useCardView}
          onCheckedChange={setUseCardView}
          label={useCardView ? 'Cards' : 'Sliders'}
        />
      </div>

      {useCardView ? (
        <G1FemaleCardView
          bodyTextureFiles={bodyTextureFiles}
          headTextureFiles={headTextureFiles}
          bodyTextureFile={bodyTextureFile}
          headTextureFile={headTextureFile}
          setBodyTextureFile={setBodyTextureFile}
          setHeadTextureFile={setHeadTextureFile}
          bodyDirectory={bodyDirectory}
          gameVersion={gameVersion}
          gender={gender}
        />
      ) : (
        <G1FemaleSliderView
          bodyTextureFiles={bodyTextureFiles}
          headTextureFiles={headTextureFiles}
          safeBodyIndex={safeBodyIndex}
          safeHeadIndex={safeHeadIndex}
          setBodyTextureFile={setBodyTextureFile}
          setHeadTextureFile={setHeadTextureFile}
        />
      )}
    </div>
  )
}

interface G1FemaleSliderViewProps {
  bodyTextureFiles: string[]
  headTextureFiles: string[]
  safeBodyIndex: number
  safeHeadIndex: number
  setBodyTextureFile: (file: string | null) => void
  setHeadTextureFile: (file: string | null) => void
}

function G1FemaleSliderView({
  bodyTextureFiles,
  headTextureFiles,
  safeBodyIndex,
  safeHeadIndex,
  setBodyTextureFile,
  setHeadTextureFile,
}: G1FemaleSliderViewProps) {
  return (
    <div className="space-y-4">
      {bodyTextureFiles.length > 0 ? (
        <div className="space-y-2">
          <SliderNew
            label="Body Texture"
            min={0}
            max={Math.max(0, bodyTextureFiles.length - 1)}
            step={1}
            value={[safeBodyIndex]}
            onValueChange={([value]) => setBodyTextureFile(bodyTextureFiles[value] || null)}
            valueFormat={(v) => `${v + 1}/${bodyTextureFiles.length}`}
          />
          {bodyTextureFiles[safeBodyIndex] && (
            <TextureFileDisplay filename={bodyTextureFiles[safeBodyIndex]} />
          )}
        </div>
      ) : (
        <div className="text-xs text-text-muted">No body textures found</div>
      )}

      {headTextureFiles.length > 0 ? (
        <div className="space-y-2">
          <SliderNew
            label="Head Texture"
            min={0}
            max={Math.max(0, headTextureFiles.length - 1)}
            step={1}
            value={[safeHeadIndex]}
            onValueChange={([value]) => setHeadTextureFile(headTextureFiles[value] || null)}
            valueFormat={(v) => `${v + 1}/${headTextureFiles.length}`}
          />
          {headTextureFiles[safeHeadIndex] && (
            <TextureFileDisplay filename={headTextureFiles[safeHeadIndex]} />
          )}
        </div>
      ) : (
        <div className="text-xs text-text-muted">No head textures found</div>
      )}
    </div>
  )
}

interface G1FemaleCardViewProps {
  bodyTextureFiles: string[]
  headTextureFiles: string[]
  bodyTextureFile: string | null
  headTextureFile: string | null
  setBodyTextureFile: (file: string | null) => void
  setHeadTextureFile: (file: string | null) => void
  bodyDirectory: string | null
  gameVersion: GameVersion
  gender: Gender
}

function G1FemaleCardView({
  bodyTextureFiles,
  headTextureFiles,
  bodyTextureFile,
  headTextureFile,
  setBodyTextureFile,
  setHeadTextureFile,
  bodyDirectory,
  gameVersion,
  gender,
}: G1FemaleCardViewProps) {
  return (
    <div className="space-y-4">
      {/* Body Texture Cards */}
      {bodyTextureFiles.length > 0 ? (
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-text-muted uppercase tracking-wide">
            Body Texture
          </label>
          <div className="grid grid-cols-8 gap-1 max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-iron-dark scrollbar-track-obsidian p-1 rounded">
            {bodyTextureFiles.map((filename) => (
              <TextureFileCard
                key={filename}
                filename={filename}
                isSelected={bodyTextureFile === filename}
                onClick={() => setBodyTextureFile(filename)}
                texturePath={bodyDirectory
                  ? `${import.meta.env.BASE_URL}assets/${gameVersion}/${gender}/bodies/${bodyDirectory}/${filename}`
                  : null
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs text-text-muted">No body textures found</div>
      )}

      {/* Head Texture Cards */}
      {headTextureFiles.length > 0 ? (
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-text-muted uppercase tracking-wide">
            Head Texture
          </label>
          <div className="grid grid-cols-8 gap-1 max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-iron-dark scrollbar-track-obsidian p-1 rounded">
            {headTextureFiles.map((filename) => (
              <TextureFileCard
                key={filename}
                filename={filename}
                isSelected={headTextureFile === filename}
                onClick={() => setHeadTextureFile(filename)}
                texturePath={`${import.meta.env.BASE_URL}assets/${gameVersion}/${gender}/textures/head/${filename}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs text-text-muted">No head textures found</div>
      )}
    </div>
  )
}

interface TextureFileCardProps {
  filename: string
  isSelected: boolean
  onClick: () => void
  texturePath: string | null
}

function TextureFileCard({
  filename,
  isSelected,
  onClick,
  texturePath,
}: TextureFileCardProps) {
  // Extract a short label from filename (e.g., "BAB_BODY_V0_C0.PNG" -> "V0_C0")
  const labelMatch = filename.match(/_V(\d+)(?:_C(\d+))?\./)
  const label = labelMatch
    ? `V${labelMatch[1]}${labelMatch[2] !== undefined ? `_C${labelMatch[2]}` : ''}`
    : filename.replace(/\.[^.]+$/, '').slice(-8)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded border overflow-hidden transition-all",
        "hover:scale-105 hover:shadow-md",
        isSelected
          ? "border-ember shadow-sm shadow-ember/20 ring-1 ring-ember"
          : "border-iron-dark/50 hover:border-iron"
      )}
      title={filename}
    >
      {/* Texture Preview */}
      <div className="absolute inset-0 bg-obsidian-darker">
        {texturePath ? (
          <img
            src={texturePath}
            alt={filename}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[8px] text-text-muted">{label}</span>
          </div>
        )}
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker/90 to-transparent px-0.5 pb-0.5 pt-1">
        <p className="text-[8px] font-medium text-text-primary text-center truncate">
          {label}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0 right-0">
          <div className="w-1.5 h-1.5 rounded-full bg-ember" />
        </div>
      )}
    </button>
  )
}

/**
 * Standard texture selector - variant-based with skin color
 * Supports both slider and card-based views
 */
function StandardTextureSelector() {
  const [useCardView, setUseCardView] = useState(true)

  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const gender = useNPCStore((state) => state.config.gender)
  const bodyMesh = useNPCStore((state) => state.config.bodyMesh)
  const headMesh = useNPCStore((state) => state.config.headMesh)
  const bodyTextureVariant = useNPCStore((state) => state.config.bodyTexture)
  const headTextureVariant = useNPCStore((state) => state.config.headTexture)
  const skinColor = useNPCStore((state) => state.config.skinColor)
  const setBodyTextureVariant = useNPCStore((state) => state.setBodyTexture)
  const setHeadTextureVariant = useNPCStore((state) => state.setHeadTexture)
  const setSkinColor = useNPCStore((state) => state.setSkinColor)

  // Body-specific texture discovery - gets variants and skin colors for the selected body mesh
  const bodyTextureInfo = discoverBodyTextureVariants(bodyMesh, gameVersion, gender)
  const availableSkinColors = bodyTextureInfo.skinColors
  const availableBodyVariants = bodyTextureInfo.variants
  const availableHeadVariants = discoverHeadVariantsForSkinColor(headMesh, skinColor, gameVersion, gender)

  // Auto-adjust if current selections are out of range
  useEffect(() => {
    if (availableSkinColors.length > 0 && !availableSkinColors.includes(skinColor)) {
      setSkinColor(availableSkinColors[0])
    }
  }, [availableSkinColors, skinColor, setSkinColor])

  useEffect(() => {
    if (availableBodyVariants.length > 0 && !availableBodyVariants.includes(bodyTextureVariant)) {
      setBodyTextureVariant(availableBodyVariants[0])
    }
  }, [availableBodyVariants, bodyTextureVariant, setBodyTextureVariant])

  useEffect(() => {
    if (availableHeadVariants.length > 0 && !availableHeadVariants.includes(headTextureVariant)) {
      setHeadTextureVariant(availableHeadVariants[0])
    }
  }, [availableHeadVariants, headTextureVariant, setHeadTextureVariant])

  if (availableSkinColors.length === 0) {
    return <div className="text-xs text-text-muted">No textures found for {bodyMesh}</div>
  }

  const skinColorIndex = availableSkinColors.indexOf(skinColor)
  const safeSkinColorIndex = skinColorIndex >= 0 ? skinColorIndex : 0

  const bodyVariantIndex = availableBodyVariants.indexOf(bodyTextureVariant)
  const safeBodyVariantIndex = bodyVariantIndex >= 0 ? bodyVariantIndex : 0

  const headVariantIndex = availableHeadVariants.indexOf(headTextureVariant)
  const safeHeadVariantIndex = headVariantIndex >= 0 ? headVariantIndex : 0

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">View Mode</span>
        <Switch
          checked={useCardView}
          onCheckedChange={setUseCardView}
          label={useCardView ? 'Cards' : 'Sliders'}
        />
      </div>

      {useCardView ? (
        <CardBasedSelector
          availableSkinColors={availableSkinColors}
          availableBodyVariants={availableBodyVariants}
          availableHeadVariants={availableHeadVariants}
          skinColor={skinColor}
          bodyTextureVariant={bodyTextureVariant}
          headTextureVariant={headTextureVariant}
          setSkinColor={setSkinColor}
          setBodyTextureVariant={setBodyTextureVariant}
          setHeadTextureVariant={setHeadTextureVariant}
          bodyMesh={bodyMesh}
          headMesh={headMesh}
          gameVersion={gameVersion}
          gender={gender}
        />
      ) : (
        <SliderBasedSelector
          availableSkinColors={availableSkinColors}
          availableBodyVariants={availableBodyVariants}
          availableHeadVariants={availableHeadVariants}
          safeSkinColorIndex={safeSkinColorIndex}
          safeBodyVariantIndex={safeBodyVariantIndex}
          safeHeadVariantIndex={safeHeadVariantIndex}
          setSkinColor={(index) => setSkinColor(availableSkinColors[index])}
          setBodyTextureVariant={(index) => setBodyTextureVariant(availableBodyVariants[index])}
          setHeadTextureVariant={(index) => setHeadTextureVariant(availableHeadVariants[index])}
        />
      )}
    </div>
  )
}

interface SliderBasedSelectorProps {
  availableSkinColors: number[]
  availableBodyVariants: number[]
  availableHeadVariants: number[]
  safeSkinColorIndex: number
  safeBodyVariantIndex: number
  safeHeadVariantIndex: number
  setSkinColor: (index: number) => void
  setBodyTextureVariant: (index: number) => void
  setHeadTextureVariant: (index: number) => void
}

function SliderBasedSelector({
  availableSkinColors,
  availableBodyVariants,
  availableHeadVariants,
  safeSkinColorIndex,
  safeBodyVariantIndex,
  safeHeadVariantIndex,
  setSkinColor,
  setBodyTextureVariant,
  setHeadTextureVariant,
}: SliderBasedSelectorProps) {
  return (
    <div className="space-y-4">
      <SliderNew
        label="Skin Color"
        min={0}
        max={Math.max(0, availableSkinColors.length - 1)}
        step={1}
        value={[safeSkinColorIndex]}
        onValueChange={([index]) => setSkinColor(index)}
        valueFormat={(index) => `C${availableSkinColors[index]}`}
      />

      {availableBodyVariants.length > 1 && (
        <SliderNew
          label="Body Variant"
          min={0}
          max={Math.max(0, availableBodyVariants.length - 1)}
          step={1}
          value={[safeBodyVariantIndex]}
          onValueChange={([index]) => setBodyTextureVariant(index)}
          valueFormat={(index) => `V${availableBodyVariants[index]}`}
        />
      )}

      {availableHeadVariants.length > 1 && (
        <SliderNew
          label="Head Variant"
          min={0}
          max={Math.max(0, availableHeadVariants.length - 1)}
          step={1}
          value={[safeHeadVariantIndex]}
          onValueChange={([index]) => setHeadTextureVariant(index)}
          valueFormat={(index) => `V${availableHeadVariants[index]}`}
        />
      )}
    </div>
  )
}

interface CardBasedSelectorProps {
  availableSkinColors: number[]
  availableBodyVariants: number[]
  availableHeadVariants: number[]
  skinColor: number
  bodyTextureVariant: number
  headTextureVariant: number
  setSkinColor: (color: number) => void
  setBodyTextureVariant: (variant: number) => void
  setHeadTextureVariant: (variant: number) => void
  bodyMesh: string
  headMesh: string
  gameVersion: GameVersion
  gender: Gender
}

function CardBasedSelector({
  availableSkinColors,
  availableBodyVariants,
  availableHeadVariants,
  skinColor,
  bodyTextureVariant,
  headTextureVariant,
  setSkinColor,
  setBodyTextureVariant,
  setHeadTextureVariant,
  bodyMesh,
  headMesh,
  gameVersion,
  gender,
}: CardBasedSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Skin Color Cards */}
      {availableSkinColors.length > 1 && (
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-text-muted uppercase tracking-wide">
            Skin Color
          </label>
          <div className="grid grid-cols-8 gap-1 max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-iron-dark scrollbar-track-obsidian p-1 rounded">
            {availableSkinColors.map((color) => (
              <SkinColorCard
                key={color}
                colorIndex={color}
                isSelected={skinColor === color}
                onClick={() => setSkinColor(color)}
                bodyMesh={bodyMesh}
                gameVersion={gameVersion}
                gender={gender}
              />
            ))}
          </div>
        </div>
      )}

      {/* Body Variant Cards */}
      {availableBodyVariants.length > 1 && (
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-text-muted uppercase tracking-wide">
            Body Variant
          </label>
          <div className="grid grid-cols-8 gap-1 max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-iron-dark scrollbar-track-obsidian p-1 rounded">
            {availableBodyVariants.map((variant) => (
              <BodyVariantCard
                key={variant}
                variant={variant}
                isSelected={bodyTextureVariant === variant}
                onClick={() => setBodyTextureVariant(variant)}
                bodyMesh={bodyMesh}
                skinColor={skinColor}
                gameVersion={gameVersion}
                gender={gender}
              />
            ))}
          </div>
        </div>
      )}

      {/* Head Variant Cards */}
      {availableHeadVariants.length > 1 && (
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-text-muted uppercase tracking-wide">
            Head Variant
          </label>
          <div className="grid grid-cols-8 gap-1 max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-iron-dark scrollbar-track-obsidian p-1 rounded">
            {availableHeadVariants.map((variant) => (
              <HeadVariantCard
                key={variant}
                variant={variant}
                isSelected={headTextureVariant === variant}
                onClick={() => setHeadTextureVariant(variant)}
                headMesh={headMesh}
                skinColor={skinColor}
                gameVersion={gameVersion}
                gender={gender}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface SkinColorCardProps {
  colorIndex: number
  isSelected: boolean
  onClick: () => void
  bodyMesh: string
  gameVersion: GameVersion
  gender: Gender
}

function SkinColorCard({
  colorIndex,
  isSelected,
  onClick,
  bodyMesh,
  gameVersion,
  gender,
}: SkinColorCardProps) {
  // Always use variant 0 for consistent skin color preview
  const texturePath = getBodyTexturePath(bodyMesh, 0, colorIndex, gender, gameVersion)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded border overflow-hidden transition-all",
        "hover:scale-105 hover:shadow-md",
        isSelected
          ? "border-ember shadow-sm shadow-ember/20 ring-1 ring-ember"
          : "border-iron-dark/50 hover:border-iron"
      )}
    >
      {/* Texture Preview */}
      <div className="absolute inset-0 bg-obsidian-darker">
        {texturePath ? (
          <img
            src={texturePath}
            alt={`Skin C${colorIndex}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-text-muted">C{colorIndex}</span>
          </div>
        )}
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker/90 to-transparent px-0.5 pb-0.5 pt-1">
        <p className="text-[8px] font-medium text-text-primary text-center">
          C{colorIndex}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0 right-0">
          <div className="w-1.5 h-1.5 rounded-full bg-ember" />
        </div>
      )}
    </button>
  )
}

interface BodyVariantCardProps {
  variant: number
  isSelected: boolean
  onClick: () => void
  bodyMesh: string
  skinColor: number
  gameVersion: GameVersion
  gender: Gender
}

function BodyVariantCard({
  variant,
  isSelected,
  onClick,
  bodyMesh,
  skinColor,
  gameVersion,
  gender,
}: BodyVariantCardProps) {
  const texturePath = getBodyTexturePath(bodyMesh, variant, skinColor, gender, gameVersion)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded border overflow-hidden transition-all",
        "hover:scale-105 hover:shadow-md",
        isSelected
          ? "border-ember shadow-sm shadow-ember/20 ring-1 ring-ember"
          : "border-iron-dark/50 hover:border-iron"
      )}
    >
      {/* Texture Preview */}
      <div className="absolute inset-0 bg-obsidian-darker">
        {texturePath ? (
          <img
            src={texturePath}
            alt={`Body V${variant}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-text-muted">V{variant}</span>
          </div>
        )}
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker/90 to-transparent px-0.5 pb-0.5 pt-1">
        <p className="text-[8px] font-medium text-text-primary text-center">
          V{variant}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0 right-0">
          <div className="w-1.5 h-1.5 rounded-full bg-ember" />
        </div>
      )}
    </button>
  )
}

interface HeadVariantCardProps {
  variant: number
  isSelected: boolean
  onClick: () => void
  headMesh: string
  skinColor: number
  gameVersion: GameVersion
  gender: Gender
}

function HeadVariantCard({
  variant,
  isSelected,
  onClick,
  headMesh,
  skinColor,
  gameVersion,
  gender,
}: HeadVariantCardProps) {
  const texturePath = getHeadTexturePath(headMesh, variant, skinColor, gender, gameVersion)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded border overflow-hidden transition-all",
        "hover:scale-105 hover:shadow-md",
        isSelected
          ? "border-ember shadow-sm shadow-ember/20 ring-1 ring-ember"
          : "border-iron-dark/50 hover:border-iron"
      )}
    >
      {/* Texture Preview */}
      <div className="absolute inset-0 bg-obsidian-darker">
        {texturePath ? (
          <img
            src={texturePath}
            alt={`Head V${variant}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-text-muted">V{variant}</span>
          </div>
        )}
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker/90 to-transparent px-0.5 pb-0.5 pt-1">
        <p className="text-[8px] font-medium text-text-primary text-center">
          V{variant}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0 right-0">
          <div className="w-1.5 h-1.5 rounded-full bg-ember" />
        </div>
      )}
    </button>
  )
}

// Keep these exports for backward compatibility
export function BodyTextureSelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  
  // Key forces remount when gender/gameVersion changes to avoid stale state
  return <TextureSelector key={`${gameVersion}-${gender}`} />
}

export function HeadTextureSelector() {
  return null
}

/**
 * Display the actual texture filename
 */
function TextureFileDisplay({ filename }: { filename: string }) {
  return (
    <div className="text-[10px] text-text-muted font-mono truncate opacity-60" title={filename}>
      {filename}
    </div>
  )
}
