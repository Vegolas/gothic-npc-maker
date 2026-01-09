import { useNPCStore } from '../../stores/npcStore'
import { 
  discoverBodyTextureFiles, 
  discoverHeadTextureFiles, 
  discoverAllSkinColors,
  discoverBodyVariantsForSkinColor,
  discoverHeadVariantsForSkinColor,
  discoverSkinColorsForBodyVariant
} from '../../utils/assetDiscovery'
import { SliderNew } from '../ui/slider-new'
import { useEffect } from 'react'

/**
 * Unified texture selector with smart filtering
 * Approach: Skin Color first → filters Body/Head Variants
 * This ensures only compatible combinations are shown
 */
export function TextureSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const gender = useNPCStore((state) => state.config.gender)
  const bodyMesh = useNPCStore((state) => state.config.bodyMesh)
  const headMesh = useNPCStore((state) => state.config.headMesh)
  const bodyTextureFile = useNPCStore((state) => state.config.bodyTextureFile)
  const headTextureFile = useNPCStore((state) => state.config.headTextureFile)
  const bodyTextureVariant = useNPCStore((state) => state.config.bodyTexture)
  const headTextureVariant = useNPCStore((state) => state.config.headTexture)
  const skinColor = useNPCStore((state) => state.config.skinColor)
  const setBodyTextureFile = useNPCStore((state) => state.setBodyTextureFile)
  const setHeadTextureFile = useNPCStore((state) => state.setHeadTextureFile)
  const setBodyTextureVariant = useNPCStore((state) => state.setBodyTexture)
  const setHeadTextureVariant = useNPCStore((state) => state.setHeadTexture)
  const setSkinColor = useNPCStore((state) => state.setSkinColor)

  // G1 Female uses file-based selection
  const isG1Female = gameVersion === 'g1' && gender === 'female'

  if (isG1Female) {
    return <G1FemaleTextureSelector />
  }

  return <StandardTextureSelector />
}

/**
 * G1 Female texture selector - file-based
 */
function G1FemaleTextureSelector() {
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

/**
 * Standard texture selector - variant-based with skin color
 */
function StandardTextureSelector() {
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

  // Smart filtering approach: Skin Color → Body/Head Variants
  const availableSkinColors = discoverAllSkinColors(gameVersion, gender)
  const availableBodyVariants = discoverBodyVariantsForSkinColor(bodyMesh, skinColor, gameVersion, gender)
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
    return <div className="text-xs text-text-muted">No textures found</div>
  }

  const skinColorIndex = availableSkinColors.indexOf(skinColor)
  const safeSkinColorIndex = skinColorIndex >= 0 ? skinColorIndex : 0

  const bodyVariantIndex = availableBodyVariants.indexOf(bodyTextureVariant)
  const safeBodyVariantIndex = bodyVariantIndex >= 0 ? bodyVariantIndex : 0

  const headVariantIndex = availableHeadVariants.indexOf(headTextureVariant)
  const safeHeadVariantIndex = headVariantIndex >= 0 ? headVariantIndex : 0

  return (
    <div className="space-y-4">
      {/* Skin Color - Primary selector */}
      <SliderNew
        label="Skin Color"
        min={0}
        max={Math.max(0, availableSkinColors.length - 1)}
        step={1}
        value={[safeSkinColorIndex]}
        onValueChange={([index]) => setSkinColor(availableSkinColors[index])}
        valueFormat={(index) => `C${availableSkinColors[index]}`}
      />
      
      {/* Body Variant - Filtered by skin color */}
      {availableBodyVariants.length > 0 && (
        <SliderNew
          label="Body Variant"
          min={0}
          max={Math.max(0, availableBodyVariants.length - 1)}
          step={1}
          value={[safeBodyVariantIndex]}
          onValueChange={([index]) => setBodyTextureVariant(availableBodyVariants[index])}
          valueFormat={(index) => `V${availableBodyVariants[index]}`}
        />
      )}
      
      {/* Head Variant - Filtered by skin color */}
      {availableHeadVariants.length > 0 && (
        <SliderNew
          label="Head Variant"
          min={0}
          max={Math.max(0, availableHeadVariants.length - 1)}
          step={1}
          value={[safeHeadVariantIndex]}
          onValueChange={([index]) => setHeadTextureVariant(availableHeadVariants[index])}
          valueFormat={(index) => `V${availableHeadVariants[index]}`}
        />
      )}
    </div>
  )
}

// Keep these exports for backward compatibility
export function BodyTextureSelector() {
  return <TextureSelector />
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
