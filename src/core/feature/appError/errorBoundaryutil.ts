// TODO:: revisit
// import { Component, type ComponentType, type FC } from "react"
// import { ErrorBoundary } from "./ErrorBoundary" // Adjust path as needed

// /**
//  * Higher Order Component to wrap any component with an ErrorBoundary
//  */
// export function withErrorBoundary(
//   WrappedComponent: ComponentType<any>,
//   fallback?: ComponentType<{ error: Error; resetError: () => void }>,
// ): ComponentType<any> {
//   const WithErrorBoundary: FC<any> = (props: any) => (
//     <ErrorBoundary fallback={fallback}>
//       <WrappedComponent {...props} />
//     </ErrorBoundary>
//   )

//   // Set display name for better debugging
//   WithErrorBoundary.displayName = `WithErrorBoundary(${
//     WrappedComponent.displayName || WrappedComponent.name || "Component"
//   })`

//   return WithErrorBoundary
// }
