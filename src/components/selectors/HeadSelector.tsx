import { useNPCStore } from '../../stores/npcStore'
import { discoverHeads } from '../../utils/assetDiscovery'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { cn } from '../../lib/utils'
import { getHeadTexturePath } from '../../utils/assetPaths'
import { loadTextureAsync } from '../../utils/textureLoader'
import { MeshBasicMaterial, type Mesh, type Texture } from 'three'

/**
 * Head mesh selector component
 * Visual card-based selector with 3D previews
 */
export function HeadSelector() {
  const gender = useNPCStore((state) => state.config.gender)
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const headMesh = useNPCStore((state) => state.config.headMesh)
  const headTextureVariant = useNPCStore((state) => state.config.headTexture)
  const skinColor = useNPCStore((state) => state.config.skinColor)
  const setHeadMesh = useNPCStore((state) => state.setHeadMesh)

  const heads = discoverHeads(gameVersion, gender)

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-text-primary">
        Head Type
      </label>
      <div className="grid grid-cols-8 gap-1 max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-iron-dark scrollbar-track-obsidian">
        {heads.map((head) => (
          <HeadCard
            key={head.id}
            id={head.id}
            name={head.name}
            path={head.path}
            isSelected={headMesh === head.id}
            onClick={() => setHeadMesh(head.id)}
            textureVariant={headTextureVariant}
            skinColor={skinColor}
            gender={gender}
            gameVersion={gameVersion}
          />
        ))}
      </div>
    </div>
  )
}

interface HeadCardProps {
  id: string
  name: string
  path: string
  isSelected: boolean
  onClick: () => void
  textureVariant: number
  skinColor: number
  gender: string
  gameVersion: string
}

function HeadCard({ id, name, path, isSelected, onClick, textureVariant, skinColor, gender, gameVersion }: HeadCardProps) {
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
          camera={{ position: [0, 0.18, 0.75], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} color="#b3d9ff" />
            <HeadPreview
              modelPath={path}
              headId={id}
              textureVariant={textureVariant}
              skinColor={skinColor}
              gender={gender as any}
              gameVersion={gameVersion as any}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-darker via-obsidian-darker/90 to-transparent p-0.5 pt-3">
        <p className="text-[7px] font-medium text-text-primary truncate text-center leading-tight">
          {name.replace('HUM HEAD ', '').substring(0, 6)}
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

interface HeadPreviewProps {
  modelPath: string
  headId: string
  textureVariant: number
  skinColor: number
  gender: any
  gameVersion: any
}

function HeadPreview({ modelPath, headId, textureVariant, skinColor, gender, gameVersion }: HeadPreviewProps) {
  const { scene } = useGLTF(modelPath, true)
  const [texture, setTexture] = useState<Texture | null>(null)

  const texturePath = getHeadTexturePath(headId, textureVariant, skinColor, gender, gameVersion)

  // Load texture
  useEffect(() => {
    setTexture(null)
    loadTextureAsync(texturePath, (loadedTexture) => {
      if (loadedTexture && loadedTexture.image) {
        setTexture(loadedTexture)
      }
    })
  }, [texturePath])

  // Clone scene
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    return clone
  }, [scene])

  // Apply texture
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

  return (
    <group rotation={[0.1, -Math.PI / 2, 0]} position={[0, 0.02, 0]}>
      <primitive object={clonedScene} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
        target={[0, 0.18, 0]}
      />
    </group>
  )
}
