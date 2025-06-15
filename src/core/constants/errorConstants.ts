// src/core/constants/errorConstants.ts
import { ErrorMessageConsts } from "./responseMessageConstants"

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
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
} as const

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

export function getMessageForStatusCode(statusCode: number): string {
  return StatusCodeMessages[statusCode] || ErrorMessageConsts.GENERAL
}

export const ErrorTypeResponse = {
  GENERAL: {
    errorType: ErrorType.GENERAL,
    statusCode: 500,
    feedbackMessage: ErrorMessageConsts.GENERAL,
    isLoggable: true,
  },
  NOT_FOUND: {
    errorType: ErrorType.NOT_FOUND,
    statusCode: 404,
    feedbackMessage: ErrorMessageConsts.NOT_FOUND,
    isLoggable: true,
  },
  UNAUTHORIZED: {
    errorType: ErrorType.UNAUTHORIZED,
    statusCode: 401,
    feedbackMessage: ErrorMessageConsts.UNAUTHORIZED,
    isLoggable: true,
  },
  FORBIDDEN: {
    errorType: ErrorType.FORBIDDEN,
    statusCode: 403,
    feedbackMessage: ErrorMessageConsts.FORBIDDEN,
    isLoggable: true,
  },
  NETWORK: {
    errorType: ErrorType.NETWORK,
    statusCode: 0, // No HTTP status for network errors
    feedbackMessage: ErrorMessageConsts.NETWORK,
    isLoggable: true,
  },
  TIMEOUT: {
    errorType: ErrorType.TIMEOUT,
    statusCode: 408,
    feedbackMessage: ErrorMessageConsts.TIMEOUT,
    isLoggable: true,
  },
  SERVER: {
    errorType: ErrorType.SERVER,
    statusCode: 500,
    feedbackMessage: ErrorMessageConsts.SERVER,
    isLoggable: true,
  },
  CLIENT: {
    errorType: ErrorType.CLIENT,
    statusCode: 400,
    feedbackMessage: ErrorMessageConsts.CLIENT,
    isLoggable: false,
  },
  VALUE: {
    errorType: ErrorType.VALUE,
    statusCode: 422,
    feedbackMessage: ErrorMessageConsts.VALUE,
    isLoggable: false,
  },
  SYNTAX: {
    errorType: ErrorType.SYNTAX,
    statusCode: 400,
    feedbackMessage: ErrorMessageConsts.SYNTAX,
    isLoggable: true,
  },
  REFERENCE: {
    errorType: ErrorType.REFERENCE,
    statusCode: 500,
    feedbackMessage: ErrorMessageConsts.REFERENCE,
    isLoggable: true,
  },
  CONTROL_FLOW: {
    errorType: ErrorType.CONTROL_FLOW,
    statusCode: 200, // Not a failure
    feedbackMessage: ErrorMessageConsts.GENERAL,
    isLoggable: false,
  },
  TOO_MANY_REQUESTS: {
    errorType: ErrorType.TOO_MANY_REQUESTS,
    statusCode: 429,
    feedbackMessage: ErrorMessageConsts.TOO_MANY_REQUESTS,
    isLoggable: true,
  },
}

export const StatusCodeKeys = ["statusCode", "status", "status_code", "code", "httpCode", "errorCode"] as const
