import { useGLTF } from '@react-three/drei'
import { type Mesh, MeshBasicMaterial } from 'three'
import { useEffect, useMemo, useState, Suspense } from 'react'
import type { Gender } from '../../types/npc'
import { getHeadMeshPath, getHeadTexturePath } from '../../utils/assetPaths'
import { loadTextureAsync } from '../../utils/textureLoader'
import { ModelErrorBoundary } from './ErrorBoundary'

interface HeadMeshProps {
  meshId: string
  textureVariant: number
  skinColor: number
  gender: Gender
  headOffsetX: number
  headOffsetY: number
  headOffsetZ: number
}

/**
 * Head mesh component
 * Renders the head model with applied texture
 * Falls back to placeholder if model doesn't exist
 */
export function HeadMesh({
  meshId,
  textureVariant,
  skinColor,
  gender,
  headOffsetX,
  headOffsetY,
  headOffsetZ,
}: HeadMeshProps) {
  const modelPath = getHeadMeshPath(meshId, gender)
  const texturePath = getHeadTexturePath(meshId, textureVariant, skinColor, gender)

  if (!modelPath) {
    return <PlaceholderHead headOffsetX={headOffsetX} headOffsetY={headOffsetY} headOffsetZ={headOffsetZ} />
  }

  return (
    <ModelErrorBoundary fallback={<PlaceholderHead headOffsetX={headOffsetX} headOffsetY={headOffsetY} headOffsetZ={headOffsetZ} />}>
      <Suspense fallback={<PlaceholderHead headOffsetX={headOffsetX} headOffsetY={headOffsetY} headOffsetZ={headOffsetZ} />}>
        <HeadMeshLoader
          modelPath={modelPath}
          texturePath={texturePath}
          headOffsetX={headOffsetX}
          headOffsetY={headOffsetY}
          headOffsetZ={headOffsetZ}
        />
      </Suspense>
    </ModelErrorBoundary>
  )
}

interface HeadMeshLoaderProps {
  modelPath: string
  texturePath: string
  headOffsetX: number
  headOffsetY: number
  headOffsetZ: number
}

function HeadMeshLoader({ modelPath, texturePath, headOffsetX, headOffsetY, headOffsetZ }: HeadMeshLoaderProps) {
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

  // Clone scene
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    // Position head at neck height + offsets
    // Base height 1.5, adjustable with headOffsetY
    clone.position.set(headOffsetX, 1.5 + headOffsetY, headOffsetZ)
    return clone
  }, [scene, headOffsetX, headOffsetY, headOffsetZ])

  // Apply texture or default material (flat/unlit)
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
 * Placeholder head when model isn't loaded
 */
function PlaceholderHead({ headOffsetX, headOffsetY, headOffsetZ }: { headOffsetX: number; headOffsetY: number; headOffsetZ: number }) {
  return (
    <group position={[headOffsetX, 1.5 + headOffsetY, headOffsetZ]}>
      {/* Head sphere */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#d4a574" />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.1, 16]} />
        <meshBasicMaterial color="#d4a574" />
      </mesh>
    </group>
  )
}
