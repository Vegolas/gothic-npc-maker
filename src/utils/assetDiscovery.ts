/**
 * Dynamic asset discovery using Vite's import.meta.glob
 * Automatically discovers GLB files and textures in the assets directory
 *
 * Body Structure:
 *   /assets/{g1|g2}/{male|female}/bodies/{DIRECTORY}/
 *     - {MESH_NAME}.glb (one or more meshes sharing textures)
 *     - *_V{variant}_C{skinColor}.{png|tga} (textures)
 *   Textures are discovered by looking in the mesh's directory.
 *
 * Head Structure:
 *   /assets/{g1|g2}/{male|female}/heads/{MESH}.glb
 *   /assets/{g1|g2}/{male|female}/textures/head/{BASENAME}_V{x}_C{y}.png
 */

import type { GameVersion, Gender } from '../types/npc'

// Discover all GLB files in the assets directory at build time
// NOTE: Use a relative glob on Windows to avoid drive-letter import specifiers during Vite build.
const assetFiles = import.meta.glob('../../public/assets/**/*.glb', { eager: false, as: 'url' })

// Discover all texture files (PNG, TGA, JPG)
const textureFiles = import.meta.glob('../../public/assets/**/*.{png,PNG,tga,TGA,jpg,JPG}', { eager: false, as: 'url' })

// Discover text data files (guilds, tactics, etc.)
const dataFiles = import.meta.glob('../../public/assets/**/data/*.txt', { eager: false, as: 'raw' })

// Discover audio files for voice sets
const audioFiles = import.meta.glob('../../public/assets/**/*.{wav,WAV,mp3,MP3,ogg,OGG}', { eager: false, as: 'url' })

// Discover scene GLB files
const sceneFiles = import.meta.glob('../../public/assets/**/scenes/*.glb', { eager: false, as: 'url' })

// Discover ZEN world files
const zenFiles = import.meta.glob('../../public/assets/**/worlds/*.{zen,ZEN}', { eager: false, as: 'url' })

/**
 * Parse body mesh path (supports both old and new directory structures)
 * New format: /public/assets/{g1|g2}/{male|female}/bodies/{DIRECTORY}/{MESH}.glb
 * Old format: /public/assets/{g1|g2}/{male|female}/bodies/{MESH}.glb
 */
function parseBodyPath(path: string): {
  gameVersion: GameVersion
  gender: Gender
  directory: string
  fileName: string
  id: string
} | null {
  // Try new format first: /bodies/{DIRECTORY}/{MESH}.glb
  const newMatch = path.match(/\/public\/assets\/(g1|g2)\/(male|female)\/bodies\/([^/]+)\/([^/]+)\.glb$/)
  if (newMatch) {
    const [, gameVersion, gender, directory, meshName] = newMatch
    return {
      gameVersion: gameVersion as GameVersion,
      gender: gender as Gender,
      directory,
      fileName: `${meshName}.glb`,
      id: meshName
    }
  }

  // Try old format: /bodies/{MESH}.glb (use mesh name as directory)
  const oldMatch = path.match(/\/public\/assets\/(g1|g2)\/(male|female)\/bodies\/([^/]+)\.glb$/)
  if (oldMatch) {
    const [, gameVersion, gender, meshName] = oldMatch
    return {
      gameVersion: gameVersion as GameVersion,
      gender: gender as Gender,
      directory: meshName, // Use mesh name as directory for old format
      fileName: `${meshName}.glb`,
      id: meshName
    }
  }

  return null
}

/**
 * Parse body texture path - extracts variant/skinColor from textures in body directories
 * Format: /public/assets/{g1|g2}/{male|female}/bodies/{DIRECTORY}/*_V{x}[_C{y}].{ext}
 * The _C{y} part is optional (defaults to skinColor 0)
 */
function parseBodyTexturePath(path: string): {
  gameVersion: GameVersion
  gender: Gender
  directory: string
  variant: number
  skinColor: number
  fileName: string
} | null {
  // Match any texture in a body directory with _V{x} pattern (with optional _C{y})
  const match = path.match(/\/public\/assets\/(g1|g2)\/(male|female)\/bodies\/([^/]+)\/(.+_V(\d+)(?:_C(\d+))?\.(png|PNG|tga|TGA|jpg|JPG))$/i)
  if (match) {
    const [, gameVersion, gender, directory, fileName, variant, skinColor] = match
    return {
      gameVersion: gameVersion as GameVersion,
      gender: gender as Gender,
      directory,
      variant: parseInt(variant, 10),
      skinColor: skinColor ? parseInt(skinColor, 10) : 0,
      fileName
    }
  }

  return null
}

