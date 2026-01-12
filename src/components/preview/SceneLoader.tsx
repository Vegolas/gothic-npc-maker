import { useGLTF } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import { getScenePath } from '../../data/scenes'
import type { GameVersion } from '../../types/npc'
import * as THREE from 'three'

interface SceneLoaderProps {
  sceneId: string
  gameVersion: GameVersion
  onSpawnpointFound?: (position: THREE.Vector3, rotation: THREE.Euler) => void
  onCameraFound?: (position: THREE.Vector3, rotation: THREE.Euler) => void
}

/**
 * Scene loader component
 * Loads a scene GLB file and finds the "spawnpoint" object for NPC placement
 * and "preview_camera" object for initial camera position
 */
export function SceneLoader({ sceneId, gameVersion, onSpawnpointFound, onCameraFound }: SceneLoaderProps) {
  // Don't load if scene is 'none'
  if (sceneId === 'none') {
    return null
  }

  const scenePath = getScenePath(sceneId, gameVersion)
  if (!scenePath) {
    return null
  }

  return <SceneLoaderContent scenePath={scenePath} onSpawnpointFound={onSpawnpointFound} onCameraFound={onCameraFound} />
}

function SceneLoaderContent({
  scenePath,
  onSpawnpointFound,
  onCameraFound
}: {
  scenePath: string
  onSpawnpointFound?: (position: THREE.Vector3, rotation: THREE.Euler) => void
  onCameraFound?: (position: THREE.Vector3, rotation: THREE.Euler) => void
}) {
  const { scene } = useGLTF(scenePath, true) as unknown as { scene: THREE.Object3D }

  // Clone the scene to avoid modifying the cached original
  const clonedScene = useMemo<THREE.Object3D>(() => {
    return scene.clone(true) as THREE.Object3D
  }, [scene])

  // Find spawnpoint and camera - useMemo to calculate once
  const sceneData = useMemo(() => {
    // Search for objects (case-insensitive, allows trailing underscore)
    let spawnpoint: THREE.Object3D | null = null
    let camera: THREE.Object3D | null = null

    clonedScene.traverse((child) => {
      const normalizedName = child.name.toLowerCase().replace(/_+$/, '')

      if (normalizedName === 'spawnpoint') {
        spawnpoint = child
      } else if (normalizedName === 'preview_camera') {
        camera = child
      }
    })

    // Update all matrices to ensure correct world transforms
    clonedScene.updateMatrixWorld(true)

    const result: {
      spawn: { position: THREE.Vector3; rotation: THREE.Euler }
      camera?: { position: THREE.Vector3; rotation: THREE.Euler }
    } = {
      spawn: { position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler(0, 0, 0) }
    }

    if (spawnpoint) {
      const position = new THREE.Vector3()
      const quaternion = new THREE.Quaternion()
      const rotation = new THREE.Euler()

      ;(spawnpoint as unknown as THREE.Object3D).getWorldPosition(position)
      ;(spawnpoint as unknown as THREE.Object3D).getWorldQuaternion(quaternion)
      rotation.setFromQuaternion(quaternion)

      result.spawn = { position, rotation }
    } else {
      console.warn(`Spawnpoint not found in scene ${scenePath}, using origin`)
    }

    if (camera) {
      const position = new THREE.Vector3()
      const quaternion = new THREE.Quaternion()
      const rotation = new THREE.Euler()

      ;(camera as unknown as THREE.Object3D).getWorldPosition(position)
      ;(camera as unknown as THREE.Object3D).getWorldQuaternion(quaternion)
      rotation.setFromQuaternion(quaternion)

      result.camera = { position, rotation }
    }

    return result
  }, [clonedScene, scenePath])

  // Notify parent when data is calculated
  useEffect(() => {
    if (onSpawnpointFound) {
      onSpawnpointFound(sceneData.spawn.position, sceneData.spawn.rotation)
    }
    if (onCameraFound && sceneData.camera) {
      onCameraFound(sceneData.camera.position, sceneData.camera.rotation)
    }
  }, [sceneData, onSpawnpointFound, onCameraFound])

  return <primitive object={clonedScene} />
}
