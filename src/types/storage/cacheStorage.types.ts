// src/types/storage/cacheStorage.types.ts
export interface ICacheStorage<T = unknown> {
  state: () => Promise<boolean>
  has: ({ key }: { key: string }) => Promise<boolean>
  get: ({ key }: { key: string }) => Promise<T | null>
  getMany: ({ keys }: { keys: string[] }) => Promise<(T | null)[]>
  put: ({ key, value }: { key: string; value: T }) => Promise<boolean>
  delete: ({ key }: { key: string }) => Promise<boolean>
  deleteMany: ({ keys }: { keys: string[] }) => Promise<boolean>
  clearAll: () => Promise<boolean>
}