/**
 * Parse head mesh path (unchanged structure)
 * Path format: /public/assets/{g1|g2}/{male|female}/heads/{MESH}.glb
 */
function parseHeadPath(path: string): {
  gameVersion: GameVersion
  gender: Gender
  fileName: string
  id: string
} | null {
  const match = path.match(/\/public\/assets\/(g1|g2)\/(male|female)\/heads\/([^/]+)\.glb$/)

  if (!match) return null

  const [, gameVersion, gender, meshName] = match

  return {
    gameVersion: gameVersion as GameVersion,
    gender: gender as Gender,
    fileName: `${meshName}.glb`,
    id: meshName
  }
}

/**
 * Parse head texture path (unchanged structure)
 * Path format: /public/assets/{g1|g2}/{male|female}/textures/head/{BASENAME}_V{x}_C{y}.{ext}
 */
function parseHeadTexturePath(path: string): {
  gameVersion: GameVersion
  gender: Gender
  baseName: string
  variant: number
  skinColor: number
  fileName: string
} | null {
  const match = path.match(/\/public\/assets\/(g1|g2)\/(male|female)\/textures\/head\/(.+?)_V(\d+)_C(\d+)\.(png|PNG|tga|TGA|jpg|JPG)$/i)

  if (!match) return null

  const [, gameVersion, gender, baseName, variant, skinColor, ext] = match

  return {
    gameVersion: gameVersion as GameVersion,
    gender: gender as Gender,
    baseName,
    variant: parseInt(variant, 10),
    skinColor: parseInt(skinColor, 10),
    fileName: `${baseName}_V${variant}_C${skinColor}.${ext}`
  }
}

/**
 * Get the directory containing a body mesh
 * Returns the parent directory name for a given body ID
 */
export function getBodyDirectory(
  bodyId: string,
  gameVersion: GameVersion,
  gender: Gender
): string | null {
  for (const [path] of Object.entries(assetFiles)) {
    const info = parseBodyPath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.id === bodyId) {
      return info.directory
    }
  }
  return null
}


/**
 * Discover bodies dynamically
 * Now includes directory information for texture lookup
 */
export function discoverBodies(gameVersion: GameVersion, gender: Gender): Array<{
  id: string
  name: string
  fileName: string
  path: string
  directory: string
}> {
  const bodies: Array<{ id: string; name: string; fileName: string; path: string; directory: string }> = []

  for (const [path] of Object.entries(assetFiles)) {
    const info = parseBodyPath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender) {
      bodies.push({
        id: info.id,
        name: info.id.replace(/_/g, ' '),
        fileName: info.fileName,
        path: path.replace(/^.*\/public/, ''),
        directory: info.directory
      })
    }
  }

  return bodies.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Discover heads dynamically (unchanged)
 */
export function discoverHeads(gameVersion: GameVersion, gender: Gender): Array<{
  id: string
  name: string
  fileName: string
  path: string
}> {
  const heads: Array<{ id: string; name: string; fileName: string; path: string }> = []

  for (const [path] of Object.entries(assetFiles)) {
    const info = parseHeadPath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender) {
      heads.push({
        id: info.id,
        name: info.id.replace(/_/g, ' '),
        fileName: info.fileName,
        path: path.replace(/^.*\/public/, '')
      })
    }
  }

  return heads.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Discover armors dynamically (gender-neutral)
 * Armors are stored at /public/assets/{g1|g2}/armors/
 */
export function discoverArmors(gameVersion: GameVersion): Array<{
  id: string
  name: string
  fileName: string
  path: string
}> {
  const armors: Array<{ id: string; name: string; fileName: string; path: string }> = []
  const armorPattern = `/public/assets/${gameVersion}/armors/`

  for (const [path] of Object.entries(assetFiles)) {
    if (path.includes(armorPattern) && path.endsWith('.glb')) {
      const fileName = path.split('/').pop() || ''
      const id = fileName.replace('.glb', '')

      armors.push({
        id,
        name: id.replace(/_/g, ' '),
        fileName,
        path: path.replace(/^.*\/public/, '')
      })
    }
  }

  return armors.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Discover available texture variants for a body mesh
 * Looks in the body's directory for textures with _V{x}_C{y} pattern
 */
export function discoverBodyTextureVariants(
  bodyId: string,
  gameVersion: GameVersion,
  gender: Gender
): { variants: number[]; skinColors: number[]; directory: string | null } {
  const variants = new Set<number>()
  const skinColors = new Set<number>()

  const directory = getBodyDirectory(bodyId, gameVersion, gender)
  if (!directory) {
    return { variants: [0], skinColors: [0], directory: null }
  }

  // Look for textures in the body's directory
  for (const [path] of Object.entries(textureFiles)) {
    const info = parseBodyTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.directory.toUpperCase() === directory.toUpperCase()) {
      variants.add(info.variant)
      skinColors.add(info.skinColor)
    }
  }

  // If no textures found, return defaults
  if (variants.size === 0) {
    return { variants: [0], skinColors: [0], directory }
  }

  return {
    variants: Array.from(variants).sort((a, b) => a - b),
    skinColors: Array.from(skinColors).sort((a, b) => a - b),
    directory
  }
}

