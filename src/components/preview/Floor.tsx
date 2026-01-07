import { Grid } from '@react-three/drei'

/**
 * Floor/ground component for the preview scene
 * Provides visual reference for character placement
 */
export function Floor() {
  return (
    <>
      {/* Grid for visual reference */}
      <Grid
        position={[0, 0.001, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#4a4a4a"
        sectionSize={1}
        sectionThickness={1}
        sectionColor="#c9a227"
        fadeDistance={8}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />
    </>
  )
}
