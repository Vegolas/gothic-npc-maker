/**
 * Parse Ta.d file to extract available actions
 */
export async function parseActions(gameVersion: 'g1' | 'g2'): Promise<string[]> {
  try {
    const response = await fetch(`/assets/${gameVersion}/Ta.d`)
    const content = await response.text()
    
    // Match lines like: func void TA_Cook(...)
    const regex = /func\s+void\s+(TA_\w+)/g
    const actions: string[] = []
    let match
    
    while ((match = regex.exec(content)) !== null) {
      actions.push(match[1])
    }
    
    // Remove duplicates and sort
    return [...new Set(actions)].sort()
  } catch (error) {
    console.error('Failed to parse Ta.d:', error)
    return []
  }
}
