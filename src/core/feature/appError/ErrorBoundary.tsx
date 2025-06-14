// src/core/feature/appError/ErrorBoundary.tsx
import { Component, type ErrorInfo, type FC, type ReactNode } from "react"
import { AppError } from "./AppError"
import { ErrorType, ErrorTypeResponse } from "@/core/constants"
import type { IErrorBoundaryProps, IErrorBoundaryState } from "@/types"

/**
 * ErrorBoundary component to catch JavaScript errors in child component tree
 * and display a fallback UI instead of crashing the entire application
 */
export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Process the error using our AppError handler
    const appError = AppError.handle({
      error,
      errorType: ErrorType.GENERAL,
      feedbackMessage: ErrorTypeResponse.GENERAL.feedbackMessage,
    })

    // TODO: Integrate with error reporting services here
    console.error("Error caught by ErrorBoundary:", appError)
    console.error("Component stack trace:", errorInfo.componentStack)
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided, otherwise render default error UI
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      // Default fallback UI
      return (
        <div className="error-boundary-fallback">
          <h2>Something went wrong</h2>
          <p>We're sorry, but there was a problem loading this part of the page.</p>
          <button onClick={this.resetError}>Try again</button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * A reusable fallback component that can be customized
 */
export const DefaultErrorFallback: FC<{
  error: Error
  resetError: () => void
}> = ({ error, resetError }) => {
  return (
    <div className="error-fallback">
      <h2>Something went wrong</h2>
      <p>Error: {error.message}</p>
      <button onClick={resetError}>Try again</button>
    </div>
  )
}

export default ErrorBoundary
