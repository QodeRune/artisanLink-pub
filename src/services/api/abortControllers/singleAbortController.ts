// src/services/api/abortControllers/singleAbortController.ts

let controller: AbortController | null = null

export const getSingleAbortController = (): AbortController => {
  if (controller) {
    controller.abort()
  }

  controller = new AbortController()
  return controller
}
