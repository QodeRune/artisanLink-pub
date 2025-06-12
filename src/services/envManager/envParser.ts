// src/services/env/envParser.ts
import type { MixedEnvStructure, NestedEnvStructure } from "@/types"

// Standalone function to get raw env variable
export const getEnvVariable = (key: string): string | undefined => {
  return import.meta.env[key]?.toString()
}

// Generic parser for JSON-structured env variables
export const parseEnvJson = <T = string, K = any>(
  envKey: string,
  structureType: "nested" | "mixed" = "nested",
): NestedEnvStructure<T> | MixedEnvStructure<T, K> | undefined => {
  const rawData = getEnvVariable(envKey)

  if (!rawData) {
    console.warn(`${envKey} is not defined in environment variables`)
    return undefined
  }

  try {
    const parsed = JSON.parse(rawData)
    if (structureType === "nested") {
      return parsed as NestedEnvStructure<T>
    } else {
      return parsed as MixedEnvStructure<T, K>
    }
  } catch (error) {
    console.error(`Failed to parse ${envKey}:`, error)
    return undefined
  }
}

// Specific parser for API endpoints with base URL
export const parseApiConfig = (envKey = "VITE_API_ENDPOINTS") => {
  const baseEndpoint = getEnvVariable("VITE_BASE_ENDPOINT") || ""
  const endpoints = parseEnvJson(envKey)
  return { baseEndpoint, endpoints }
}
