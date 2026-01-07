import { useGLTF } from '@react-three/drei'
import { type Mesh, MeshBasicMaterial } from 'three'
import { useEffect, useMemo, Suspense } from 'react'
import { getArmorMeshPath } from '../../utils/assetPaths'
import { getArmorById } from '../../data/armors'
import { ModelErrorBoundary } from './ErrorBoundary'

interface ArmorMeshProps {
  armorId: string
}

/**
 * Armor mesh component
 * Renders armor overlay on top of the body
 * Returns null if armor doesn't exist (no error)
 */
export function ArmorMesh({ armorId }: ArmorMeshProps) {
  const modelPath = getArmorMeshPath(armorId)
  const armor = getArmorById(armorId)

  if (!modelPath || !armor) {
    return null
  }

  return (
    <ModelErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <ArmorMeshLoader modelPath={modelPath} />
      </Suspense>
    </ModelErrorBoundary>
  )
}

interface ArmorMeshLoaderProps {
  modelPath: string
}

function ArmorMeshLoader({ modelPath }: ArmorMeshLoaderProps) {
  const { scene } = useGLTF(modelPath, true)

  // Clone scene
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    return clone
  }, [scene])

  // Convert materials to flat/unlit
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh
        const oldMaterial = mesh.material as MeshBasicMaterial
        // Create flat material, preserving texture if it exists
        if (oldMaterial.map) {
          mesh.material = new MeshBasicMaterial({ map: oldMaterial.map })
        } else if (oldMaterial.color) {
          mesh.material = new MeshBasicMaterial({ color: oldMaterial.color })
        } else {
          mesh.material = new MeshBasicMaterial({ color: '#888888' })
        }
      }
    })
  }, [clonedScene])

  return <primitive object={clonedScene} />
}
