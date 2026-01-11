import { create } from 'zustand'

const DB_NAME = 'npc-creator-thumbnails'
const DB_VERSION = 1
const STORE_NAME = 'thumbnails'

/**
 * Simple IndexedDB wrapper for thumbnail persistence
 */
class ThumbnailDB {
  private db: IDBDatabase | null = null
  private initPromise: Promise<void> | null = null

  async init(): Promise<void> {
    if (this.db) return
    if (this.initPromise) return this.initPromise

    this.initPromise = new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        console.warn('IndexedDB not available, thumbnails will not persist')
        resolve()
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME)
        }
      }
    })

    return this.initPromise
  }

  async get(key: string): Promise<string | null> {
    await this.init()
    if (!this.db) return null

    return new Promise((resolve) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(key)

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => resolve(null)
    })
  }

  async set(key: string, value: string): Promise<void> {
    await this.init()
    if (!this.db) return

    return new Promise((resolve) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      store.put(value, key)

      transaction.oncomplete = () => resolve()
      transaction.onerror = () => resolve()
    })
  }

  async getAllKeys(): Promise<string[]> {
    await this.init()
    if (!this.db) return []

    return new Promise((resolve) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAllKeys()

      request.onsuccess = () => resolve(request.result as string[])
      request.onerror = () => resolve([])
    })
  }

  async getAll(): Promise<Map<string, string>> {
    await this.init()
    if (!this.db) return new Map()

    return new Promise((resolve) => {
      const map = new Map<string, string>()
      const transaction = this.db!.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.openCursor()

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
        if (cursor) {
          map.set(cursor.key as string, cursor.value)
          cursor.continue()
        } else {
          resolve(map)
        }
      }

      request.onerror = () => resolve(map)
    })
  }

  async clear(): Promise<void> {
    await this.init()
    if (!this.db) return

    return new Promise((resolve) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      store.clear()

      transaction.oncomplete = () => resolve()
      transaction.onerror = () => resolve()
    })
  }
}

const thumbnailDB = new ThumbnailDB()

interface ThumbnailState {
  thumbnails: Map<string, string> // key -> data URL
  pending: Set<string> // keys currently being rendered
  initialized: boolean
  getThumbnail: (key: string) => string | null
  setThumbnail: (key: string, dataUrl: string) => void
  isPending: (key: string) => boolean
  setPending: (key: string, pending: boolean) => void
  loadFromDB: () => Promise<void>
  hasThumbnail: (key: string) => boolean
  clearCache: () => Promise<void>
}

/**
 * Store for caching rendered thumbnails
 * Thumbnails are persisted to IndexedDB for fast loading on subsequent visits
 */
export const useThumbnailStore = create<ThumbnailState>((set, get) => ({
  thumbnails: new Map(),
  pending: new Set(),
  initialized: false,

  getThumbnail: (key: string) => {
    return get().thumbnails.get(key) || null
  },

  hasThumbnail: (key: string) => {
    return get().thumbnails.has(key)
  },

  setThumbnail: (key: string, dataUrl: string) => {
    // Save to IndexedDB (fire and forget)
    thumbnailDB.set(key, dataUrl)

    set((state) => {
      const newThumbnails = new Map(state.thumbnails)
      newThumbnails.set(key, dataUrl)
      const newPending = new Set(state.pending)
      newPending.delete(key)
      return { thumbnails: newThumbnails, pending: newPending }
    })
  },

  isPending: (key: string) => {
    return get().pending.has(key)
  },

  setPending: (key: string, pending: boolean) => {
    set((state) => {
      const newPending = new Set(state.pending)
      if (pending) {
        newPending.add(key)
      } else {
        newPending.delete(key)
      }
      return { pending: newPending }
    })
  },

  loadFromDB: async () => {
    if (get().initialized) return

    const cached = await thumbnailDB.getAll()
    set({ thumbnails: cached, initialized: true })
  },

  clearCache: async () => {
    await thumbnailDB.clear()
    set({ thumbnails: new Map(), pending: new Set() })
  },
}))

// Initialize on load - load cached thumbnails from IndexedDB
useThumbnailStore.getState().loadFromDB()

/**
 * Check if a thumbnail exists (in memory or will be loaded from DB)
 * Use this before queueing to avoid re-rendering existing thumbnails
 */
export async function thumbnailExists(key: string): Promise<boolean> {
  const store = useThumbnailStore.getState()
  if (store.hasThumbnail(key)) return true

  // Check IndexedDB directly if store not yet initialized
  const cached = await thumbnailDB.get(key)
  return cached !== null
}

/**
 * Generate a cache key for head thumbnails
 */
export function getHeadThumbnailKey(
  headId: string,
  textureVariant: number,
  skinColor: number,
  gameVersion: string,
  gender: string
): string {
  return `head:${gameVersion}:${gender}:${headId}:v${textureVariant}:c${skinColor}`
}

/**
 * Generate a cache key for armor thumbnails
 */
export function getArmorThumbnailKey(
  armorId: string,
  gameVersion: string
): string {
  return `armor:${gameVersion}:${armorId}`
}

/**
 * Generate a cache key for body thumbnails
 */
export function getBodyThumbnailKey(
  bodyId: string,
  gameVersion: string,
  gender: string
): string {
  return `body:${gameVersion}:${gender}:${bodyId}`
}
