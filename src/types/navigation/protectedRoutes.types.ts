// src/types/navigation/protectedRoutes.types.ts
import type { IUserCapabilities } from "../model"

export interface IProtectedRoleRouteProps {
  /** Specific user capabilities required to access this route */
  requiredCapabilities?: (keyof IUserCapabilities)[]
  redirectPath?: string
}
