import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { Lighting } from './Lighting'
import { CameraControls } from './CameraControls'
import { Floor } from './Floor'
import { NPCModel } from './NPCModel'
import { SceneLoader } from './SceneLoader'
import { useNPCStore } from '../../stores/npcStore'
import * as THREE from 'three'

/**
 * Main 3D preview component
 * Contains the Three.js canvas and all scene elements
 */
export function NPCPreview3D() {
  const previewScene = useNPCStore((state) => state.config.previewScene)
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const [spawnPosition, setSpawnPosition] = useState<[number, number, number]>([0, 0, 0])
  const [spawnRotation, setSpawnRotation] = useState<[number, number, number]>([0, 0, 0])
  const [cameraPosition, setCameraPosition] = useState<THREE.Vector3 | undefined>(undefined)
  const [cameraRotation, setCameraRotation] = useState<THREE.Euler | undefined>(undefined)

  const handleSpawnpointFound = (position: THREE.Vector3, rotation: THREE.Euler) => {
    setSpawnPosition([position.x, position.y, position.z])
    setSpawnRotation([rotation.x, rotation.y, rotation.z])
  }

  const handleCameraFound = (position: THREE.Vector3, rotation: THREE.Euler) => {
    setCameraPosition(position.clone())
    setCameraRotation(rotation.clone())
  }

  // Calculate camera target (spawnpoint position + 1m up for character center)
  const cameraTarget: [number, number, number] = [
    spawnPosition[0],
    spawnPosition[1] + 1,
    spawnPosition[2]
  ]

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 3], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 100%)' }}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <Scene>
            <Lighting />
            
            {/* Load scene if selected */}
            <SceneLoader 
              sceneId={previewScene} 
              gameVersion={gameVersion}
              onSpawnpointFound={handleSpawnpointFound}
              onCameraFound={handleCameraFound}
            />
            
            {/* Show floor only if no scene is loaded */}
            {previewScene === 'none' && <Floor />}
            
            {/* NPC Model at spawnpoint */}
            <group position={spawnPosition} rotation={spawnRotation}>
              <NPCModel />
            </group>
            
            <CameraControls 
              target={cameraTarget} 
              cameraPosition={cameraPosition}
              cameraRotation={cameraRotation}
            />
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
