// src/services/api/handleResponse.ts
import { createApiError } from "./createApiError"
import type { IApiResponse, TResponseType } from "@/types"

export const handleResponse = async <T>({
  response,
  responseType = "json",
}: {
  response: Response
  responseType?: TResponseType
}): Promise<IApiResponse<T>> => {
  const contentType = response.headers.get("content-type")

  if (!response.ok) {
    const responseText = await response.text()
    throw createApiError({
      message: responseText || "Request failed",
      status: response.status,
      data: responseText && contentType?.includes("application/json") ? JSON.parse(responseText) : responseText,
    })
  }

  if (responseType === "blob" || contentType?.includes("application/pdf")) {
    const blob = await response.blob()
    return {
      data: blob as T,
      headers: response.headers,
      status: response.status,
    }
  }

  const responseText = await response.text()
  const data = contentType?.includes("application/json") && responseText ? JSON.parse(responseText) : responseText

  return {
    data: data as T,
    headers: response.headers,
    status: response.status,
  }
}