/**
 * Discover available head variants for a specific skin color
 */
export function discoverHeadVariantsForSkinColor(
  _headId: string,
  skinColor: number,
  gameVersion: GameVersion,
  gender: Gender
): number[] {
  const variants = new Set<number>()

  for (const [path] of Object.entries(textureFiles)) {
    const info = parseHeadTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.skinColor === skinColor) {
      variants.add(info.variant)
    }
  }

  return Array.from(variants).sort((a, b) => a - b)
}

/**
 * Discover available texture variants for a head mesh
 */
export function discoverHeadTextureVariants(
  _headId: string,
  gameVersion: GameVersion,
  gender: Gender
): { variants: number; skinColors: number } {
  const variants = new Set<number>()
  const skinColors = new Set<number>()

  for (const [path] of Object.entries(textureFiles)) {
    const info = parseHeadTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender) {
      variants.add(info.variant)
      skinColors.add(info.skinColor)
    }
  }

  return {
    variants: variants.size > 0 ? Math.max(...variants) + 1 : 1,
    skinColors: skinColors.size > 0 ? Math.max(...skinColors) + 1 : 1
  }
}

/**
 * Find body texture file path
 * Looks in the body's directory for matching variant/skinColor
 */
export function findBodyTexture(
  bodyId: string,
  variant: number,
  skinColor: number,
  gameVersion: GameVersion,
  gender: Gender
): string | null {
  const directory = getBodyDirectory(bodyId, gameVersion, gender)
  if (!directory) {
    return null
  }

  for (const [path] of Object.entries(textureFiles)) {
    const info = parseBodyTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.directory.toUpperCase() === directory.toUpperCase() &&
        info.variant === variant &&
        info.skinColor === skinColor) {
      return path.replace(/^.*\/public/, '')
    }
  }

  return null
}

/**
 * Find all matching body texture files
 * Returns array of all possible texture paths to try
 */
export function findBodyTextures(
  bodyId: string,
  variant: number,
  skinColor: number,
  gameVersion: GameVersion,
  gender: Gender
): string[] {
  const matchingTextures: string[] = []
  const directory = getBodyDirectory(bodyId, gameVersion, gender)

  if (!directory) {
    return matchingTextures
  }

  for (const [path] of Object.entries(textureFiles)) {
    const info = parseBodyTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.directory.toUpperCase() === directory.toUpperCase() &&
        info.variant === variant &&
        info.skinColor === skinColor) {
      matchingTextures.push(path.replace(/^.*\/public/, ''))
    }
  }

  return matchingTextures
}

/**
 * Find the actual texture file that exists for a head
 */
export function findHeadTexture(
  _headId: string,
  variant: number,
  skinColor: number,
  gameVersion: GameVersion,
  gender: Gender
): string | null {
  for (const [path] of Object.entries(textureFiles)) {
    const info = parseHeadTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.variant === variant &&
        info.skinColor === skinColor) {
      return path.replace(/^.*\/public/, '')
    }
  }

  return null
}

/**
 * Discover all texture files for a specific body mesh
 * Returns array of full texture filenames (for G1 Female file-based selection)
 */
export function discoverBodyTextureFiles(
  bodyId: string,
  gameVersion: GameVersion,
  gender: Gender
): string[] {
  const textures: string[] = []
  const directory = getBodyDirectory(bodyId, gameVersion, gender)

  if (!directory) {
    return textures
  }

  for (const [path] of Object.entries(textureFiles)) {
    const info = parseBodyTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.directory.toUpperCase() === directory.toUpperCase()) {
      textures.push(info.fileName)
    }
  }

  return textures.sort()
}

/**
 * Discover all texture files for a specific head mesh
 * Returns array of full texture filenames
 */
