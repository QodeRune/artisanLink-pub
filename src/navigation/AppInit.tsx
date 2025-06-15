// src/components/Initializer.tsx
import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { RoutePaths } from "@/navigation"
import { useAuthHook } from "@/store"
import { AppError } from "@/core/feature/appError/AppError"
import { ErrorType } from "@/core/constants/errorConstants"
import { Outlet } from "react-router-dom"
import { useToast } from "@/core"

export const Initializer: React.FC = () => {
  const { handleInit, isAuthLoading } = useAuthHook()
  const location = useLocation()
  const navigate = useNavigate()
  const hasInitialized = useRef(false)

  const { addToast } = useToast()

  useEffect(() => {
    if (hasInitialized.current) return

    const initialize = async () => {
      hasInitialized.current = true
      const isAuthRoute = location.pathname === RoutePaths.AUTH || location.pathname.startsWith(`${RoutePaths.AUTH}/`)
      if (isAuthRoute) return

      try {
        const result = await handleInit()
        if (!result.success) {
          navigate(RoutePaths.AUTH, { replace: true })
        }
      } catch (error) {
        const appError = AppError.handle({
          error,
          errorType: error instanceof AppError ? error.errorType : ErrorType.GENERAL,
          feedbackMessage: error instanceof AppError ? error.feedbackMessage : "Initialization failed",
        })
        addToast({
          title: "Error",
          message: appError.feedbackMessage,
          type: "error",
          size: "md",
          position: "top-right",
          duration: 3000,
        })
        navigate(RoutePaths.AUTH, { replace: true })
      }
    }

    initialize()
  }, [handleInit, location.pathname, navigate])

  if (isAuthLoading) {
    return <div>Loading...</div> // Replace with <LoadingSpinner />
  }

  return <Outlet /> // Render child routes
}

export default Initializer
