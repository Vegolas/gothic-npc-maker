import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { Lighting } from './Lighting'
import { CameraControls } from './CameraControls'
import { Floor } from './Floor'
import { NPCModel } from './NPCModel'

/**
 * Main 3D preview component
 * Contains the Three.js canvas and all scene elements
 */
export function NPCPreview3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 3], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#1a1a2e' }}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <Scene>
            <Lighting />
            <Floor />
            <NPCModel />
            <CameraControls />
          </Scene>
        </Suspense>
      </Canvas>
    </div>
  )
}

/**
 * Loading indicator shown while models load
 */
function LoadingIndicator() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#c9a227" wireframe />
    </mesh>
  )
}
