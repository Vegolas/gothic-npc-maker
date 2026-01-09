import { useGLTF } from '@react-three/drei'
import { type Mesh, MeshBasicMaterial, Texture } from 'three'
import { useEffect, useMemo, useState, Suspense } from 'react'
import type { GameVersion, Gender } from '../../types/npc'
import { getArmorMeshPath, getBodyTexturePath } from '../../utils/assetPaths'
import { loadTextureAsync } from '../../utils/textureLoader'
import { ModelErrorBoundary } from './ErrorBoundary'

interface ArmorMeshProps {
  armorId: string
  gameVersion: GameVersion
  fatness: number
  bodyMesh: string
  bodyTextureVariant: number
  bodyTextureFile?: string | null
  skinColor: number
  gender: Gender
}

/**
 * Armor mesh component
 * Renders armor overlay on top of the body
 * Returns null if armor doesn't exist (no error)
 */
export function ArmorMesh({ 
  armorId, 
  gameVersion, 
  fatness,
  bodyMesh,
  bodyTextureVariant,
  bodyTextureFile,
  skinColor,
  gender
}: ArmorMeshProps) {
  const modelPath = getArmorMeshPath(armorId, gameVersion)

  // Get body texture path (same logic as BodyMesh)
  const bodyTexturePath = bodyTextureFile
    ? `/assets/${gameVersion}/${gender}/textures/body/${bodyTextureFile}`
    : getBodyTexturePath(bodyMesh, bodyTextureVariant, skinColor, gender, gameVersion)

  console.log('[ArmorMesh] armorId:', armorId, 'modelPath:', modelPath, 'bodyTexturePath:', bodyTexturePath)

  if (!modelPath) {
    console.warn('[ArmorMesh] No model path found for:', armorId)
    return null
  }

  return (
    <ModelErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <ArmorMeshLoader 
          modelPath={modelPath} 
          fatness={fatness}
          bodyTexturePath={bodyTexturePath}
        />
      </Suspense>
    </ModelErrorBoundary>
  )
}

interface ArmorMeshLoaderProps {
  modelPath: string
  fatness: number
  bodyTexturePath: string
}

function ArmorMeshLoader({ modelPath, fatness, bodyTexturePath }: ArmorMeshLoaderProps) {
  const { scene } = useGLTF(modelPath, true)
  const [bodyTexture, setBodyTexture] = useState<Texture | null>(null)

  // Load body texture
  useEffect(() => {
    setBodyTexture(null)
    loadTextureAsync(bodyTexturePath, (loadedTexture) => {
      if (loadedTexture && loadedTexture.image) {
        setBodyTexture(loadedTexture)
      }
    })
  }, [bodyTexturePath])

  // Clone scene
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    return clone
  }, [scene])

  // Convert materials to flat/unlit and replace skin textures
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh
        const oldMaterial = mesh.material as MeshBasicMaterial
        
        // Check if this material uses a skin texture (HUM_BODY_NAKED pattern)
        const isSkinMaterial = oldMaterial.map?.image?.src?.match(/HUM_BODY_NAKED.*_V\d+_C\d+/i)
        
        if (isSkinMaterial && bodyTexture) {
          // Replace with selected body texture
          console.log('[ArmorMesh] Replacing skin material with body texture')
          mesh.material = new MeshBasicMaterial({ map: bodyTexture })
        } else if (oldMaterial.map) {
          // Preserve existing texture
          mesh.material = new MeshBasicMaterial({ map: oldMaterial.map })
        } else if (oldMaterial.color) {
          mesh.material = new MeshBasicMaterial({ color: oldMaterial.color })
        } else {
          mesh.material = new MeshBasicMaterial({ color: '#888888' })
        }
      }
    })
  }, [clonedScene, bodyTexture])

  // Apply fatness scaling (X and Z only, preserves height)
  return (
    <group scale={[fatness, 1, fatness]}>
      <primitive object={clonedScene} />
    </group>
  )
}