export function discoverHeadTextureFiles(
  _headId: string,
  gameVersion: GameVersion,
  gender: Gender
): string[] {
  const textures: string[] = []
  const pattern = `/public/assets/${gameVersion}/${gender}/textures/head/`

  for (const [path] of Object.entries(textureFiles)) {
    if (path.includes(pattern)) {
      const fileName = path.split('/').pop() || ''
      textures.push(fileName)
    }
  }

  return textures.sort()
}

/**
 * Check if a specific asset exists
 */
export function assetExists(path: string): boolean {
  const fullPath = `/public${path}`
  return fullPath in assetFiles
}

/**
 * Get all discovered asset paths (for debugging)
 */
export function getAllAssetPaths(): string[] {
  return Object.keys(assetFiles).map(path => path.replace(/^.*\/public/, ''))
}

/**
 * Discover guilds from data files
 * Expects files at: /public/assets/{g1|g2}/data/guilds.txt
 * Format: one guild ID per line (e.g., "GIL_NONE", "GIL_PAL")
 */
export async function discoverGuilds(gameVersion: GameVersion): Promise<string[]> {
  const path = `/public/assets/${gameVersion}/data/guilds.txt`
  const loader = dataFiles[path]

  if (!loader) {
    console.warn(`Guilds file not found: ${path}`)
    return []
  }

  try {
    const content = await loader()
    return (content as string)
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
  } catch (err) {
    console.error(`Failed to load guilds from ${path}:`, err)
    return []
  }
}

/**
 * Discover fight tactics from data files
 * Expects files at: /public/assets/{g1|g2}/data/tactics.txt
 * Format: one tactic ID per line (e.g., "FAI_HUMAN_COWARD", "FAI_HUMAN_NORMAL")
 */
export async function discoverFightTactics(gameVersion: GameVersion): Promise<string[]> {
  const path = `/public/assets/${gameVersion}/data/tactics.txt`
  const loader = dataFiles[path]

  if (!loader) {
    console.warn(`Tactics file not found: ${path}`)
    return []
  }

  try {
    const content = await loader()
    return (content as string)
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
  } catch (err) {
    console.error(`Failed to load tactics from ${path}:`, err)
    return []
  }
}

/**
 * Discover voice sets from audio files
 * Expects audio files at: /public/assets/{g1|g2}/{male|female}/voices/SVM_{id}_*.wav
 */
export function discoverVoiceSets(gameVersion: GameVersion, gender: Gender): Array<{
  id: number
  audioSamples: string[]
}> {
  const voiceSets = new Map<number, string[]>()
  const pattern = `/public/assets/${gameVersion}/${gender}/voices/`

  for (const [path] of Object.entries(audioFiles)) {
    if (path.includes(pattern)) {
      // Extract voice ID from filename pattern: SVM_{id}_*.wav
      const match = path.match(/SVM_(\d+)_/)
      if (match) {
        const voiceId = parseInt(match[1], 10)
        if (!voiceSets.has(voiceId)) {
          voiceSets.set(voiceId, [])
        }
        voiceSets.get(voiceId)!.push(path.replace(/^.*\/public/, ''))
      }
    }
  }

  return Array.from(voiceSets.entries())
    .map(([id, audioSamples]) => ({ id, audioSamples: audioSamples.sort() }))
    .sort((a, b) => a.id - b.id)
}

/**
 * Discover scenes from GLB files
 * Expects scene files at: /public/assets/scenes/*.glb
 */
export function discoverScenes(_gameVersion: GameVersion): Array<{
  id: string
  fileName: string
  path: string
}> {
  const scenes: Array<{ id: string; fileName: string; path: string }> = []
  const pattern = `/public/assets/scenes/`

  for (const [path] of Object.entries(sceneFiles)) {
    if (path.includes(pattern)) {
      const fileName = path.split('/').pop() || ''
      const id = fileName.replace('.glb', '')
      scenes.push({
        id,
        fileName,
        path: path.replace(/^.*\/public/, '')
      })
    }
  }

  return scenes.sort((a, b) => a.id.localeCompare(b.id))
}

/**
 * Discover ZEN world files
 * Expects ZEN files at: /public/assets/{g1|g2}/worlds/*.ZEN
 */
export function discoverZenFiles(gameVersion: GameVersion): Array<{
  fileName: string
  path: string
}> {
  const zens: Array<{ fileName: string; path: string }> = []
  const pattern = `/public/assets/${gameVersion}/worlds/`

  for (const [path] of Object.entries(zenFiles)) {
    if (path.includes(pattern)) {
      const fileName = path.split('/').pop() || ''
      zens.push({
        fileName,
        path: path.replace(/^.*\/public/, '')
      })
    }
  }

  return zens.sort((a, b) => a.fileName.localeCompare(b.fileName))
}
