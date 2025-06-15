// src/components/Logout.tsx
import { useEffect, type FC } from "react"
import { useAuthHook } from "@/store"
import { Navigate } from "react-router-dom"
import { RoutePaths } from "@/navigation"

export const Logout: FC = () => {
  const { handleLogout } = useAuthHook()
  useEffect(() => {
    handleLogout()
  }, [handleLogout])
  return <Navigate to={RoutePaths.AUTH} replace />
}
export default Logout
