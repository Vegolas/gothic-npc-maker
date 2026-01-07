import { NPCPreview3D } from '../preview/NPCPreview3D'

/**
 * Main center panel containing the 3D preview canvas.
 * Three.js scene with orbit controls for viewing the NPC.
 */
export function MainPanel() {
  return (
    <main className="flex-1 bg-gothic-dark relative">
      <NPCPreview3D />
    </main>
  )
}
