// src/services/api/abortControllers/scopedAbortController.ts

const controllerMap = new Map<string, AbortController>()

/**
 * Returns a new AbortController for the given scope.
 * Automatically aborts any previous controller under the same scope.
 *
 * @param scope A unique string to identify the request group (e.g. "search", "user-profile")
 */
export const getScopedAbortController = (scope: string): AbortController => {
  const existing = controllerMap.get(scope)
  if (existing) {
    existing.abort()
  }

  const controller = new AbortController()
  controllerMap.set(scope, controller)
  return controller
}

/**
 * Optionally: Abort manually without creating a new controller
 */
export const abortScope = (scope: string) => {
  const controller = controllerMap.get(scope)
  if (controller) {
    controller.abort()
    controllerMap.delete(scope)
  }
}
