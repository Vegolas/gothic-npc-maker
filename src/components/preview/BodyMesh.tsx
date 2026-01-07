import { useGLTF } from '@react-three/drei'
import { type Mesh, MeshBasicMaterial } from 'three'
import { useEffect, useMemo, useState, Suspense } from 'react'
import type { Gender } from '../../types/npc'
import { getBodyMeshPath, getBodyTexturePath } from '../../utils/assetPaths'
import { loadTextureAsync } from '../../utils/textureLoader'
import { ModelErrorBoundary } from './ErrorBoundary'

interface BodyMeshProps {
  meshId: string
  textureVariant: number
  skinColor: number
  gender: Gender
  fatness: number
}

/**
 * Body mesh component
 * Renders the body model with applied texture
 * Falls back to placeholder if model doesn't exist
 */
export function BodyMesh({
  meshId,
  textureVariant,
  skinColor,
  gender,
  fatness,
}: BodyMeshProps) {
  const modelPath = getBodyMeshPath(meshId, gender)
  const texturePath = getBodyTexturePath(meshId, textureVariant, skinColor, gender)

  if (!modelPath) {
    return <PlaceholderBody fatness={fatness} />
  }

  return (
    <ModelErrorBoundary fallback={<PlaceholderBody fatness={fatness} />}>
      <Suspense fallback={<PlaceholderBody fatness={fatness} />}>
        <BodyMeshLoader
          modelPath={modelPath}
          texturePath={texturePath}
          fatness={fatness}
        />
      </Suspense>
    </ModelErrorBoundary>
  )
}

interface BodyMeshLoaderProps {
  modelPath: string
  texturePath: string
  fatness: number
}

function BodyMeshLoader({ modelPath, texturePath, fatness }: BodyMeshLoaderProps) {
  const { scene } = useGLTF(modelPath, true)

  // Try to load texture (supports PNG, TGA, JPG)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    setTexture(null) // Reset while loading new texture
    loadTextureAsync(texturePath, (loadedTexture) => {
      if (loadedTexture && loadedTexture.image) {
        setTexture(loadedTexture)
      } else {
        setTexture(null)
      }
    })
  }, [texturePath])

  // Clone scene to avoid modifying the cached original
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)

    // Apply fatness scaling
    // Gothic uses fatness as a scaling factor on X and Z
    const scale = 1 + (fatness * 0.2) // -0.2 to +0.2 range
    clone.scale.set(scale, 1, scale)

    return clone
  }, [scene, fatness])

  // Apply texture to all meshes in the scene (flat/unlit material)
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh
        if (texture) {
          mesh.material = new MeshBasicMaterial({ map: texture })
        } else {
          mesh.material = new MeshBasicMaterial({ color: '#d4a574' })
        }
      }
    })
  }, [clonedScene, texture])

  return <primitive object={clonedScene} />
}

/**
 * Placeholder body when model isn't loaded
 */
function PlaceholderBody({ fatness }: { fatness: number }) {
  const scale = 1 + (fatness * 0.2)

  return (
    <group>
      {/* Torso */}
      <mesh position={[0, 1, 0]}>
        <capsuleGeometry args={[0.25 * scale, 0.6, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.1, 0.35, 0]}>
        <capsuleGeometry args={[0.08 * scale, 0.5, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
      <mesh position={[0.1, 0.35, 0]}>
        <capsuleGeometry args={[0.08 * scale, 0.5, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.35 * scale, 1, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.06, 0.4, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
      <mesh position={[0.35 * scale, 1, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.06, 0.4, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
    </group>
  )
}
