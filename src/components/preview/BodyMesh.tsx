import { useGLTF } from '@react-three/drei'
import { type Mesh, MeshBasicMaterial } from 'three'
import { useEffect, useMemo, useState, Suspense } from 'react'
import type { Gender, GameVersion } from '../../types/npc'
import { getBodyMeshPath, getBodyTexturePath } from '../../utils/assetPaths'
import { loadTextureAsync } from '../../utils/textureLoader'
import { ModelErrorBoundary } from './ErrorBoundary'

interface BodyMeshProps {
  meshId: string
  textureVariant: number
  textureFile?: string | null  // Direct texture filename (overrides variant/skinColor)
  skinColor: number
  gender: Gender
  gameVersion: GameVersion
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
  textureFile,
  skinColor,
  gender,
  gameVersion,
  fatness,
}: BodyMeshProps) {
  const modelPath = getBodyMeshPath(meshId, gender, gameVersion)

  // Use direct texture file if provided, otherwise construct path from variant/color
  const texturePath = textureFile
    ? `/assets/${gameVersion}/${gender}/textures/body/${textureFile}`
    : getBodyTexturePath(meshId, textureVariant, skinColor, gender, gameVersion)

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
    return scene.clone(true)
  }, [scene])

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

  // Apply fatness scaling via group (X and Z only, preserves height)
  return (
    <group scale={[fatness, 1, fatness]}>
      <primitive object={clonedScene} />
    </group>
  )
}

/**
 * Placeholder body when model isn't loaded
 */
function PlaceholderBody({ fatness }: { fatness: number }) {
  return (
    <group scale={[fatness, 1, fatness]}>
      {/* Torso */}
      <mesh position={[0, 1, 0]}>
        <capsuleGeometry args={[0.25, 0.6, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.1, 0.35, 0]}>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
      <mesh position={[0.1, 0.35, 0]}>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.35, 1, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.06, 0.4, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
      <mesh position={[0.35, 1, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.06, 0.4, 8, 16]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
    </group>
  )
}
