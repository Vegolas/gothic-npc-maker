import { OrbitControls } from '@react-three/drei'

/**
 * Camera controls for orbiting around the NPC
 * Uses drei's OrbitControls for smooth interaction
 */
export function CameraControls() {
  return (
    <OrbitControls
      // Orbit settings
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      // Limits
      minDistance={1}
      maxDistance={10}
      minPolarAngle={0.1}           // Prevent going under the floor
      maxPolarAngle={Math.PI / 2}    // Prevent going under the floor
      // Target (look at center of character)
      target={[0, 1, 0]}
      // Damping for smooth movement
      enableDamping={true}
      dampingFactor={0.05}
    />
  )
}
