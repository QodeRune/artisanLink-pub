// src/types/service/api.types.ts
export type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
export type TResponseType = "json" | "blob" | "text"

export interface IResponseDTO<T = Record<string, any>> {
  success: boolean
  message: string
  data?: T
  error?: any
  status_code: number | string
}
export interface IRequestConfig {
  endpoint: string
  method?: THttpMethod
  body?: Record<string, any>
  headers?: Record<string, string>
  timeout?: number
  credentials?: RequestCredentials
  retries?: number
  retryDelay?: number
  responseType?: TResponseType
}

export interface IAuthenticatedRequestConfig extends IRequestConfig {
  tokens?: Record<string, string> // Object to hold multiple tokens
}

export interface IApiResponse<T> {
  data: T
  headers: Headers
  status: number
}

export interface IApiError extends Error {
  status?: number
  data?: any
}

export interface IGetRequestArgs {
  endpoint: string
  config?: Partial<IRequestConfig>
}

export interface IPostRequestArgs {
  endpoint: string
  body: Record<string, any>
  config?: Partial<IRequestConfig>
}

export interface IAuthenticatedGetArgs extends IGetRequestArgs {
  tokens?: Record<string, string>
  // [key: string]? : string
}

export interface IAuthenticatedPostArgs extends IPostRequestArgs {
  tokens?: Record<string, string>
}

export interface IComponentFetchResponse<T = Record<string, any>> {
  success: boolean
  message?: string
  ResponseData?: T
}
