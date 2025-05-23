// src/core/constants/errorConstants.ts

import { ErrorMessages } from "./responseMessageConstants"

/**
 * Types of errors that can occur in the application
 */
export const ErrorType = {
  GENERAL: "GENERAL",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NETWORK: "NETWORK",
  TIMEOUT: "TIMEOUT",
  SERVER: "SERVER",
  CLIENT: "CLIENT",
  VALUE: "VALUE",
  SYNTAX: "SYNTAX",
  REFERENCE: "REFERENCE",
  CONTROL_FLOW: "CONTROL_FLOW",
} as const

/**
 * Maps HTTP status codes to user-friendly error messages
 */
export const StatusCodeMessages: Record<number, string> = {
  400: ErrorMessages.CLIENT,
  401: ErrorMessages.UNAUTHORIZED,
  403: ErrorMessages.FORBIDDEN,
  404: ErrorMessages.NOT_FOUND,
  408: ErrorMessages.TIMEOUT,
  422: ErrorMessages.VALIDATION,
  429: ErrorMessages.TOO_MANY_REQUESTS,
  500: ErrorMessages.SERVER,
  502: ErrorMessages.SERVER,
  503: ErrorMessages.SERVER,
  504: ErrorMessages.TIMEOUT,
}

/**
 * Get a user-friendly message for a given status code
 */
export function getMessageForStatusCode(statusCode: number): string {
  return StatusCodeMessages[statusCode] || ErrorMessages.GENERAL
}

export const ErrorTypeResponse = {
  GENERAL: {
    errorType: ErrorType.GENERAL,
    statusCode: 404,
    feedbackMessage: ErrorMessages.GENERAL,
    isLoggable: false,
  },
  NOT_FOUND: {
    errorType: "NOT_FOUND",
    statusCode: 401,
    feedbackMessage: ErrorMessages.NOT_FOUND,
    isLoggable: true,
  },
  UNAUTHORIZED: {
    errorType: "UNAUTHORIZED",
    statusCode: 403,
    feedbackMessage: ErrorMessages.UNAUTHORIZED,
    isLoggable: true,
  },
  FORBIDDEN: {
    errorType: "FORBIDDEN",
    statusCode: 0, // Network errors don't have HTTP status codes
    feedbackMessage: ErrorMessages.FORBIDDEN,
    isLoggable: true,
  },
  NETWORK: {
    errorType: "NETWORK",
    statusCode: 408,
    feedbackMessage: ErrorMessages.NETWORK,
    isLoggable: true,
  },
  TIMEOUT: {
    errorType: "TIMEOUT",
    statusCode: 500,
    feedbackMessage: ErrorMessages.TIMEOUT,
    isLoggable: true,
  },
  SERVER: {
    errorType: "SERVER",
    statusCode: 400,
    feedbackMessage: ErrorMessages.SERVER,
    isLoggable: false,
  },
  CLIENT: {
    errorType: "CLIENT",
    statusCode: 422,
    feedbackMessage: ErrorMessages.CLIENT,
    isLoggable: false, // Value errors typically don't need logging
  },
  VALUE: {
    errorType: "VALUE",
    statusCode: 400,
    feedbackMessage: ErrorMessages.VALUE,
    isLoggable: true,
  },
  SYNTAX: {
    errorType: "SYNTAX",
    statusCode: 500,
    feedbackMessage: ErrorMessages.SYNTAX,
    isLoggable: true,
  },
  REFERENCE: {
    errorType: "REFERENCE",
    statusCode: 200, // Not an actual error, just flow control
    feedbackMessage: ErrorMessages.REFERENCE,
    isLoggable: false,
  },
  CONTROL_FLOW: {
    errorType: "CONTROL_FLOW",
    statusCode: 500,
    feedbackMessage: "Something went wrong. Please try again later",
    isLoggable: true,
  },
}

export const StatusCodeKeys = ["statusCode", "status", "status_code", "code", "httpCode", "errorCode"] as const
