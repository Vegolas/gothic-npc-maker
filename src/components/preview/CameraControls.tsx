import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CameraControlsProps {
  target?: [number, number, number]
  cameraPosition?: THREE.Vector3
  cameraRotation?: THREE.Euler
}

/**
 * Camera controls for orbiting around the NPC
 * Uses drei's OrbitControls for smooth interaction
 * Supports rotation, zoom, and panning
 */
export function CameraControls({ target = [0, 1, 0], cameraPosition, cameraRotation }: CameraControlsProps) {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const initializedRef = useRef(false)

  // Set initial camera position and rotation from scene ONCE when first provided
  useEffect(() => {
    if (cameraPosition && cameraRotation && !initializedRef.current) {
      camera.position.copy(cameraPosition)
      camera.rotation.copy(cameraRotation)
      
      // Update the controls to reflect the new camera position
      if (controlsRef.current) {
        controlsRef.current.update()
      }
      
      initializedRef.current = true
    }
  }, [cameraPosition, cameraRotation, camera])

  return (
    <OrbitControls
      ref={controlsRef}
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
      target={target}
      // Damping for smooth movement
      enableDamping={true}
      dampingFactor={0.05}
    />
  )
}
