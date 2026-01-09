import { useEffect, useRef, useState, useCallback } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import {
  useThumbnailStore,
  getHeadThumbnailKey,
  getArmorThumbnailKey
} from '../../stores/thumbnailStore'
import { getHeadTexturePath } from '../../utils/assetPaths'
import { loadTextureAsync } from '../../utils/textureLoader'
import { MeshBasicMaterial, type Mesh, type Texture, type WebGLRenderer } from 'three'
import type { GameVersion, Gender } from '../../types/npc'

interface RenderJob {
  type: 'head' | 'armor'
  key: string
  modelPath: string
  // Head-specific
  headId?: string
  textureVariant?: number
  skinColor?: number
  gender?: Gender
  gameVersion?: GameVersion
}

// Global render queue and listeners
let renderQueue: RenderJob[] = []
let queueListeners: Array<() => void> = []

function notifyQueueChange() {
  queueListeners.forEach(listener => listener())
}

function subscribeToQueue(listener: () => void) {
  queueListeners.push(listener)
  return () => {
    queueListeners = queueListeners.filter(l => l !== listener)
  }
}

/**
 * Add a head thumbnail job to the render queue
 */
export function queueHeadThumbnail(
  headId: string,
  modelPath: string,
  textureVariant: number,
  skinColor: number,
  gender: Gender,
  gameVersion: GameVersion
): void {
  const key = getHeadThumbnailKey(headId, textureVariant, skinColor, gameVersion, gender)
  const store = useThumbnailStore.getState()

  // Skip if already cached or pending
  if (store.hasThumbnail(key) || store.isPending(key)) {
    return
  }

  // Check if already in queue
  if (renderQueue.some(job => job.key === key)) {
    return
  }

  store.setPending(key, true)
  renderQueue.push({
    type: 'head',
    key,
    modelPath,
    headId,
    textureVariant,
    skinColor,
    gender,
    gameVersion,
  })

  notifyQueueChange()
}

/**
 * Add an armor thumbnail job to the render queue
 */
export function queueArmorThumbnail(
  armorId: string,
  modelPath: string,
  gameVersion: GameVersion
): void {
  const key = getArmorThumbnailKey(armorId, gameVersion)
  const store = useThumbnailStore.getState()

  // Skip if already cached or pending
  if (store.hasThumbnail(key) || store.isPending(key)) {
    return
  }

  // Check if already in queue
  if (renderQueue.some(job => job.key === key)) {
    return
  }

  store.setPending(key, true)
  renderQueue.push({
    type: 'armor',
    key,
    modelPath,
  })

  notifyQueueChange()
}

/**
 * Get the next job from the queue
 */
function getNextJob(): RenderJob | null {
  return renderQueue.shift() || null
}

/**
 * Hidden thumbnail renderer component
 * Uses a single WebGL context to render all thumbnails
 */
export function ThumbnailRenderer() {
  const [currentJob, setCurrentJob] = useState<RenderJob | null>(null)
  const processingRef = useRef(false)
  const initialized = useThumbnailStore((state) => state.initialized)

  // Process queue function
  const processQueue = useCallback(() => {
    if (processingRef.current || renderQueue.length === 0 || !initialized) {
      return
    }

    const job = getNextJob()
    if (job) {
      // Double-check the thumbnail doesn't already exist (may have been loaded from DB)
      const store = useThumbnailStore.getState()
      if (store.hasThumbnail(job.key)) {
        store.setPending(job.key, false)
        // Process next item immediately
        setTimeout(processQueue, 0)
        return
      }

      processingRef.current = true
      setCurrentJob(job)
    }
  }, [initialized])

  // Subscribe to queue changes
  useEffect(() => {
    const unsubscribe = subscribeToQueue(processQueue)
    return unsubscribe
  }, [processQueue])

  // Initial process and periodic check
  useEffect(() => {
    if (!initialized) return

    processQueue()
    const interval = setInterval(processQueue, 200)
    return () => clearInterval(interval)
  }, [initialized, processQueue])

  const handleComplete = useCallback((dataUrl: string) => {
    if (currentJob) {
      useThumbnailStore.getState().setThumbnail(currentJob.key, dataUrl)
    }
    processingRef.current = false
    setCurrentJob(null)
    // Process next job
    setTimeout(() => {
      const store = useThumbnailStore.getState()
      if (store.initialized) {
        const job = getNextJob()
        if (job) {
          if (store.hasThumbnail(job.key)) {
            store.setPending(job.key, false)
            notifyQueueChange()
          } else {
            processingRef.current = true
            setCurrentJob(job)
          }
        }
      }
    }, 50)
  }, [currentJob])

  const handleError = useCallback(() => {
    if (currentJob) {
      useThumbnailStore.getState().setPending(currentJob.key, false)
    }
    processingRef.current = false
    setCurrentJob(null)
    // Process next job
    setTimeout(notifyQueueChange, 50)
  }, [currentJob])

  if (!currentJob) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: -9999,
        top: -9999,
        width: 128,
        height: 128,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        key={currentJob.key}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        camera={
          currentJob.type === 'head'
            ? { position: [0, 0.18, 0.75], fov: 45 }
            : { position: [0, 0.9, 2.5], fov: 45 }
        }
      >
        <ambientLight intensity={1} color="#b3d9ff" />
        {currentJob.type === 'head' ? (
          <HeadThumbnailScene
            key={currentJob.key}
            job={currentJob}
            onComplete={handleComplete}
            onError={handleError}
          />
        ) : (
          <ArmorThumbnailScene
            key={currentJob.key}
            job={currentJob}
            onComplete={handleComplete}
            onError={handleError}
          />
        )}
      </Canvas>
    </div>
  )
}

