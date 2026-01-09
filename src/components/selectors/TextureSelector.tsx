import { useNPCStore } from '../../stores/npcStore'
import { discoverBodyTextureFiles, discoverHeadTextureFiles } from '../../utils/assetDiscovery'
import { SliderNew } from '../ui/slider-new'

/**
 * Body texture selector - file-based
 * Directly selects from discovered texture files
 */
export function BodyTextureSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const gender = useNPCStore((state) => state.config.gender)
  const bodyMesh = useNPCStore((state) => state.config.bodyMesh)
  const bodyTextureFile = useNPCStore((state) => state.config.bodyTextureFile)
  const setBodyTextureFile = useNPCStore((state) => state.setBodyTextureFile)

  const textureFiles = discoverBodyTextureFiles(bodyMesh, gameVersion, gender)

  // Find current index or default to 0
  const currentIndex = bodyTextureFile
    ? textureFiles.indexOf(bodyTextureFile)
    : 0
  const safeIndex = currentIndex >= 0 ? currentIndex : 0

  const handleChange = (index: number) => {
    const file = textureFiles[index]
    setBodyTextureFile(file || null)
  }

  if (textureFiles.length === 0) {
    return (
      <div className="text-xs text-text-muted">
        No body textures found for {bodyMesh}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <SliderNew
        label="Body Texture"
        min={0}
        max={textureFiles.length - 1}
        step={1}
        value={[safeIndex]}
        onValueChange={([value]) => handleChange(value)}
        valueFormat={(v) => `${v + 1}/${textureFiles.length}`}
      />
      <TextureFileDisplay filename={textureFiles[safeIndex]} />
    </div>
  )
}

/**
 * Head texture selector - file-based
 * Directly selects from discovered texture files
 */
export function HeadTextureSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const gender = useNPCStore((state) => state.config.gender)
  const headMesh = useNPCStore((state) => state.config.headMesh)
  const headTextureFile = useNPCStore((state) => state.config.headTextureFile)
  const setHeadTextureFile = useNPCStore((state) => state.setHeadTextureFile)

  const textureFiles = discoverHeadTextureFiles(headMesh, gameVersion, gender)

  // Find current index or default to 0
  const currentIndex = headTextureFile
    ? textureFiles.indexOf(headTextureFile)
    : 0
  const safeIndex = currentIndex >= 0 ? currentIndex : 0

  const handleChange = (index: number) => {
    const file = textureFiles[index]
    setHeadTextureFile(file || null)
  }

  if (textureFiles.length === 0) {
    return (
      <div className="text-xs text-text-muted">
        No head textures found
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <SliderNew
        label="Head Texture"
        min={0}
        max={textureFiles.length - 1}
        step={1}
        value={[safeIndex]}
        onValueChange={([value]) => handleChange(value)}
        valueFormat={(v) => `${v + 1}/${textureFiles.length}`}
      />
      <TextureFileDisplay filename={textureFiles[safeIndex]} />
    </div>
  )
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
