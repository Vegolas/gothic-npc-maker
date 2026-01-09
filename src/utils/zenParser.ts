import type { GameVersion, ZenWorldFile } from '../types/npc'
import { getZenFiles } from '../data/zenFiles'

/**
 * List available ZEN files for a given game version
 */
export async function listZenFiles(
  gameVersion: GameVersion,
  onFileProgress?: (fileName: string, loaded: number, total: number) => void
): Promise<ZenWorldFile[]> {
  const discoveredFiles = getZenFiles(gameVersion)
  const zenFiles: ZenWorldFile[] = []

  for (const zenFile of discoveredFiles) {
    try {
      const fileCheck = await validateZenFile(
        zenFile.path,
        onFileProgress ? (loaded, total) => onFileProgress(zenFile.fileName, loaded, total) : undefined
      )
      zenFiles.push({
        name: zenFile.fileName,
        path: zenFile.path,
        isValid: fileCheck.isValid,
        errorMessage: fileCheck.errorMessage,
        fileSize: fileCheck.fileSize
      })
    } catch (error) {
      zenFiles.push({
        name: zenFile.fileName,
        path: zenFile.path,
        isValid: false,
        errorMessage: 'Failed to load file'
      })
    }
  }

  return zenFiles
}

/**
 * Validate if a ZEN file is uncompiled (text-readable)
 * Returns validation result with file size information
 */
export async function validateZenFile(
  filePath: string,
  onProgress?: (loaded: number, total: number) => void
): Promise<{ isValid: boolean; errorMessage?: string; fileSize?: number }> {
  try {
    const response = await fetch(filePath)
    if (!response.ok) {
      return { isValid: false, errorMessage: 'File not found' }
    }

    const contentLength = response.headers.get('content-length')
    const totalSize = contentLength ? parseInt(contentLength, 10) : 0

    // Read the entire file
    const reader = response.body?.getReader()
    if (!reader) {
      return { isValid: false, errorMessage: 'Unable to read file' }
    }

    const chunks: Uint8Array[] = []
    let loadedSize = 0

    while (true) {
      const { done, value } = await reader.read()
      
      if (done) break
      
      chunks.push(value)
      loadedSize += value.length
      
      // Report progress if callback provided
      if (onProgress && totalSize > 0) {
        onProgress(loadedSize, totalSize)
      }
    }

    // Combine all chunks
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
    const fullData = new Uint8Array(totalLength)
    let offset = 0
    for (const chunk of chunks) {
      fullData.set(chunk, offset)
      offset += chunk.length
    }

    // Convert to text
    const decoder = new TextDecoder('utf-8', { fatal: false })
    const text = decoder.decode(fullData)

    // Check if it looks like text (ASCII ZEN format)
    // Sample first 1000 characters to check
    const sampleText = text.slice(0, 1000)
    const isTextBased = /^[\x20-\x7E\r\n\t]+$/.test(sampleText)
    
    if (!isTextBased) {
      return { 
        isValid: false, 
        errorMessage: 'File appears to be compiled. Please provide an uncompiled .ZEN file.',
        fileSize: totalLength
      }
    }

    // Additional check: ZEN files should contain certain keywords
    const hasZenMarkers = text.includes('zCZone') || 
                         text.includes('zCVob') || 
                         text.includes('oCWorld') ||
                         text.includes('[MESH]') ||
                         text.includes('ZenGin Archive')

    if (!hasZenMarkers && text.length > 0) {
      return { 
        isValid: false, 
        errorMessage: 'File does not appear to be a valid ZEN world file.',
        fileSize: totalLength
      }
    }

    return { isValid: true, fileSize: totalLength }
  } catch (error) {
    return { 
      isValid: false, 
      errorMessage: `Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}

/**
 * Parse waypoints from a ZEN file
 */
export async function parseWaypointsFromZen(filePath: string): Promise<string[]> {
  try {
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error('Failed to load ZEN file')
    }

    const text = await response.text()
    const waypoints: Set<string> = new Set()

    // Parse ALL waypoint names from ZEN file
    // Waypoints can be in wpName or vobName fields
    // They can have various prefixes (WP_, FP_, SPAWN_, PATH_, LOCATION_, etc.)
    // Match any uppercase alphanumeric name with underscores
    const wpNameRegex = /wpName=string:([A-Z][A-Z0-9_]*)/gi
    const vobNameRegex = /vobName=string:([A-Z][A-Z0-9_]*)/gi
    
    let match
    
    // Extract from wpName fields (these are usually waypoints)
    while ((match = wpNameRegex.exec(text)) !== null) {
      const name = match[1]
      // Only add if it looks like a waypoint (has at least one underscore or starts with common prefixes)
      if (name.includes('_') || /^(WP|FP|SPAWN|PATH|LOCATION|MOVEMENT|NC|OC|PSI|OW|START|ARENA|TOT)/i.test(name)) {
        waypoints.add(name)
      }
    }
    
    // Extract from vobName fields (filter more strictly as these can be object names too)
    while ((match = vobNameRegex.exec(text)) !== null) {
      const name = match[1]
      // Only add common waypoint/freepoint prefixes from vobName
      if (/^(WP_|FP_|SPAWN_|PATH_)/i.test(name)) {
        waypoints.add(name)
      }
    }

    return Array.from(waypoints).sort()
  } catch (error) {
    console.error('Error parsing waypoints from ZEN:', error)
    return []
  }
}
