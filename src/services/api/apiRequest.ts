// src/services/api/apiUtilityFns/apiRequest.ts
import type {
  IAuthenticatedGetArgs,
  IAuthenticatedPostArgs,
  IAuthenticatedRequestConfig,
  IGetRequestArgs,
  IPostRequestArgs,
  IRequestConfig,
} from "@/types"
import { makeRequest } from "./makeRequest"
import { getAccessToken, getRefreshToken } from "@/core"

export const apiRequest = async <T>({ config }: { config: IRequestConfig }): Promise<T> => {
  const response = await makeRequest<T>({ config })
  return response.data
}

export const authenticatedRequest = async <T>({ config }: { config: IAuthenticatedRequestConfig }): Promise<T> => {
  const { tokens: providedTokens = {}, ...restConfig } = config

  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  const tokens = {
    Authorization: `Bearer ${accessToken}`,
    "X-Refresh-Token": refreshToken,
    ...providedTokens,
  }

  const headers = Object.entries(tokens).reduce((acc, [key, value]) => {
    if (typeof value === "string") {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)

  const response = await makeRequest<T>({
    config: {
      ...restConfig,
      headers: {
        ...restConfig.headers,
        ...headers,
      },
    },
  })

  return response.data
}

export const api = {
  get: async <T>({ endpoint, config }: IGetRequestArgs): Promise<T> =>
    apiRequest<T>({
      config: {
        ...config,
        endpoint,
        method: "GET",
      },
    }),

  post: async <T>({ endpoint, body, config }: IPostRequestArgs): Promise<T> =>
    apiRequest<T>({
      config: {
        ...config,
        endpoint,
        method: "POST",
        body,
      },
    }),

  put: async <T>({ endpoint, body, tokens, config }: IAuthenticatedPostArgs): Promise<T> =>
    authenticatedRequest<T>({
      config: {
        ...config,
        endpoint,
        method: "PUT",
        body,
        tokens,
      },
    }),

  authenticatedGet: async <T>({ endpoint, tokens, config }: IAuthenticatedGetArgs): Promise<T> =>
    authenticatedRequest<T>({
      config: {
        ...config,
        endpoint,
        method: "GET",
        tokens,
      },
    }),

  authenticatedPost: async <T>({ endpoint, body, tokens, config }: IAuthenticatedPostArgs): Promise<T> =>
    authenticatedRequest<T>({
      config: {
        ...config,
        endpoint,
        method: "POST",
        body,
        tokens,
      },
    }),

  // New download method for PDFs
  download: async ({ endpoint, config }: IGetRequestArgs): Promise<Blob> =>
    apiRequest<Blob>({
      config: {
        ...config,
        endpoint,
        method: "GET",
        responseType: "blob",
      },
    }),
}
