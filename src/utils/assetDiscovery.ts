/**
 * Dynamic asset discovery using Vite's import.meta.glob
 * Automatically discovers GLB files and textures in the assets directory
 */

import type { GameVersion, Gender } from '../types/npc'

// Discover all GLB files in the assets directory at build time
const assetFiles = import.meta.glob('/public/assets/**/*.glb', { eager: false, as: 'url' })

// Discover all texture files (PNG, TGA, JPG)
const textureFiles = import.meta.glob('/public/assets/**/*.{png,PNG,tga,TGA,jpg,JPG}', { eager: false, as: 'url' })

// Discover text data files (guilds, tactics, etc.)
const dataFiles = import.meta.glob('/public/assets/**/data/*.txt', { eager: false, as: 'raw' })

// Discover audio files for voice sets
const audioFiles = import.meta.glob('/public/assets/**/*.{wav,WAV,mp3,MP3,ogg,OGG}', { eager: false, as: 'url' })

// Discover scene GLB files
const sceneFiles = import.meta.glob('/public/assets/**/scenes/*.glb', { eager: false, as: 'url' })

// Discover ZEN world files
const zenFiles = import.meta.glob('/public/assets/**/worlds/*.{zen,ZEN}', { eager: false, as: 'url' })

/**
 * Extract file information from path
 */
function parseAssetPath(path: string): {
  gameVersion: GameVersion
  gender: Gender
  category: 'bodies' | 'heads' | 'armors'
  fileName: string
  id: string
} | null {
  // Path format: /public/assets/{g1|g2}/{male|female}/{bodies|heads|armors}/FILENAME.glb
  const match = path.match(/\/public\/assets\/(g1|g2)\/(male|female)\/(bodies|heads|armors)\/(.+?)\.glb$/)
  
  if (!match) return null
  
  const [, gameVersion, gender, category, fileName] = match
  
  return {
    gameVersion: gameVersion as GameVersion,
    gender: gender as Gender,
    category: category as 'bodies' | 'heads' | 'armors',
    fileName: `${fileName}.glb`,
    id: fileName // Use filename without extension as ID
  }
}

/**
 * Parse texture path and extract metadata
 */
function parseTexturePath(path: string): {
  gameVersion: GameVersion
  gender: Gender
  category: 'body' | 'head'
  baseName: string
  variant: number
  skinColor: number
  fileName: string
} | null {
  // Path format: /public/assets/{g1|g2}/{male|female}/textures/{body|head}/BASENAME_Vx_Cy.PNG
  const match = path.match(/\/public\/assets\/(g1|g2)\/(male|female)\/textures\/(body|head)\/(.+?)_V(\d+)_C(\d+)\.(png|PNG|tga|TGA|jpg|JPG)$/i)
  
  if (!match) return null
  
  const [, gameVersion, gender, category, baseName, variant, skinColor, ext] = match
  
  return {
    gameVersion: gameVersion as GameVersion,
    gender: gender as Gender,
    category: category as 'body' | 'head',
    baseName,
    variant: parseInt(variant, 10),
    skinColor: parseInt(skinColor, 10),
    fileName: `${baseName}_V${variant}_C${skinColor}.${ext}`
  }
}

/**
 * Discover bodies dynamically
 */
