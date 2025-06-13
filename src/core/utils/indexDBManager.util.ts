// src/core/utils/indexed-db-storage.util.ts
import type { IPutInStorage, IGetFromStorage, IHandleTokenStorage, ITokenStorageParams } from "@/types"
import { getAuthTokenList } from "@/services"

const authTokenList: string[] = getAuthTokenList()

// Utility for JSON-safe storage operations
const safeStorage = {
  setItem: (storage: Storage, key: string, value: any) => {
    if (value === undefined) return
    storage.setItem(key, JSON.stringify(value))
  },
  getItem: (storage: Storage, key: string) => {
    const storedValue = storage.getItem(key)
    if (!storedValue || storedValue === "undefined" || storedValue === "null") {
      return null
    }
    try {
      return JSON.parse(storedValue)
    } catch (e) {
      // console.error(`Failed to parse storage item for key "${key}":`, e)
      return null
    }
  },

  removeItem: (storage: Storage, key: string) => {
    storage.removeItem(key)
  },
}

function getFromStorage<T = unknown>(params: IGetFromStorage & { key: string }): T | null
function getFromStorage<T = unknown>(params: IGetFromStorage & { key: string[] }): Record<string, T | null>
function getFromStorage<T = unknown>(params: IGetFromStorage): T | null | Record<string, T | null> {
  const { key, useSessionStorage = true } = params
  const storage = useSessionStorage ? sessionStorage : localStorage

  if (Array.isArray(key)) {
    return key.reduce((acc, currentKey) => {
      const raw = storage.getItem(currentKey)
      try {
        acc[currentKey] = raw ? (JSON.parse(raw) as T) : null
      } catch {
        acc[currentKey] = null
      }
      return acc
    }, {} as Record<string, T | null>)
  }

  const raw = storage.getItem(key)
  try {
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

// Utility wrappers for storage
export const storageUtils = {
  put: ({ valueDict, useSessionStorage = true }: IPutInStorage) => {
    const storage = useSessionStorage ? sessionStorage : localStorage
    Object.entries(valueDict).forEach(([key, value]) => safeStorage.setItem(storage, key, value))
  },
  get: getFromStorage,
  remove: (key: string | string[], useSessionStorage: boolean = false) => {
    const storage = useSessionStorage ? sessionStorage : localStorage

    if (Array.isArray(key)) {
      key.forEach((k) => safeStorage.removeItem(storage, k))
    } else {
      safeStorage.removeItem(storage, key)
    }
  },
}

// Extract subset of an object based on matching keys
const extractSubset = (obj: Record<string, any>, keys: string[]): Record<string, any> => {
  return Object.fromEntries(keys.map((key) => [key, obj[key]]).filter(([_, value]) => value !== undefined))
}

// Refactored handleTokenStorage
export const handleTokenStorage = ({
  responseData,
  useSessionStorage = false,
  tokenKeyList = authTokenList,
}: IHandleTokenStorage) => {
  if (responseData && typeof responseData === "object") {
    const tokensToStore = extractSubset(responseData, tokenKeyList)
    storageUtils.put({ valueDict: tokensToStore, useSessionStorage })
  }
}

// Utility function to clear all tokens from storage
export const clearAllTokens = (useSessionStorage: boolean = true) => {
  storageUtils.remove(authTokenList, useSessionStorage)
}

// token accessors
export const getAccessToken = () => storageUtils.get({ key: "access_token" })
export const getRefreshToken = () => storageUtils.get({ key: "refresh_token" })
export const setTokens = (params: ITokenStorageParams) => {
  const { accessToken, refreshToken, useSessionStorage = true, ...extraTokens } = params

  storageUtils.put({
    valueDict: { access_token: accessToken, refresh_token: refreshToken, ...extraTokens },
    useSessionStorage,
  })

  return true
}
