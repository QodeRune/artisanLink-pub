// src/navigation/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { RoutePaths } from "@/navigation/routePaths"
import { useAuthHook } from "@/store"

export const ProtectedRoute: React.FC = () => {
  const { isLoggedIn, isAuthLoading } = useAuthHook()
  const location = useLocation()

  if (isAuthLoading) {
    return <div>Loading...</div> // TODO:: Replace with <LoadingSpinner />
  }

  if (!isLoggedIn) {
    return <Navigate to={RoutePaths.AUTH} state={{ from: location }} replace />
  }

  return <Outlet />
}
