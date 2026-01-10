/**
 * Texture loading utility that supports multiple formats
 * Supports: PNG, TGA, JPG
 */

import { TextureLoader, type Texture, SRGBColorSpace } from 'three'

// Dynamically import TGALoader to avoid issues
let TGALoaderClass: typeof import('three/examples/jsm/loaders/TGALoader.js').TGALoader | null = null

async function getTGALoader() {
  if (!TGALoaderClass) {
    try {
      const module = await import('three/examples/jsm/loaders/TGALoader.js')
      TGALoaderClass = module.TGALoader
    } catch (e) {
      console.warn('TGALoader not available:', e)
      return null
    }
  }
  return TGALoaderClass
}

/**
 * Load a texture from a path, trying multiple extensions
 * Returns null if no texture could be loaded
 */
export function loadTextureAsync(
  basePath: string,
  onLoad: (texture: Texture | null) => void
): void {
  // Remove extension if present to try multiple formats
  const pathWithoutExt = basePath.replace(/\.(png|tga|jpg|jpeg)$/i, '')

  // Try PNG and JPG first with standard loader (both cases), then TGA
  const standardExtensions = ['.png', '.PNG', '.jpg', '.JPG']

  tryStandardExtensions(pathWithoutExt, standardExtensions, 0, (texture) => {
    if (texture) {
      onLoad(texture)
    } else {
      // Try TGA as fallback (both cases)
      tryTGATexture(pathWithoutExt + '.tga', (tgaTexture) => {
        if (tgaTexture) {
          onLoad(tgaTexture)
        } else {
          tryTGATexture(pathWithoutExt + '.TGA', onLoad)
        }
      })
    }
  })
}

/**
 * Load a texture from multiple possible paths
 * Tries each path in sequence until one succeeds
 */
export function loadTextureFromPaths(
  paths: string[],
  onLoad: (texture: Texture | null) => void
): void {
  if (paths.length === 0) {
    onLoad(null)
    return
  }

  const tryPath = (index: number) => {
    if (index >= paths.length) {
      onLoad(null)
      return
    }

    loadTextureAsync(paths[index], (texture) => {
      if (texture) {
        onLoad(texture)
      } else {
        tryPath(index + 1)
      }
    })
  }

  tryPath(0)
}

function tryStandardExtensions(
  basePath: string,
  extensions: string[],
  index: number,
  onLoad: (texture: Texture | null) => void
): void {
  if (index >= extensions.length) {
    onLoad(null)
    return
  }

  const ext = extensions[index]
  const fullPath = basePath + ext
  const loader = new TextureLoader()

  loader.load(
    fullPath,
    (texture) => {
      texture.flipY = false
      texture.colorSpace = SRGBColorSpace
      onLoad(texture)
    },
    undefined,
    () => {
      tryStandardExtensions(basePath, extensions, index + 1, onLoad)
    }
  )
}

async function tryTGATexture(
  fullPath: string,
  onLoad: (texture: Texture | null) => void
): Promise<void> {
  const LoaderClass = await getTGALoader()

  if (!LoaderClass) {
    onLoad(null)
    return
  }

  try {
    const loader = new LoaderClass()
    loader.load(
      fullPath,
      (texture) => {
        if (texture) {
          texture.flipY = false
          texture.colorSpace = SRGBColorSpace
          onLoad(texture)
        } else {
          onLoad(null)
        }
      },
      undefined,
      () => {
        onLoad(null)
      }
    )
  } catch (e) {
    console.warn('TGA loading error:', e)
    onLoad(null)
  }
}

/**
 * Get the list of texture paths that will be tried
 * Useful for debugging/display
 */
export function getTexturePaths(basePath: string): string[] {
  const pathWithoutExt = basePath.replace(/\.(png|tga|jpg|jpeg)$/i, '')
  return ['.png', '.PNG', '.jpg', '.JPG', '.tga', '.TGA'].map(ext => pathWithoutExt + ext)
}
