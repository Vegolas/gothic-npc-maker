/**
 * Export utilities for Gothic NPC Creator
 * Handles file downloads and clipboard operations
 */

import type { NPCConfig } from '../types/npc'
import { generateDaedalusScript } from './daedalusGenerator'

/**
 * Download a string as a file
 */
export function downloadAsFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

/**
 * Download NPC script as .d file
 */
export function downloadNPCScript(config: NPCConfig) {
  const script = generateDaedalusScript(config)
  const filename = `${config.instanceName}.d`
  downloadAsFile(script, filename)
}

/**
 * Download NPC config as JSON (for saving/loading later)
 */
export function downloadNPCConfig(config: NPCConfig) {
  const json = JSON.stringify(config, null, 2)
  const filename = `${config.instanceName}_config.json`
  downloadAsFile(json, filename, 'application/json')
}

/**
 * Copy text to clipboard
 * Returns a promise that resolves to true if successful
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)

    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch {
      return false
    }
  }
}

/**
 * Load NPC config from JSON file
 * Returns parsed config or null if invalid
 */
export async function loadNPCConfigFromFile(file: File): Promise<NPCConfig | null> {
  try {
    const text = await file.text()
    const config = JSON.parse(text) as NPCConfig

    // Basic validation
    if (!config.instanceName || !config.displayName) {
      throw new Error('Invalid config file')
    }

    return config
  } catch (err) {
    console.error('Failed to load config:', err)
    return null
  }
}
