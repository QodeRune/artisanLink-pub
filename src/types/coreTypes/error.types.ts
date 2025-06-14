// src/core/feature/appError/coreTypes/ErrorType.ts
import type { ErrorTypeResponse, StatusCodeKeys, StatusCodeMessages } from "@/core/constants/errorConstants"
import type { FC, ReactNode } from "react"

export type TErrorType = keyof typeof ErrorTypeResponse
export type TErrorCodes = keyof typeof StatusCodeMessages
export type TStatusCodeKey = (typeof StatusCodeKeys)[number]

export interface IErrorTypeResponse {
  errorType: TErrorType
  statusCode: number
  feedbackMessage: string
  isLoggable: boolean
}

/**
 * Structure for standardized error information
 */
export interface IErrorInfo {
  statusCode: number
  feedbackMessage: string
  isLoggable: boolean
}

/**
 * Parameters for constructing an AppError
 */
export interface IAppErrorParams {
  message: string
  statusCode?: number
  errorType?: TErrorType
  feedbackMessage?: string
  isLoggable?: boolean
  originalError?: Error
}

/**
 * Parameters for the error handling method
 */
export interface IHandleErrorParams {
  error: unknown
  errorType?: TErrorType
  statusCode?: number
  feedbackMessage?: string
}

/**
 * Interface for API response errors with flexible status code properties
 */
type StatusCodeProperties = {
  [K in TStatusCodeKey]?: number
}

export interface I_ApiResponseError extends Error {
  response?: StatusCodeProperties & {
    [key: string]: unknown
    statusCode?: number
    feedbackMessage?: string
  }
}

export type IApiResponseError = I_ApiResponseError & StatusCodeProperties

// Error boundary interfaces
export interface IErrorFallbackProps {
  error: Error
  resetError: () => void
}

export interface IErrorBoundaryProps {
  children: ReactNode
  fallback?: FC<IErrorFallbackProps>
}

export interface IErrorBoundaryState {
  hasError: boolean
  error: Error | null
}
