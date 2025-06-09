// src/services/storage/sessionStorage.service.ts
import type { ISessionStorage } from "@/types/storage/sessionStorage.types"

/**
 * Factory function to create a strongly typed sessionStorage service.
 * Provides type-safe operations for sessionStorage with error handling.
 *
 * @template T - The expected data type for all stored and retrieved values.
 * @returns An object implementing ISessionStorage<T> with typed operations.
 *
 * @example
 * // Create a service for storing user data
 * const userStorage = createSessionStorageService<{id: string, name: string}>();
 *
 * // Store user data
 * userStorage.put({ key: 'currentUser', value: {id: '123', name: 'John'} });
 *
 * // Retrieve user data
 * const user = userStorage.get({ key: 'currentUser' });
 * console.log(user?.name); // Output: 'John'
 *
 *
 * Note: All sessionStorage data:
 * - Is scoped to the current browser tab
 * - Persists only for the duration of the page session
 * - Is limited to ~5MB per origin
 * - Should not be used for sensitive information
 */
export const createSessionStorageService = <T>(): ISessionStorage<T> => ({
  /**
   * Checks if sessionStorage is available in the current environment.
   * @returns True if sessionStorage is available, false otherwise.
   *
   * @example
   * if (storage.state()) {
   *   // Safe to use sessionStorage operations
   * }
   */
  state: () => typeof window !== "undefined" && !!sessionStorage,

  /**
   * Checks whether a resource exists in sessionStorage.
   *
   * @param key - The identifier to check for presence in sessionStorage.
   * @returns True if the key exists, false otherwise.
   *
   * @example
   * if (storage.has({ key: 'userSettings' })) {
   *   // Key exists, safe to retrieve
   * }
   */
  has: ({ key }) => {
    try {
      return sessionStorage.getItem(key) !== null
    } catch {
      return false
    }
  },

  /**
   * Retrieves a single resource from sessionStorage.
   *
   * @param key - Identifier used to locate the stored resource.
   * @returns The parsed resource of type T, or null if not found or invalid.
   *
   * @example
   * const settings = storage.get({ key: 'userSettings' });
   * if (settings) {
   *   // Use the settings object
   * }
   */
  get: ({ key }) => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : null
    } catch {
      return null
    }
  },

  /**
   * Retrieves multiple resources by their keys from sessionStorage.
   *
   * @param keys - Array of identifiers for stored resources.
   * @returns An array of parsed resources of type T (or null if not found).
   *
   * @example
   * const [user, settings] = storage.getMany({ keys: ['currentUser', 'userSettings'] });
   */
  getMany: ({ keys }) => {
    return keys.map((key) => {
      try {
        const item = sessionStorage.getItem(key)
        return item ? (JSON.parse(item) as T) : null
      } catch {
        return null
      }
    })
  },

  /**
   * Stores or updates a resource in sessionStorage.
   * Note: Values are automatically serialized to JSON.
   *
   * @param key - Identifier used for storing and retrieving the resource.
   * @param value - The resource of type T to store.
   * @returns True if the operation was successful, false otherwise.
   *
   * @example
   * const success = storage.put({
   *   key: 'userPreferences',
   *   value: { theme: 'dark', notifications: true }
   * });
   */
  put: ({ key, value }) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  /**
   * Removes a single resource from sessionStorage.
   *
   * @param key - Identifier for the resource to remove.
   * @returns True if the operation was successful, false otherwise.
   *
   * @example
   * // Remove temporary data when no longer needed
   * storage.delete({ key: 'tempData' });
   */
  delete: ({ key }) => {
    try {
      sessionStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },

  /**
   * Removes multiple resources from sessionStorage.
   *
   * @param keys - Array of identifiers for resources to remove.
   * @returns True if the operation was successful, false otherwise.
   *
   * @example
   * // Clean up multiple items at once
   * storage.deleteMany({ keys: ['temp1', 'temp2', 'temp3'] });
   */
  deleteMany: ({ keys }) => {
    try {
      keys.forEach((key) => sessionStorage.removeItem(key))
      return true
    } catch {
      return false
    }
  },

  /**
   * Clears all resources from sessionStorage.
   * Use with caution as this affects all data in sessionStorage.
   *
   * @returns True if the operation was successful, false otherwise.
   *
   * @example
   * // Clear all data on logout
   * storage.clearAll();
   */
  clearAll: () => {
    try {
      sessionStorage.clear()
      return true
    } catch {
      return false
    }
  },
})
