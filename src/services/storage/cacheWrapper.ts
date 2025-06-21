// src/services/storage/cacheWrapper.ts
import { createCacheStorageService } from "./cacheStorage.service"
import type { ICacheStorage } from "@/types"

interface CacheEntry<T> {
  data: T
  timestamp: number
}

interface CacheOptions<T> {
  durationMs?: number
  merge?: (newData: T, existingData: T | null) => T
}

interface IConstructorArgs<T> {
  cacheName?: string
  options?: CacheOptions<T> // Make options optional to allow default
}

export class CacheWrapper<T> {
  private cache: Promise<ICacheStorage<CacheEntry<T>>>
  private defaultOptions: CacheOptions<T>

  constructor({ cacheName = "questionnaire-cache", options = {} }: IConstructorArgs<T> = {}) {
    this.cache = createCacheStorageService<CacheEntry<T>>(cacheName)
    this.defaultOptions = {
      durationMs: 24 * 60 * 60 * 1000, // 24 hours
      ...options,
    }
  }

  private getScopedKey(tag: string) {
    return `tag::${tag}`
  }

  async getOrFetchByTag(tag: string, fetchFn: () => Promise<T>): Promise<T | null> {
    const key = this.getScopedKey(tag)
    return this.getOrFetch(key, fetchFn)
  }

  async updateByTag(tag: string, data: T): Promise<void> {
    const key = this.getScopedKey(tag)
    return this.update(key, data)
  }

  async deleteByTag(tag: string): Promise<void> {
    const key = this.getScopedKey(tag)
    const cache = await this.cache
    await cache.delete({ key })
  }

  async getOrFetch(key: string, fetchFn: () => Promise<T>): Promise<T | null> {
    const cache = await this.cache
    const entry = await cache.get({ key })

    const isFresh = entry && Date.now() - entry.timestamp < (this.defaultOptions.durationMs || Infinity)

    if (isFresh) {
      console.info(`[CacheWrapper] Cache hit for key: ${key}`)
      return entry.data
    }

    console.info(`[CacheWrapper] Cache miss or stale. Fetching fresh data for key: ${key}`)

    try {
      const newData = await fetchFn()
      const mergedData = this.defaultOptions.merge ? this.defaultOptions.merge(newData, entry?.data ?? null) : newData

      await cache.put({ key, value: { data: mergedData, timestamp: Date.now() } })
      return mergedData
    } catch (err) {
      console.warn(`[CacheWrapper] Fetch failed for key: ${key}. Returning stale data if available.`)
      return entry?.data ?? null
    }
  }

  async update(key: string, data: T) {
    const cache = await this.cache
    await cache.put({ key, value: { data, timestamp: Date.now() } })
  }

  async clear() {
    const cache = await this.cache
    await cache.clearAll()
  }
}
