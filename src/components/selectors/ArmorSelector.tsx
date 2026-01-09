import { useNPCStore } from '../../stores/npcStore'
import { discoverArmors } from '../../utils/assetDiscovery'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { cn } from '../../lib/utils'
import { MeshBasicMaterial, type Mesh } from 'three'

/**
 * Armor selector component
 * Visual card-based selector with 3D previews
 * Hidden for G1 Female (armors don't work with G1 females)
 */
export function ArmorSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const gender = useNPCStore((state) => state.config.gender)
  const armorInstance = useNPCStore((state) => state.config.armorInstance)
  const setArmorInstance = useNPCStore((state) => state.setArmorInstance)

  // Hide armor selector for G1 Female (armors don't work)
  if (gameVersion === 'g1' && gender === 'female') {
    return null
  }

  const armors = discoverArmors(gameVersion)

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-text-primary">
        Armor
      </label>
      <div className="grid grid-cols-8 gap-1 max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-iron-dark scrollbar-track-obsidian p-2">
        {/* No Armor option */}
        <NoArmorCard
          isSelected={armorInstance === null}
          onClick={() => setArmorInstance(null)}
        />
        {/* Armor options */}
        {armors.map((armor) => (
          <ArmorCard
            key={armor.id}
            name={armor.name}
            path={armor.path}
            isSelected={armorInstance === armor.id}
            onClick={() => setArmorInstance(armor.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface NoArmorCardProps {
  isSelected: boolean
  onClick: () => void
}

function NoArmorCard({ isSelected, onClick }: NoArmorCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded-lg border-2 overflow-hidden transition-all",
        "hover:scale-105 hover:shadow-lg",
        "flex items-center justify-center",
        isSelected
          ? "border-ember shadow-md shadow-ember/20 bg-obsidian-dark"
          : "border-iron-dark hover:border-iron bg-obsidian"
      )}
    >
      {/* No armor icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-iron opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker via-obsidian-darker/90 to-transparent p-0.5 pt-3">
        <p className="text-[10px] font-medium text-text-primary truncate text-center leading-tight">
          None
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0.5 right-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-ember flex items-center justify-center">
            <svg className="w-1.5 h-1.5 text-obsidian-darker" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </button>
  )
}

interface ArmorCardProps {
  name: string
  path: string
  isSelected: boolean
  onClick: () => void
}

function ArmorCard({ name, path, isSelected, onClick }: ArmorCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded-lg border-2 overflow-hidden transition-all",
        "hover:scale-105 hover:shadow-lg",
        isSelected
          ? "border-ember shadow-md shadow-ember/20 bg-obsidian-dark"
          : "border-iron-dark hover:border-iron bg-obsidian"
      )}
    >
      {/* 3D Preview */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.9, 2.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} color="#b3d9ff" />
            <ArmorPreview modelPath={path} />
          </Suspense>
        </Canvas>
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker via-obsidian-darker/90 to-transparent p-0.5 pt-3">
        <p className="text-[10px] font-medium text-text-primary truncate text-center leading-tight">
          {formatArmorName(name)}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0.5 right-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-ember flex items-center justify-center">
            <svg className="w-1.5 h-1.5 text-obsidian-darker" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </button>
  )
}

/**
 * Format armor name for display in the card
 * Truncates long names and removes common prefixes
 */
function formatArmorName(name: string): string {
  // Remove common prefixes
  let formatted = name
    .replace(/^ITAR /i, '')
    .replace(/^YOURH /i, '')
    .replace(/^VLK /i, 'V.')
    .replace(/^MIL /i, 'M.')
    .replace(/^KDF /i, 'K.')
    .replace(/^NOV /i, 'N.')
    .replace(/^PAL /i, 'P.')
    .replace(/^SLD /i, 'S.')
    .replace(/^BAU /i, 'B.')
    .replace(/^PIR /i, 'Pi.')
    .replace(/^DJG /i, 'D.')
    .replace(/^BDT /i, 'Bd.')
    .replace(/YOURHANNES/i, 'YH')

  // Truncate if still too long
  if (formatted.length > 8) {
    formatted = formatted.substring(0, 7) + '…'
  }

  return formatted
}

interface ArmorPreviewProps {
  modelPath: string
}

function ArmorPreview({ modelPath }: ArmorPreviewProps) {
  const { scene } = useGLTF(modelPath, true)

  // Clone scene and convert to basic materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    return clone
  }, [scene])

  // Convert materials to flat/unlit (MeshBasicMaterial)
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh
        const oldMaterial = mesh.material as MeshBasicMaterial

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
  }, [clonedScene])

  return (
    <group rotation={[0.1, -Math.PI / 4, 0]} position={[0, -0.6, 0]}>
      <primitive object={clonedScene} />
    </group>
  )
}
