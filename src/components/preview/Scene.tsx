import { type ReactNode } from 'react'

/**
 * Scene wrapper component
 * Sets up the scene configuration and contains all 3D elements
 */
interface SceneProps {
  children: ReactNode
}

export function Scene({ children }: SceneProps) {
  return (
    <group>
      {/* Scene background color is handled by Canvas */}
      {/* Fog for depth effect - optional, can be enabled later */}
      {/* <fog attach="fog" args={['#1a1a2e', 5, 15]} /> */}
      {children}
    </group>
  )
}
