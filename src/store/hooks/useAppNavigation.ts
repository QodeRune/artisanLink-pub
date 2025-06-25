// src/store/hooks/useAppNavigation.ts
import { useNavigate } from "react-router-dom"
import { RoutePaths } from "@/navigation"
import { useUserHook } from "@/store/hooks"
import type { IAppNavigation, TNavigationDestination } from "@/types"

/**
 * Enhanced navigation hook for application routing
 *
 * This hook provides convenient navigation methods for common routes and
 * intelligently routes users based on their capabilities.
 *
 * @returns {Object} Navigation methods and utilities
 * @property {Function} goTo - Navigate to any route by name or path
 * @property {Function} goToHome - Navigate to user's personalized home page
 * @property {Function} goToAuth - Navigate to authentication page
 * @property {Function} goToDashboard - Navigate to dashboard
 * @property {Function} navigate - Original React Router navigate function
 * @property {Function} getHomeUrl - Get user's home URL without navigating
 *
 * @example
 * !Navigate to a route defined in RoutePaths
 * const { goTo } = useAppNavigation();
 * goTo('DASHBOARD');
 *
 * @example
 * !Navigate to user's personalized home
 * const { goToHome } = useAppNavigation();
 * goToHome();
 *
 * @example
 * !Navigate with options
 * const { goTo } = useAppNavigation();
 * goTo('PROFILE', { replace: true, state: { from: location } });
 *
 * @example
 * !Get home URL without navigating
 * const { getHomeUrl } = useAppNavigation();
 * const homeUrl = getHomeUrl();
 */
export function useAppNavigation(): IAppNavigation {
  const navigate = useNavigate()
  const { user: _user } = useUserHook()
  const user = Array.isArray(_user) ? _user[0] : _user
  const userCapabilities = user?.capabilities

  // Determine user's home page based on capabilities
  const getHomeUrl = () =>
    userCapabilities?.hasEnrolledAccess
      ? RoutePaths.DASHBOARD
      : userCapabilities?.hasRegisteredAccess
      ? RoutePaths.ONBOARDING_WATCH_VIDEO
      : RoutePaths.AUTH

  // Navigate to a predefined path from RoutePaths or custom path
  const goTo = (destination: TNavigationDestination, options?: { replace?: boolean; state?: any }) => {
    // Check if it's a key of RoutePaths
    const path = Object.keys(RoutePaths).includes(destination as string)
      ? RoutePaths[destination as keyof typeof RoutePaths]
      : destination

    navigate(path, options)
  }

  // Navigate to user's appropriate home page (Dashboard | onboarding)
  const goToHome = (options?: { replace?: boolean; state?: any }) => {
    navigate(getHomeUrl(), options)
  }

  const goToAuth = () => navigate(RoutePaths.AUTH)
  const goToDashboard = () => navigate(RoutePaths.DASHBOARD)

  return {
    goTo,
    goToHome,
    goToAuth,
    goToDashboard,
    navigate,
    getHomeUrl,
  }
}