export function discoverBodies(gameVersion: GameVersion, gender: Gender): Array<{
  id: string
  name: string
  fileName: string
  path: string
}> {
  const bodies: Array<{ id: string; name: string; fileName: string; path: string }> = []
  
  for (const [path] of Object.entries(assetFiles)) {
    const info = parseAssetPath(path)
    if (info && 
        info.gameVersion === gameVersion && 
        info.gender === gender && 
        info.category === 'bodies') {
      bodies.push({
        id: info.id,
        name: info.id.replace(/_/g, ' '), // Convert HUM_BODY_NAKED0 to "HUM BODY NAKED0"
        fileName: info.fileName,
        path: path.replace('/public', '') // Convert to web path
      })
    }
  }
  
  return bodies.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Discover heads dynamically
 */
export function discoverHeads(gameVersion: GameVersion, gender: Gender): Array<{
  id: string
  name: string
  fileName: string
  path: string
}> {
  const heads: Array<{ id: string; name: string; fileName: string; path: string }> = []
  
  for (const [path] of Object.entries(assetFiles)) {
    const info = parseAssetPath(path)
    if (info && 
        info.gameVersion === gameVersion && 
        info.gender === gender && 
        info.category === 'heads') {
      heads.push({
        id: info.id,
        name: info.id.replace(/_/g, ' '),
        fileName: info.fileName,
        path: path.replace('/public', '')
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
    if (path.startsWith(armorPattern) && path.endsWith('.glb')) {
      const fileName = path.split('/').pop() || ''
      const id = fileName.replace('.glb', '')
      
      armors.push({
        id,
        name: id.replace(/_/g, ' '),
        fileName,
        path: path.replace('/public', '')
      })
    }
  }
  
  return armors.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Discover available texture variants for a body mesh
 */
export function discoverBodyTextureVariants(
  bodyId: string,
  gameVersion: GameVersion,
  gender: Gender
): { variants: number; skinColors: number } {
  const variants = new Set<number>()
  const skinColors = new Set<number>()
  
  for (const [path] of Object.entries(textureFiles)) {
    const info = parseTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.category === 'body') {
      // Match textures that could belong to this body
      // Body ID might be "HUM_BODY_NAKED0" and texture is "HUM_BODY_NAKED"
      const bodyBase = bodyId.replace(/\d+$/, '').replace(/_/g, '_')
      const textureBase = info.baseName.replace(/_/g, '_')
      
      if (textureBase.includes(bodyBase) || bodyBase.includes(textureBase)) {
        variants.add(info.variant)
        skinColors.add(info.skinColor)
      }
    }
  }
  
  return {
    variants: variants.size > 0 ? Math.max(...variants) + 1 : 1,
    skinColors: skinColors.size > 0 ? Math.max(...skinColors) + 1 : 1
  }
}

/**
 * Discover available texture variants for a head mesh
 */
export function discoverHeadTextureVariants(
  headId: string,
  gameVersion: GameVersion,
  gender: Gender
): { variants: number; skinColors: number } {
  const variants = new Set<number>()
  const skinColors = new Set<number>()
  
  for (const [path] of Object.entries(textureFiles)) {
    const info = parseTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.category === 'head') {
      // For heads, textures are usually generic (HUM_HEAD) or specific to the head
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
 * Find the actual texture file that exists for a body
 */
export function findBodyTexture(
  bodyId: string,
  variant: number,
  skinColor: number,
  gameVersion: GameVersion,
  gender: Gender
): string | null {
  // Try to find exact match first
  for (const [path] of Object.entries(textureFiles)) {
    const info = parseTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.category === 'body' &&
        info.variant === variant &&
        info.skinColor === skinColor) {
      // Check if this texture matches the body
      const bodyBase = bodyId.replace(/\d+$/, '').replace(/_/g, '_')
      const textureBase = info.baseName.replace(/_/g, '_')
      
      if (textureBase.includes(bodyBase) || bodyBase.includes(textureBase)) {
        return path.replace('/public', '')
      }
    }
  }
  
  return null
}

/**
 * Find the actual texture file that exists for a head
 */
export function findHeadTexture(
  headId: string,
  variant: number,
  skinColor: number,
  gameVersion: GameVersion,
  gender: Gender
): string | null {
  for (const [path] of Object.entries(textureFiles)) {
    const info = parseTexturePath(path)
    if (info &&
        info.gameVersion === gameVersion &&
        info.gender === gender &&
        info.category === 'head' &&
        info.variant === variant &&
        info.skinColor === skinColor) {
      return path.replace('/public', '')
    }
  }
  
  return null
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
  return Object.keys(assetFiles).map(path => path.replace('/public', ''))
}

/**
 * Discover all texture files for a specific body mesh
 * Returns array of full texture filenames
 */
export function discoverBodyTextureFiles(
  bodyId: string,
  gameVersion: GameVersion,
  gender: Gender
): string[] {
  const textures: string[] = []
  const pattern = `/public/assets/${gameVersion}/${gender}/textures/body/`

  for (const [path] of Object.entries(textureFiles)) {
    if (path.startsWith(pattern)) {
      const fileName = path.split('/').pop() || ''
      // Match textures that could belong to this body
      const bodyBase = bodyId.replace(/\d+$/, '').replace(/_/g, '_').toUpperCase()
      const fileNameUpper = fileName.toUpperCase()

      if (fileNameUpper.includes(bodyBase) || bodyBase.includes(fileNameUpper.split('_')[0])) {
        textures.push(fileName)
      }
    }
  }

  return textures.sort()
}

/**
 * Discover all texture files for a specific head mesh
 * Returns array of full texture filenames
 */
export function discoverHeadTextureFiles(
  headId: string,
  gameVersion: GameVersion,
  gender: Gender
): string[] {
  const textures: string[] = []
  const pattern = `/public/assets/${gameVersion}/${gender}/textures/head/`

  for (const [path] of Object.entries(textureFiles)) {
    if (path.startsWith(pattern)) {
      const fileName = path.split('/').pop() || ''
      textures.push(fileName)
    }
  }

  return textures.sort()
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
    if (path.startsWith(pattern)) {
      // Extract voice ID from filename pattern: SVM_{id}_*.wav
      const match = path.match(/SVM_(\d+)_/)
      if (match) {
        const voiceId = parseInt(match[1], 10)
        if (!voiceSets.has(voiceId)) {
          voiceSets.set(voiceId, [])
        }
        voiceSets.get(voiceId)!.push(path.replace('/public', ''))
      }
    }
  }

  return Array.from(voiceSets.entries())
    .map(([id, audioSamples]) => ({ id, audioSamples: audioSamples.sort() }))
    .sort((a, b) => a.id - b.id)
}

/**
 * Discover scenes from GLB files
 * Expects scene files at: /public/assets/{g1|g2}/scenes/*.glb
 */
export function discoverScenes(gameVersion: GameVersion): Array<{
  id: string
  fileName: string
  path: string
}> {
  const scenes: Array<{ id: string; fileName: string; path: string }> = []
  const pattern = `/public/assets/${gameVersion}/scenes/`

  for (const [path] of Object.entries(sceneFiles)) {
    if (path.startsWith(pattern)) {
      const fileName = path.split('/').pop() || ''
      const id = fileName.replace('.glb', '')
      scenes.push({
        id,
        fileName,
        path: path.replace('/public', '')
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
    if (path.startsWith(pattern)) {
      const fileName = path.split('/').pop() || ''
      zens.push({
        fileName,
        path: path.replace('/public', '')
      })
    }
  }

  return zens.sort((a, b) => a.fileName.localeCompare(b.fileName))
}
