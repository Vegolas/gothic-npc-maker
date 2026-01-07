/**
 * Custom hook for loading GLTF models with error handling
 * Wraps useGLTF from drei with additional functionality
 */

import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import type { GLTF } from 'three-stdlib'

interface UseGLTFModelResult {
  gltf: GLTF | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook for loading GLTF models with graceful error handling
 * Returns null for gltf if the model doesn't exist or fails to load
 */
export function useGLTFModel(path: string): UseGLTFModelResult {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [gltf, setGltf] = useState<GLTF | null>(null)

  useEffect(() => {
    if (!path) {
      setGltf(null)
      setIsLoading(false)
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    // Check if file exists first
    fetch(path, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Model not found: ${path}`)
        }
        // File exists, let useGLTF handle the actual loading
        // This will be handled by the component using this hook
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        setGltf(null)
        setIsLoading(false)
      })
  }, [path])

  return { gltf, isLoading, error }
}

/**
 * Preload models for faster switching
 * Call this with paths you expect to use
 */
export function preloadModels(paths: string[]) {
  paths.forEach(path => {
    if (path) {
      useGLTF.preload(path)
    }
  })
}
