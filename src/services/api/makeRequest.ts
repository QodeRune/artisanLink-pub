// src/services/api/makeRequest.ts
import type { IApiResponse, IRequestConfig } from "@/types"
import { getSingleAbortController } from "@/services/api/abortControllers"
import { createApiError } from "@/services/api/createApiError"
import { handleResponse } from "@/services/api/handleResponse"

const delay = ({ ms }: { ms: number }) => new Promise((resolve) => setTimeout(resolve, ms))

export const makeRequest = async <T>({ config }: { config: IRequestConfig }): Promise<IApiResponse<T>> => {
  const {
    endpoint,
    method = "GET",
    body,
    headers = {},
    timeout = 60000,
    credentials = "include",
    retries = 3,
    retryDelay = 1000,
    responseType,
  } = config

  const controller = getSingleAbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const defaultHeaders: Record<string, string> = {
      "User-Agent": typeof navigator !== "undefined" ? navigator.userAgent : "node",
    }

    if (body) {
      defaultHeaders["Content-Type"] = "application/json"
    }

    const fetchOptions = {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined,
      credentials,
      signal: controller.signal,
    }

    const response = await fetch(endpoint, fetchOptions)
    clearTimeout(timeoutId)

    if (!response.ok && retries! <= 0) {
      let errorMessage = `Request failed with status ${response.status}`
      let errorData = null

      try {
        // Try to parse error response as JSON
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } else {
          // If not JSON, try to get text
          errorMessage = (await response.text()) || errorMessage
        }
      } catch (parseError) {
        // If parsing fails, use default error message
        console.error("Error parsing error response:", parseError)
      }

      throw createApiError({
        message: errorMessage,
        status: response.status,
        data: errorData,
      })
    }

    return handleResponse<T>({ response, responseType })
  } catch (error: unknown) {
    clearTimeout(timeoutId)

    // Check if we should retry the request
    if (retries > 0) {
      await delay({ ms: retryDelay })
      return makeRequest<T>({
        config: {
          ...config,
          retries: retries - 1,
          retryDelay: retryDelay * 2, // Exponential backoff
        },
      })
    }

    // Type check and handle different error types
    if (error && typeof error === "object" && "name" in error && error.name === "ApiError") {
      // If it's already our ApiError type, just rethrow it
      throw error
    } else if (error instanceof Error) {
      // For standard Error objects
      throw error
    } else {
      // For unknown error types, create a standard format
      throw createApiError({ message: typeof error === "string" ? error : "Request failed" })
    }
  }
}

// !Public API functions

