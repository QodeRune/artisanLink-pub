// src/core/feature/appError/errorBoundaryutil.ts
import React, { type ComponentType, type FC } from "react"
import { ErrorBoundary } from "./ErrorBoundary"
import type { IErrorFallbackProps } from "@/types"

/**
 * Higher Order Component to wrap any component with an ErrorBoundary
 */
export function withErrorBoundary<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
  fallback?: FC<IErrorFallbackProps>,
): FC<P> {
  const WithErrorBoundary: FC<P> = (props) => {
    const wrappedElement = React.createElement(WrappedComponent, props)

    return React.createElement(ErrorBoundary, {
      fallback,
      children: wrappedElement,
    })
  }

  // Set display name for better debugging
  WithErrorBoundary.displayName = `WithErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`

  return WithErrorBoundary
}

// Alternative approach using a wrapper function (recommended for your config)
export function withErrorBoundaryWrapper<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
  fallback?: FC<IErrorFallbackProps>,
): FC<P> {
  const WithErrorBoundary: FC<P> = (props) => {
    const errorBoundaryProps = {
      fallback,
      children: React.createElement(WrappedComponent, props),
    }

    return React.createElement(ErrorBoundary, errorBoundaryProps)
  }

  WithErrorBoundary.displayName = `WithErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`

  return WithErrorBoundary
}

// Usage examples:
/*
!Basic usage
const SafeComponent = withErrorBoundary(MyComponent)

!With custom fallback
const SafeComponentWithFallback = withErrorBoundary(MyComponent, ({ error, resetError }) => (
  <div>
    <h3>Custom Error UI</h3>
    <p>{error.message}</p>
    <button onClick={resetError}>Reset</button>
  </div>
))

!Using the feedback component from your example
import { ErrorBoundaryFeedBack } from "./ErrorBoundaryFeedBack"

const SafeComponentWithFeedback = withErrorBoundary(MyComponent, ({ error, resetError }) => (
  <ErrorBoundaryFeedBack error={error} clearError={resetError} />
))
*/
