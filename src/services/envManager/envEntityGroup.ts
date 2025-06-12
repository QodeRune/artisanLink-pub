// src/services/envManager/envEntityGroup.ts
import { parseEnvJson } from "./envParser"
import { EntityAccessors, TokenAccessors, getDirectTokenList } from "./buildEnvAccessor"
import type { MixedEnvStructure } from "@/types"

export const ProductEntities = EntityAccessors().products || {}
export const TokenEntities = TokenAccessors()

// Usage example for token list (for nested structure)
export const getAuthTokenList = (): string[] => {
  return TokenEntities.TOKEN_LIST || ["access_token", "refresh_token"]
}

// Access token list at the top level if configured that way
export const getDirectAuthTokenList = (): string[] => {
  return getDirectTokenList()
}

// Example of accessing mixed structure with typed top-level properties
export const getMixedEntities = <K = any>() => {
  return (parseEnvJson<string, K>("VITE_ENTITY", "mixed") as MixedEnvStructure<string, K>) || {}
}

// Generic helper to safely access top-level properties with proper type checking
export const getTopLevelProperty = <K>(key: string, defaultValue: K): K => {
  const data = parseEnvJson<string, K>("VITE_ENTITY", "mixed") as MixedEnvStructure<string, K>

  if (!data) return defaultValue

  const value = data[key]
  // Check if the value has the expected type (simplified check)
  // For arrays, objects, etc., you might need more sophisticated type checking
  if (
    typeof value === typeof defaultValue ||
    (Array.isArray(value) && Array.isArray(defaultValue)) ||
    (typeof value === "object" && typeof defaultValue === "object")
  ) {
    return value as K
  }

  return defaultValue
}
