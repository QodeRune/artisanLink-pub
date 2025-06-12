// src/services/api/createApiError.ts
import type { IApiError } from "@/types"

export const createApiError = ({
  message,
  status,
  data,
}: {
  message: string
  status?: number
  data?: any
}): IApiError => {
  const error = new Error(message) as IApiError
  error.status = status
  error.data = data
  return error
}
