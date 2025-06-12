// src/services/api/api-builder.ts
import { parseApiConfig } from "../envManager"

export const buildApiEndpoints = (baseUrl?: string) => {
  const { baseEndpoint, endpoints } = parseApiConfig()
  const apiBase = baseUrl || baseEndpoint

  if (!endpoints) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(endpoints).map(([group, paths]) => [
      group,
      Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, `${apiBase}/${path}`])),
    ]),
  )
}

export const ApiEndpoints = (baseUrl?: string) => buildApiEndpoints(baseUrl)
