// src/navigation/HomeRedirect.tsx
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAppNavigation, useAuthHook } from "@/store"
import { RoutePaths } from "@/navigation"

export const HomeRedirect = () => {
  const { isLoggedIn, isAuthLoading, handleUserPresent, setAuthState } = useAuthHook()
  const { getHomeUrl } = useAppNavigation()

  useEffect(() => {
    console.log("called home")
    const checkUser = async () => {
      const userId = await handleUserPresent() // Await if handleUserPresent is async
      setAuthState({
        isLoggedIn: !!userId,
        isAuthLoading: false,
      })
    }
    checkUser()
  }, [handleUserPresent, setAuthState])

  if (isAuthLoading) {
    return <div>Loading...</div> // Replace with your loading component
  }

  // If not logged in, go to auth
  if (!isLoggedIn) {
    return <Navigate to={RoutePaths.AUTH} state={{ from: location }} replace />
  }

  // Otherwise go to user's appropriate home page
  return <Navigate to={getHomeUrl()} replace />
}