interface ThumbnailSceneProps {
  job: RenderJob
  onComplete: (dataUrl: string) => void
  onError: () => void
}

function HeadThumbnailScene({ job, onComplete, onError }: ThumbnailSceneProps) {
  const { gl, scene, camera } = useThree()
  const [ready, setReady] = useState(false)
  const frameCount = useRef(0)
  const captured = useRef(false)

  // Load model
  let gltfScene: THREE.Group | null = null
  try {
    const gltf = useGLTF(job.modelPath, true)
    gltfScene = gltf.scene
  } catch {
    useEffect(() => {
      onError()
    }, [onError])
    return null
  }

  const [texture, setTexture] = useState<Texture | null>(null)

  // Load texture
  useEffect(() => {
    if (!job.headId || job.textureVariant === undefined || job.skinColor === undefined || !job.gender || !job.gameVersion) {
      setReady(true)
      return
    }

    const texturePath = getHeadTexturePath(job.headId, job.textureVariant, job.skinColor, job.gender, job.gameVersion)
    loadTextureAsync(texturePath, (loadedTexture) => {
      setTexture(loadedTexture)
      setReady(true)
    })
  }, [job])

  // Clone and setup scene
  const clonedScene = gltfScene?.clone(true)

  useEffect(() => {
    if (!clonedScene) return

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

  // Capture after render
  useFrame(() => {
    if (!ready || captured.current) return

    frameCount.current++
    // Wait a few frames for everything to settle
    if (frameCount.current < 3) return

    captured.current = true

    try {
      gl.render(scene, camera)
      const dataUrl = (gl as WebGLRenderer).domElement.toDataURL('image/png')
      onComplete(dataUrl)
    } catch (err) {
      console.error('Failed to capture thumbnail:', err)
      onError()
    }
  })

  if (!clonedScene) return null

  return (
    <group rotation={[0.1, -Math.PI / 3, 0]} position={[0, 0.02, 0]}>
      <primitive object={clonedScene} />
    </group>
  )
}

function ArmorThumbnailScene({ job, onComplete, onError }: ThumbnailSceneProps) {
  const { gl, scene, camera } = useThree()
  const frameCount = useRef(0)
  const captured = useRef(false)

  // Load model
  let gltfScene: THREE.Group | null = null
  try {
    const gltf = useGLTF(job.modelPath, true)
    gltfScene = gltf.scene
  } catch {
    useEffect(() => {
      onError()
    }, [onError])
    return null
  }

  // Clone and setup scene
  const clonedScene = gltfScene?.clone(true)

  useEffect(() => {
    if (!clonedScene) return

    clonedScene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh
        const oldMaterial = mesh.material as MeshBasicMaterial

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

  // Capture after render
  useFrame(() => {
    if (captured.current) return

    frameCount.current++
    // Wait a few frames for everything to settle
    if (frameCount.current < 3) return

    captured.current = true

    try {
      gl.render(scene, camera)
      const dataUrl = (gl as WebGLRenderer).domElement.toDataURL('image/png')
      onComplete(dataUrl)
    } catch (err) {
      console.error('Failed to capture thumbnail:', err)
      onError()
    }
  })

  if (!clonedScene) return null

  return (
    <group rotation={[0.1, -Math.PI / 4, 0]} position={[0, -0.6, 0]}>
      <primitive object={clonedScene} />
    </group>
  )
}
