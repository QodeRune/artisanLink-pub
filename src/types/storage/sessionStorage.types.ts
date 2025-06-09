// src/types/storage/sessionStorage.types.ts
export interface ISessionStorage<T = unknown> {
  state: () => boolean
  has: ({ key }: { key: string }) => boolean
  get: ({ key }: { key: string }) => T | null
  getMany: ({ keys }: { keys: string[] }) => (T | null)[]
  put: ({ key, value }: { key: string; value: T }) => boolean
  delete: ({ key }: { key: string }) => boolean
  deleteMany: ({ keys }: { keys: string[] }) => boolean
  clearAll: () => boolean
}
