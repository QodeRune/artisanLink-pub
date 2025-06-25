// src/types/navigation/protectedRoutes.types.ts
import { RoutePaths } from "@/navigation"
import { useNavigate } from "react-router-dom"
import type { IUserCapabilities } from "../model"

export interface IProtectedRoleRouteProps {
  /** Specific user capabilities required to access this route */
  requiredCapabilities?: (keyof IUserCapabilities)[]
  redirectPath?: string
}

export type TNavigationDestination = keyof typeof RoutePaths | string
export interface IAppNavigation {
  goTo: (destination: TNavigationDestination, options?: { replace?: boolean; state?: any }) => void
  goToHome: (options?: { replace?: boolean; state?: any }) => void
  goToAuth: () => void
  goToDashboard: () => void
  navigate: ReturnType<typeof useNavigate>
  getHomeUrl: () => string
}
