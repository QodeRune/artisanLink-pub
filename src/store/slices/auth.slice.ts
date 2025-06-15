// src/store/auth.slice.ts
import type { StateCreator } from "zustand"
import type { IAuthCredentials, ISignUpData, TAuthSlice, TAuthStore } from "@/types"
import { authService } from "@/services"
import { getAccessToken, getRefreshToken, AppError, ErrorType, ErrorMessageConsts } from "@/core"

export const createAuthSlice: StateCreator<TAuthStore, [], [], TAuthSlice> = (set, get) => ({
  isLoggedIn: false,
  isAuthLoading: false,
  authError: null,

  login: async (credentials: IAuthCredentials) => {
    try {
      set({ isAuthLoading: true, authError: null })
      const responseData = await authService.login(credentials)
      const { success, message, data } = responseData

      if (!data || !success) {
        throw AppError.handleControlFlowError({
          error: new Error("Invalid login response"),
          feedbackMessage: ErrorMessageConsts.INVALID_CREDENTIALS,
        })
      }

      const { user, access_token, refresh_token } = data
      if (!access_token || !refresh_token) {
        throw AppError.handleControlFlowError({
          error: new Error("Missing tokens"),
          feedbackMessage: "Login failed due to missing tokens",
        })
      }

      authService.setTokens({ accessToken: access_token, refreshToken: refresh_token })

      set({
        isLoggedIn: true,
        isAuthLoading: false,
        authError: null,
        user,
      })
      return { success: success, feedbackMessage: message }
    } catch (error) {
      const appError = AppError.handle({
        error,
        errorType: error instanceof AppError ? error.errorType : ErrorType.GENERAL,
        feedbackMessage: error instanceof AppError ? error.feedbackMessage : ErrorMessageConsts.GENERAL,
      })
      set({ isAuthLoading: false, authError: appError.feedbackMessage })
      throw appError
    }
  },

  signup: async (signupData: ISignUpData) => {
    try {
      set({ isAuthLoading: true, authError: null })
      const responseData = await authService.signup(signupData)

      if (!responseData) {
        throw AppError.handleControlFlowError({
          error: new Error("No response from signup"),
          feedbackMessage: "Signup failed due to invalid response",
        })
      }

      const { success, message, data } = responseData
      const { user, access_token, refresh_token } = data ?? {}

      if (!success || !access_token || !refresh_token) {
        throw AppError.handleControlFlowError({
          error: new Error("Invalid signup response"),
          feedbackMessage: "Signup failed",
        })
      }

      authService.setTokens({ accessToken: access_token, refreshToken: refresh_token })
      await new Promise((resolve) => setTimeout(resolve, 10))

      set({
        isLoggedIn: true,
        isAuthLoading: false,
        authError: null,
        user,
      })
      return { success: success, feedbackMessage: message }
    } catch (error) {
      const appError = AppError.handle({
        error,
        errorType: error instanceof AppError ? error.errorType : ErrorType.GENERAL,
        feedbackMessage: error instanceof AppError ? error.feedbackMessage : ErrorMessageConsts.GENERAL,
      })
      set({ isAuthLoading: false, authError: appError.feedbackMessage })
      throw appError
    }
  },

  logout: () => {
    try {
      set({ isLoggedIn: false, user: null, authError: null })
      authService.clearTokens()
      return { success: true }
    } catch (error) {
      const appError = AppError.handle({
        error,
        errorType: ErrorType.GENERAL,
        feedbackMessage: "Logout failed",
      })
      set({ authError: appError.feedbackMessage })
      throw appError
    }
  },

  updateTokens: ({ refresh_token, access_token, useSessionStorage = true }) => {
    try {
      authService.setTokens({
        refreshToken: refresh_token,
        accessToken: access_token,
        useSessionStorage,
      })
      return { success: true }
    } catch (error) {
      const appError = AppError.handle({
        error,
        errorType: ErrorType.GENERAL,
        feedbackMessage: "Failed to update tokens",
      })
      throw appError
    }
  },

  clearError: () => set({ authError: null }),
  setAuthState: (state) => set(state),

  isUserPresent: () => {
    try {
      const accessToken = getAccessToken()
      const refreshToken = getRefreshToken()
      const _user = authService.get_stored_user()

      console.log(
        //TODO:: Remove console.log
        "isUserPresent - Token check:",
        accessToken ? "access exists" : "access missing",
        refreshToken ? "refresh exists" : "refresh missing",
      )

      if ((!accessToken && !refreshToken) || !_user?.id) {
        return { success: false }
      }

      return { success: true, resData: { userId: _user.id } }
    } catch (error) {
      const appError = AppError.handle({
        error,
        errorType: ErrorType.GENERAL,
        feedbackMessage: "Failed to check user presence",
      })
      throw appError
    }
  },

  init: async () => {
    try {
      const { success, resData } = get().isUserPresent()

      if (!success || !resData?.userId) {
        set({ isLoggedIn: false, isAuthLoading: false })
        return { success: false, message: "No user session found" }
      }

      set({ isAuthLoading: true })

      const responseData = await authService.refresh(resData.userId)
      if (!responseData?.data) {
        throw AppError.handleControlFlowError({
          error: new Error("Invalid refresh response"),
          feedbackMessage: "Failed to validate user session",
        })
      }

      const { refresh_token, access_token } = responseData.data
      authService.setTokens({ refreshToken: refresh_token, accessToken: access_token })

      set({ isLoggedIn: true, isAuthLoading: false, authError: null })
      return { success: true, message: responseData.message }
    } catch (error) {
      const appError = AppError.handle({
        error,
        errorType: error instanceof AppError ? error.errorType : ErrorType.GENERAL,
        feedbackMessage: error instanceof AppError ? error.feedbackMessage : ErrorMessageConsts.SESSION_EXPIRED,
      })
      set({ isLoggedIn: false, isAuthLoading: false, authError: appError.feedbackMessage })
      throw appError
    }
  },
})
