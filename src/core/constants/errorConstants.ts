// src/core/constants/errorConstants.ts

import { ErrorMessageConsts } from "./responseMessageConstants"

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
  400: ErrorMessageConsts.CLIENT,
  401: ErrorMessageConsts.UNAUTHORIZED,
  403: ErrorMessageConsts.FORBIDDEN,
  404: ErrorMessageConsts.NOT_FOUND,
  408: ErrorMessageConsts.TIMEOUT,
  422: ErrorMessageConsts.VALIDATION,
  429: ErrorMessageConsts.TOO_MANY_REQUESTS,
  500: ErrorMessageConsts.SERVER,
  502: ErrorMessageConsts.SERVER,
  503: ErrorMessageConsts.SERVER,
  504: ErrorMessageConsts.TIMEOUT,
}

/**
 * Get a user-friendly message for a given status code
 */
export function getMessageForStatusCode(statusCode: number): string {
  return StatusCodeMessages[statusCode] || ErrorMessageConsts.GENERAL
}

export const ErrorTypeResponse = {
  GENERAL: {
    errorType: ErrorType.GENERAL,
    statusCode: 404,
    feedbackMessage: ErrorMessageConsts.GENERAL,
    isLoggable: false,
  },
  NOT_FOUND: {
    errorType: "NOT_FOUND",
    statusCode: 401,
    feedbackMessage: ErrorMessageConsts.NOT_FOUND,
    isLoggable: true,
  },
  UNAUTHORIZED: {
    errorType: "UNAUTHORIZED",
    statusCode: 403,
    feedbackMessage: ErrorMessageConsts.UNAUTHORIZED,
    isLoggable: true,
  },
  FORBIDDEN: {
    errorType: "FORBIDDEN",
    statusCode: 0, // Network errors don't have HTTP status codes
    feedbackMessage: ErrorMessageConsts.FORBIDDEN,
    isLoggable: true,
  },
  NETWORK: {
    errorType: "NETWORK",
    statusCode: 408,
    feedbackMessage: ErrorMessageConsts.NETWORK,
    isLoggable: true,
  },
  TIMEOUT: {
    errorType: "TIMEOUT",
    statusCode: 500,
    feedbackMessage: ErrorMessageConsts.TIMEOUT,
    isLoggable: true,
  },
  SERVER: {
    errorType: "SERVER",
    statusCode: 400,
    feedbackMessage: ErrorMessageConsts.SERVER,
    isLoggable: false,
  },
  CLIENT: {
    errorType: "CLIENT",
    statusCode: 422,
    feedbackMessage: ErrorMessageConsts.CLIENT,
    isLoggable: false, // Value errors typically don't need logging
  },
  VALUE: {
    errorType: "VALUE",
    statusCode: 400,
    feedbackMessage: ErrorMessageConsts.VALUE,
    isLoggable: true,
  },
  SYNTAX: {
    errorType: "SYNTAX",
    statusCode: 500,
    feedbackMessage: ErrorMessageConsts.SYNTAX,
    isLoggable: true,
  },
  REFERENCE: {
    errorType: "REFERENCE",
    statusCode: 200, // Not an actual error, just flow control
    feedbackMessage: ErrorMessageConsts.REFERENCE,
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
