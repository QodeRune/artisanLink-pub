// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import { RoutePaths } from "@/navigation/routePaths"
import { useAuthHook, useUserHook } from "@/store"
import { useToast } from "@/core"
import type { FC } from "react"
import type { IProtectedRoleRouteProps } from "@/types"

export const ProtectedRoute: FC<IProtectedRoleRouteProps> = ({ requiredCapabilities, redirectPath }) => {
  const { isLoggedIn, isAuthLoading } = useAuthHook()
  const { user: _user } = useUserHook()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const user = Array.isArray(_user) ? _user[0] : _user
  const fallbackRedirect = redirectPath || location.state?.from?.pathname || RoutePaths.HOME

  // useRef to guard against multiple effects on re-renders
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (!isAuthLoading && isLoggedIn && requiredCapabilities?.length) {
      const hasRequired = requiredCapabilities.some((cap) => user?.capabilities?.[cap])
      if (!hasRequired && !hasRedirected.current) {
        hasRedirected.current = true

        addToast({
          title: "",
          message: "Access Denied, Not authorized",
          type: "warning",
          size: "md",
          position: "top-right",
          duration: 3000,
        })

        navigate(fallbackRedirect, { replace: true })
      }
    }
  }, [isAuthLoading, isLoggedIn, requiredCapabilities, user, fallbackRedirect, addToast, navigate])

  if (isAuthLoading) return <div>Loading...</div>

  if (!isLoggedIn) {
    return <Navigate to={RoutePaths.AUTH} state={{ from: location }} replace />
  }

  if (requiredCapabilities?.length) {
    const hasRequired = requiredCapabilities.some((cap) => user?.capabilities?.[cap])
    if (!hasRequired) {
      return null // already redirected in useEffect
    }
  }

  return <Outlet />
}
