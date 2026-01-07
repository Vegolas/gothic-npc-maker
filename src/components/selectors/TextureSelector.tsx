import { useNPCStore } from '../../stores/npcStore'
import { getBodyVariantCount, getHeadVariantCount, getSkinColorCount } from '../../data/textures'
import { getBodyTexturePath, getHeadTexturePath } from '../../utils/assetPaths'
import { Slider } from '../ui/Slider'

/**
 * Body texture variant selector
 */
export function BodyTextureSelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const bodyMesh = useNPCStore((state) => state.config.bodyMesh)
  const bodyTexture = useNPCStore((state) => state.config.bodyTexture)
  const skinColor = useNPCStore((state) => state.config.skinColor)
  const setBodyTexture = useNPCStore((state) => state.setBodyTexture)

  const maxVariant = getBodyVariantCount(bodyMesh) - 1
  const texturePath = getBodyTexturePath(bodyMesh, bodyTexture, skinColor, gender)

  return (
    <div className="space-y-1">
      <Slider
        label="Body Texture"
        min={0}
        max={maxVariant}
        step={1}
        value={bodyTexture}
        onChange={(e) => setBodyTexture(Number(e.target.value))}
        valueFormat={(v) => `V${v}`}
      />
      <TexturePathDisplay path={texturePath} />
    </div>
  )
}

/**
 * Head texture variant selector
 */
export function HeadTextureSelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const headMesh = useNPCStore((state) => state.config.headMesh)
  const headTexture = useNPCStore((state) => state.config.headTexture)
  const skinColor = useNPCStore((state) => state.config.skinColor)
  const setHeadTexture = useNPCStore((state) => state.setHeadTexture)

  const maxVariant = getHeadVariantCount(headMesh) - 1
  const texturePath = getHeadTexturePath(headMesh, headTexture, skinColor, gender)

  return (
    <div className="space-y-1">
      <Slider
        label="Head Texture"
        min={0}
        max={maxVariant}
        step={1}
        value={headTexture}
        onChange={(e) => setHeadTexture(Number(e.target.value))}
        valueFormat={(v) => `V${v}`}
      />
      <TexturePathDisplay path={texturePath} />
    </div>
  )
}

/**
 * Skin color selector
 * Controls the C (color) variant for both body and head
 */
export function SkinColorSelector() {
  const skinColor = useNPCStore((state) => state.config.skinColor)
  const setSkinColor = useNPCStore((state) => state.setSkinColor)

  const maxColor = getSkinColorCount() - 1
  const colorNames = ['Light', 'Medium', 'Dark']

  return (
    <Slider
      label="Skin Color"
      min={0}
      max={maxColor}
      step={1}
      value={skinColor}
      onChange={(e) => setSkinColor(Number(e.target.value))}
      valueFormat={(v) => colorNames[v] ?? `C${v}`}
    />
  )
}

/**
 * Display the texture path being looked for
 */
function TexturePathDisplay({ path }: { path: string }) {
  // Extract just the filename from the path
  const filename = path.split('/').pop() || path

  return (
    <div className="text-[10px] text-gray-500 font-mono truncate" title={path}>
      Looking for: {filename}.[tga|png|jpg]
    </div>
  )
}
