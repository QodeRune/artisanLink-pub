// src/core/feature/appError/AppError.ts
import type { TErrorType, IErrorInfo, IAppErrorParams, IHandleErrorParams } from "@/core/coreTypes"
import { ErrorTypeResponse, ErrorType, StatusCodeKeys } from "@/core/constants/errorConstants"
import type { IApiResponseError } from "@/core/coreTypes/ErrorType"

/**
 * Custom error class to standardize application error handling
 * Provides methods to handle different error types with appropriate user feedback
 */
export class AppError extends Error {
  public statusCode: number
  public errorType: TErrorType
  public feedbackMessage: string
  public isLoggable: boolean
  public originalError?: Error

  constructor({
    message,
    statusCode = 500,
    errorType = ErrorType.GENERAL,
    feedbackMessage = "Something went wrong",
    isLoggable = true,
    originalError,
  }: IAppErrorParams) {
    super(message)
    this.name = "AppError"
    this.statusCode = statusCode
    this.errorType = errorType
    this.feedbackMessage = feedbackMessage
    this.isLoggable = isLoggable
    this.originalError = originalError

    // Ensure the prototype chain is properly maintained in TypeScript
    Object.setPrototypeOf(this, AppError.prototype)
  }
  // Even more concise version using optional chaining and nullish coalescing
  /**
   * Most concise version using modern JS features
   */
  private static extractStatusCode(error: IApiResponseError): number {
    const getValue = (obj: unknown, key: string) => obj?.[key]

    return (
      StatusCodeKeys.map((key) => getValue(error, key) || getValue(error.response, key)).find(
        (val) => typeof val === "number" && val > 0,
      ) || 0
    )
  }

  /**
   * Main error handling method that processes any caught error
   * @param params The error and optional parameters to customize handling
   * @returns A standardized AppError instance
   */
  static handle({ error, errorType, statusCode, feedbackMessage }: IHandleErrorParams): AppError {
    // If the error is already an AppError, respect any provided overrides
    if (error instanceof AppError) {
      if (errorType) error.errorType = errorType
      if (statusCode) error.statusCode = statusCode
      if (feedbackMessage) error.feedbackMessage = feedbackMessage
      return error
    }

    // Determine error type if not explicitly provided
    const determinedType = errorType || AppError.determineErrorType(error)

    // Get appropriate status code and message based on the error type if not provided
    const errorInfo = AppError.getErrorInfoByType(determinedType, error)
    const finalStatusCode = statusCode || errorInfo.statusCode
    const finalFeedbackMessage = feedbackMessage || errorInfo.feedbackMessage

    // Log error if it's loggable
    if (errorInfo.isLoggable) {
      AppError.logError(error, determinedType, finalStatusCode)
    }

    return new AppError({
      message: error instanceof Error ? error.message : String(error),
      statusCode: finalStatusCode,
      errorType: determinedType,
      feedbackMessage: finalFeedbackMessage,
      isLoggable: errorInfo.isLoggable,
      originalError: error instanceof Error ? error : undefined,
    })
  }

  /**
   * Helper function to check if an error is an API response error
   */
  private static isApiResponseError(error: unknown): error is IApiResponseError {
    if (!error || typeof error !== "object") return false

    // Check if any of the status code keys exist on the error or its response
    for (const key of StatusCodeKeys) {
      if (key in error || (error as IApiResponseError).response?.[key] !== undefined) {
        return true
      }
    }

    return false
  }

