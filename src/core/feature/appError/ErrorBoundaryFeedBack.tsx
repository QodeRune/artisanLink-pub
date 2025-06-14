// src/core/feature/appError/ErrorBoundaryFeedBack.tsx
import { useEffect, type FC } from "react"
import { useToast } from "../notification"
import { AppError } from "@/core/feature/appError/AppError"
import { ErrorMessageConsts } from "@/core/constants"

export const ErrorBoundaryFeedBack: FC<{ error: Error | AppError; clearError: () => void }> = ({
  error,
  clearError,
}) => {
  const { addToast } = useToast()
  const _errorMessage = error instanceof AppError ? error.feedbackMessage || error.message : ErrorMessageConsts.GENERAL

  // Trigger toast on mount
  useEffect(() => {
    addToast({
      title: "Error",
      message: _errorMessage,
      type: "error",
      size: "md",
      position: "top-right",
      duration: 3000,
      onClose: clearError,
    })
  }, [])

  return null
}
