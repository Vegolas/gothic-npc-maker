import { useGLTF } from '@react-three/drei'
import { type Mesh, MeshBasicMaterial, Texture } from 'three'
import { useEffect, useMemo, useState, Suspense } from 'react'
import type { GameVersion, Gender } from '../../types/npc'
import { getArmorMeshPath, getBodyTexturePath } from '../../utils/assetPaths'
import { getBodyDirectory } from '../../utils/assetDiscovery'
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
  // Only use bodyTextureFile for G1 Female mode, otherwise use variant/skinColor
  const isG1Female = gameVersion === 'g1' && gender === 'female'
  const bodyDirectory = getBodyDirectory(bodyMesh, gameVersion, gender)
  const bodyTexturePath = (isG1Female && bodyTextureFile && bodyDirectory)
    ? `/assets/${gameVersion}/${gender}/bodies/${bodyDirectory}/${bodyTextureFile}`
    : getBodyTexturePath(bodyMesh, bodyTextureVariant, skinColor, gender, gameVersion)

  if (!modelPath) {
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
  const [skinMeshes, setSkinMeshes] = useState<Mesh[]>([])

  // Load body texture
  useEffect(() => {
    setBodyTexture(null)
    loadTextureAsync(bodyTexturePath, (loadedTexture) => {
      if (loadedTexture && loadedTexture.image) {
        setBodyTexture(loadedTexture)
      }
    })
  }, [bodyTexturePath])

  // Clone scene and identify skin meshes
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    const skinMeshesList: Mesh[] = []
    
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh
        const material = mesh.material as MeshBasicMaterial
        
        // Check if this material uses a skin texture using the texture name property
        const textureName = material.map?.name
        const isSkinMaterial = textureName && textureName.match(/HUM_BODY_NAKED.*_V\d+_C\d+/i)
        
        if (isSkinMaterial) {
          skinMeshesList.push(mesh)
        }
      }
    })
    
    setSkinMeshes(skinMeshesList)
    return clone
  }, [scene])

  // Convert materials to flat/unlit
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh
        const oldMaterial = mesh.material as MeshBasicMaterial
        
        // Don't process skin meshes here - they'll be handled separately
        if (skinMeshes.includes(mesh)) {
          return
        }
        
        // Preserve existing texture or color
        if (oldMaterial.map) {
          mesh.material = new MeshBasicMaterial({ map: oldMaterial.map })
        } else if (oldMaterial.color) {
          mesh.material = new MeshBasicMaterial({ color: oldMaterial.color })
        } else {
          mesh.material = new MeshBasicMaterial({ color: '#888888' })
        }
      }
    })
  }, [clonedScene, skinMeshes])

  // Update skin meshes whenever body texture changes
  useEffect(() => {
    if (!bodyTexture || skinMeshes.length === 0) return

    skinMeshes.forEach((mesh) => {
      mesh.material = new MeshBasicMaterial({ map: bodyTexture })
    })
  }, [bodyTexture, skinMeshes])

  // Apply fatness scaling (X and Z only, preserves height)
  return (
    <group scale={[fatness, 1, fatness]}>
      <primitive object={clonedScene} />
    </group>
  )
}