  /**
   * Determines the error type based on the error instance
   */
  private static determineErrorType(error: unknown): TErrorType {
    if (error instanceof TypeError) return ErrorType.VALUE
    if (error instanceof SyntaxError) return ErrorType.SYNTAX
    if (error instanceof ReferenceError) return ErrorType.REFERENCE

    // Check for network-related errors
    if (error instanceof Error) {
      if (error.name === "AbortError") return ErrorType.TIMEOUT

      // Handle fetch errors
      if (
        error.message.includes("NetworkError") ||
        error.message.includes("Failed to fetch") ||
        error.message.toLowerCase().includes("network")
      ) {
        return ErrorType.NETWORK
      }

      if (error.message.includes("timeout") || error.message.includes("timed out")) {
        return ErrorType.TIMEOUT
      }
    }

    // Handle HTTP errors using the new flexible approach
    if (this.isApiResponseError(error)) {
      const status = this.extractStatusCode(error)

      if (status === 404) return ErrorType.NOT_FOUND
      if (status === 401) return ErrorType.UNAUTHORIZED
      if (status === 403) return ErrorType.FORBIDDEN
      if (status >= 500) return ErrorType.SERVER
      if (status >= 400) return ErrorType.CLIENT
    }

    return ErrorType.GENERAL
  }

  /**
   * Gets appropriate error information based on error type
   */
  private static getErrorInfoByType(errorType?: TErrorType, error?: unknown): IErrorInfo {
    if (errorType && ErrorTypeResponse[errorType]) {
      return ErrorTypeResponse[errorType]
    }

    const _errorType = error ? this.determineErrorType(error) : ErrorType.GENERAL
    return ErrorTypeResponse[_errorType]
  }

  /**
   * Handles HTTP-specific errors
   */
  static handleHttpError({
    error,
    statusCode: overrideStatusCode,
    feedbackMessage,
  }: {
    error: IApiResponseError
    statusCode?: number
    feedbackMessage?: string
  }): AppError {
    // Extract status code using the flexible helper
    const code = overrideStatusCode || this.extractStatusCode(error) || 500

    // Determine HTTP error type based on status code
    let errorType: TErrorType
    if (code === 404) errorType = ErrorType.NOT_FOUND
    else if (code === 401) errorType = ErrorType.UNAUTHORIZED
    else if (code === 403) errorType = ErrorType.FORBIDDEN
    else if (code >= 500) errorType = ErrorType.SERVER
    else if (code >= 400) errorType = ErrorType.CLIENT
    else errorType = ErrorType.GENERAL

    return AppError.handle({
      error,
      errorType,
      statusCode: code,
      feedbackMessage,
    })
  }

  /**
   * Handles timeout errors
   */
  static handleTimeoutError({
    error,
    feedbackMessage = "The request timed out. Please try again",
  }: {
    error: AppError | Error
    feedbackMessage?: string
  }): AppError {
    return AppError.handle({
      error,
      errorType: ErrorType.TIMEOUT,
      statusCode: 408,
      feedbackMessage,
    })
  }

  /**
   * Handles value errors (typically used for validation or flow control)
   */
  static handleValueError({
    error,
    feedbackMessage = "Invalid value provided",
  }: {
    error: unknown
    feedbackMessage?: string
  }): AppError {
    return AppError.handle({
      error,
      errorType: ErrorType.VALUE,
      statusCode: 422,
      feedbackMessage,
      // Value errors typically don't need logging
    })
  }

  /**
   * Specific handler for errors used just for control flow
   */
  static handleControlFlowError({
    error,
    feedbackMessage = "",
  }: {
    error: unknown
    feedbackMessage?: string
  }): AppError {
    return AppError.handle({
      error,
      errorType: ErrorType.CONTROL_FLOW,
      statusCode: 200, // Not an actual error
      feedbackMessage,
    })
  }

  /**
   * Logs errors to console and potentially to telemetry services
   * @param error The original error
   * @param errorType Type of error
   * @param statusCode HTTP status code
   */
  private static logError(error: unknown, errorType: TErrorType, statusCode: number): void {
    // Log to console for development
    console.error(`[${errorType}] Error (${statusCode}):`, error)

    // This is where you'd integrate with your telemetry services
    // if the user has opted in to error reporting

    // Example telemetry logging (commented out):
    /*
    if (userHasOptedInToTelemetry()) {
      const telemetryData = {
        errorType,
        statusCode,
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
        // Add other relevant info without PII
      };

      telemetryService.logError(telemetryData);
    }
    */
  }
}
