// src/services/storage/cacheStorage.service.ts
import type { ICacheStorage } from "@/types/storage/cacheStorage.types"
const CACHE_NAME = "evolve-with-cache"

/**
 * Factory function to create a strongly typed CacheStorage service.
 *
 * @template T - The expected type of values stored in the Cache.
 * @param cacheName - Optional name of the cache (defaults to `"default-cache"`).
 * @returns A Promise that resolves to an object implementing `ICacheStorage<T>`.
 */
export const createCacheStorageService = async <T>(cacheName: string = CACHE_NAME): Promise<ICacheStorage<T>> => {
  const getCache = async () => await caches.open(cacheName)

  return {
    /**
     * Checks whether the CacheStorage API is available in the current environment.
     */
    state: async () => typeof window !== "undefined" && "caches" in window,

    /**
     * Checks if a cache entry exists by key.
     *
     * @param key - The cache key (URL string).
     * @returns Boolean indicating presence.
     */
    has: async ({ key }) => {
      const cache = await getCache()
      const match = await cache.match(key)
      return !!match
    },

    /**
     * Retrieves a cached item by key.
     *
     * @param key - The cache key (URL string).
     * @returns Parsed data of type T or null.
     *
     * @example
     * const cache = await createCacheStorageService<TUser>()
     * const user = await cache.get({ key: "/user" })
     */
    get: async ({ key }) => {
      const cache = await getCache()
      const response = await cache.match(key)
      if (!response) return null
      try {
        return (await response.json()) as T
      } catch {
        return null
      }
    },

    /**
     * Retrieves multiple cached items by keys.
     *
     * @param keys - Array of cache keys.
     * @returns Array of parsed results or nulls.
     */
    getMany: async ({ keys }) => {
      const cache = await getCache()
      const results: (T | null)[] = await Promise.all(
        keys.map(async (key) => {
          const response = await cache.match(key)
          if (!response) return null
          try {
            return (await response.json()) as T
          } catch {
            return null
          }
        }),
      )
      return results
    },

    /**
     * Stores a value in the cache under the given key.
     *
     * @param key - Cache key.
     * @param value - Value of type T.
     * @returns Boolean indicating success.
     *
     * @example
     * const cache = await createCacheStorageService<TUser>()
     * await cache.put({ key: "/user", value: { name: "Ada", age: 30 } })
     */
    put: async ({ key, value }) => {
      try {
        const cache = await getCache()
        const response = new Response(JSON.stringify(value), {
          headers: { "Content-Type": "application/json" },
        })
        await cache.put(key, response)
        return true
      } catch {
        return false
      }
    },

    /**
     * Deletes a single cache entry.
     *
     * @param key - Cache key to remove.
     * @returns Boolean indicating success.
     */
    delete: async ({ key }) => {
      try {
        const cache = await getCache()
        return await cache.delete(key)
      } catch {
        return false
      }
    },

    /**
     * Deletes multiple cache entries.
     *
     * @param keys - List of keys to delete.
     * @returns Boolean indicating overall success.
     */
    deleteMany: async ({ keys }) => {
      try {
        const cache = await getCache()
        const results = await Promise.all(keys.map((key) => cache.delete(key)))
        return results.every(Boolean)
      } catch {
        return false
      }
    },

    /**
     * Clears all entries from the current cache.
     *
     * @returns Boolean indicating success.
     */
    clearAll: async () => {
      try {
        const success = await caches.delete(cacheName)
        return success
      } catch {
        return false
      }
    },
  }
}

/**
 * Clears all entries from your app's cache storage.
 *
 * @returns Promise<boolean> indicating success.
 *
 * @example
 * const success = await clearCache()
 */
export const clearCache = async (): Promise<boolean> => {
  try {
    const cacheService = await createCacheStorageService()
    const success = await cacheService.clearAll()
    return success
  } catch {
    return false
  }
}
