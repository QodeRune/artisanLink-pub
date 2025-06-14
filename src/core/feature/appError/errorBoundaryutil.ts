// src/core/feature/appError/errorBoundaryutil.ts
import { type ComponentType, type FC } from "react"
import { ErrorBoundary } from "./ErrorBoundary" // Adjust path as needed
import type { IErrorFallbackProps } from "@/types"

/**
 * Higher Order Component to wrap any component with an ErrorBoundary
 */

// Higher Order Component to wrap any component with an ErrorBoundary
export function withErrorBoundary(
  WrappedComponent: ComponentType<any>,
  fallback?: FC<IErrorFallbackProps>,
): ComponentType<any> {
  const WithErrorBoundary: FC<any> = (props: any) => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  )

  // Set display name for better debugging
  WithErrorBoundary.displayName = `WithErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`

  return WithErrorBoundary
}
