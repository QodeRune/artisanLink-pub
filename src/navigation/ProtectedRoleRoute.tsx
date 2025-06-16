// src/navigation/ProtectedRoleRoute.tsx
import { type FC, useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { RoutePaths } from "@/navigation/routePaths"
import { useUserHook, useAuthHook } from "@/store"
import type { IProtectedRoleRouteProps } from "@/types"

export const ProtectedRoleRoute: FC<IProtectedRoleRouteProps> = ({ requiredCapabilities, getUpdatedUser = false }) => {
  const location = useLocation()
  const { user, getUser } = useUserHook()
  const { isLoggedIn, handleAuthUpdateUserData } = useAuthHook()

  // Define possible destinations as a union type
  type DestinationPath = typeof RoutePaths.HOME | typeof RoutePaths.ONBOARDING_WATCH_VIDEO
  let destination: DestinationPath = RoutePaths.HOME
  const targetLocation = "ONBOARDING_WATCH_VIDEO" // Placeholder for intended destination

  // Redirect to auth if not logged in or no user
  if (!isLoggedIn || !user) {
    return <Navigate to={RoutePaths.AUTH} state={{ from: location }} replace />
  }

  // Check capabilities
  const hasRequiredCapability = () =>
    requiredCapabilities?.some((capability) => user.capabilities?.[capability]) ?? true

  // Fetch updated user data if needed
  useEffect(() => {
    if (!requiredCapabilities?.length || hasRequiredCapability() || !getUpdatedUser) {
      return
    }

    const updateUser = async () => {
      try {
        const updatedUserData = await handleAuthUpdateUserData({ userId: user.id })
        if (!updatedUserData) {
          return
        }
        const updatedUser = getUser()
        // Update destination based on new capabilities
        if (requiredCapabilities.some((capability) => updatedUser?.capabilities?.[capability])) {
          destination = RoutePaths[targetLocation]
        }
      } catch (error) {
        console.error("Failed to update user data:", error)
      }
    }

    updateUser()
  }, [getUpdatedUser, handleAuthUpdateUserData, user.id, requiredCapabilities, getUser])

  // Redirect if capabilities are required but missing
  if (requiredCapabilities?.length && !hasRequiredCapability()) {
    return <Navigate to={destination} state={{ from: location }} replace />
  }

  return <Outlet />
}
