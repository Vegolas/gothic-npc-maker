import { useGLTF } from '@react-three/drei'
import { type Mesh, MeshBasicMaterial } from 'three'
import { useEffect, useMemo, useState, Suspense } from 'react'
import type { Gender, GameVersion } from '../../types/npc'
import { getHeadMeshPath, getHeadTexturePath } from '../../utils/assetPaths'
import { loadTextureAsync } from '../../utils/textureLoader'
import { ModelErrorBoundary } from './ErrorBoundary'

interface HeadMeshProps {
  meshId: string
  textureVariant: number
  textureFile?: string | null  // Direct texture filename (overrides variant/skinColor)
  skinColor: number
  gender: Gender
  gameVersion: GameVersion
  headOffsetX: number
  headOffsetY: number
  headOffsetZ: number
  fatness: number
}

/**
 * Head mesh component
 * Renders the head model with applied texture
 * Falls back to placeholder if model doesn't exist
 */
export function HeadMesh({
  meshId,
  textureVariant,
  textureFile,
  skinColor,
  gender,
  gameVersion,
  headOffsetX,
  headOffsetY,
  headOffsetZ,
  fatness,
}: HeadMeshProps) {
  const modelPath = getHeadMeshPath(meshId, gender, gameVersion)

  // For non-G1-female, ignore textureFile and always use variant/skinColor
  const isG1Female = gameVersion === 'g1' && gender === 'female'
  const texturePath = (isG1Female && textureFile)
    ? `${import.meta.env.BASE_URL}assets/${gameVersion}/${gender}/textures/head/${textureFile}`
    : getHeadTexturePath(meshId, textureVariant, skinColor, gender, gameVersion)

  if (!modelPath) {
    return <PlaceholderHead headOffsetX={headOffsetX} headOffsetY={headOffsetY} headOffsetZ={headOffsetZ} fatness={fatness} />
  }

  return (
    <ModelErrorBoundary fallback={<PlaceholderHead headOffsetX={headOffsetX} headOffsetY={headOffsetY} headOffsetZ={headOffsetZ} fatness={fatness} />}>
      <Suspense fallback={<PlaceholderHead headOffsetX={headOffsetX} headOffsetY={headOffsetY} headOffsetZ={headOffsetZ} fatness={fatness} />}>
        <HeadMeshLoader
          modelPath={modelPath}
          texturePath={texturePath}
          headOffsetX={headOffsetX}
          headOffsetY={headOffsetY}
          headOffsetZ={headOffsetZ}
          fatness={fatness}
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
  fatness: number
}

function HeadMeshLoader({ modelPath, texturePath, headOffsetX, headOffsetY, headOffsetZ, fatness }: HeadMeshLoaderProps) {
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
    return clone
  }, [scene])

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

  // Position head at neck height + offsets using a group, with fatness scaling
  // Rotate -90 degrees on Y axis (left/right rotation)
  return (
    <group 
      position={[headOffsetX, 1.5 + headOffsetY, headOffsetZ]} 
      scale={[fatness, 1, fatness]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <primitive object={clonedScene} />
    </group>
  )
}

/**
 * Placeholder head when model isn't loaded
 */
function PlaceholderHead({ headOffsetX, headOffsetY, headOffsetZ, fatness }: { headOffsetX: number; headOffsetY: number; headOffsetZ: number; fatness: number }) {
  return (
    <group 
      position={[headOffsetX, 1.5 + headOffsetY, headOffsetZ]} 
      scale={[fatness, 1, fatness]}
      rotation={[0, -Math.PI / 2, 0]}
    >
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
