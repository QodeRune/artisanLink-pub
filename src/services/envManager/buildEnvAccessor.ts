// src/services/env/buildEnvAccessor.ts
import { parseEnvJson } from "./envParser"
import type { MixedEnvStructure, NestedEnvStructure } from "@/types"

// Generic builder for JSON-structured env data with proper typing
export const buildEnvAccessors = <T = string, K = any>(
  envKey: string,
  structureType: "nested" | "mixed" = "nested",
) => {
  const data = parseEnvJson<T, K>(envKey, structureType)
  return data || {}
}

// Create specific accessors with appropriate types
export const EntityAccessors = () => buildEnvAccessors<string>("VITE_ENTITY", "nested")

// Access the environment as a mixed structure for top-level properties
export const MixedEntityAccessors = <T = string, K = any>() => buildEnvAccessors<T, K>("VITE_ENTITY", "mixed")

// Typed accessors for token entities in nested structure
export const TokenAccessors = () => {
  const data = parseEnvJson<string[]>("VITE_ENTITY", "nested") as NestedEnvStructure<string[]>
  return data?.tokens || {}
}

// Typed accessor for direct top-level token list
export const getDirectTokenList = (): string[] => {
  const data = parseEnvJson<string, string[]>("VITE_ENTITY", "mixed") as MixedEnvStructure<string, string[]>
  return Array.isArray(data?.TOKEN_LIST) ? data.TOKEN_LIST : ["access_token", "refresh_token"]
}
