// src/navigation/ProtectedRoute.tsx
import { RoutePaths } from "@/navigation/routePaths"
import { useAuthHook } from "@/store"
import { Navigate, Outlet } from "react-router-dom"

// ProtectedRoute component to guard routes
export const ProtectedRoute: React.FC = () => {
  const { isLoggedIn, isAuthLoading } = useAuthHook()

  if (isAuthLoading) {
    return <div>Loading...</div> // Replace with your loading component
  }

  if (!isLoggedIn) {
    return <Navigate to={RoutePaths.AUTH} replace />
  }

  return <Outlet />
}
