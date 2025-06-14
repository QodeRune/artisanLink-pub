// src/store/auth.slice.ts
import type { StateCreator } from "zustand"
import type { IAuthCredentials, ISignUpData, TAuthSlice, TAuthStore } from "@/types"
import { authService } from "@/services"
import { getAccessToken, getRefreshToken } from "@/core/utils"

export const createAuthSlice: StateCreator<TAuthStore, [], [], TAuthSlice> = (set, get) => ({
  isLoggedIn: true,
  isAuthLoading: true,
  authError: null,

  // set tokens then update state
  login: async (credentials: IAuthCredentials) => {
    try {
      set({ isAuthLoading: true })
      const responseData = await authService.login(credentials)
      if (!responseData?.data) {
        throw new Error("Login failed")
      }

      const { success, message, data } = responseData
      const { user, access_token, refresh_token } = data ?? {}
      authService.setTokens({ accessToken: access_token, refreshToken: refresh_token })

      set({
        isLoggedIn: true,
        isAuthLoading: false,
        authError: null,
        user,
      })
      return { success, message }
    } catch (error) {
      const _errorMessage = error instanceof Error ? error.message : "Login failed"
      set({ isAuthLoading: false, authError: _errorMessage })
      return { success: false, message: _errorMessage }
    }
  },

  signup: async (signupData: ISignUpData) => {
    try {
      set({ isAuthLoading: true, authError: null }) // Initial loading state
      const responseData = await authService.signup(signupData)

      // TODO:: use generic error handling
      if (!responseData) {
        throw new Error("Error processing signup")
      }

      const { success, message, data } = responseData
      const { user, access_token, refresh_token } = data ?? {}

      if (access_token && refresh_token) {
        authService.setTokens({ accessToken: access_token, refreshToken: refresh_token })

        // Wait a tiny bit to ensure storage is updated
        await new Promise((resolve) => setTimeout(resolve, 10))
      }

      set({
        isLoggedIn: true,
        isAuthLoading: false,
        authError: null,
        user,
      })

      return { success, message }
    } catch (error) {
      const _errorMessage = error instanceof Error ? error.message : "Signup failed"
      set({ isAuthLoading: false, authError: _errorMessage })
      return { success: false, message: _errorMessage }
    }
  },

  logout: () => {
    set({
      isLoggedIn: false,
      user: null,
    })
    authService.clearTokens() // Ensure tokens are cleared
    return { success: true }
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
      // TODO:: log or handle error
      // TODO:: also look into update storage utils to return boolean instead of void
      return { success: false }
    }
  },

  clearError: () => set({ authError: null }),
  setAuthState: (state) => set(state),

  isUserPresent: () => {
    // Check for tokens first,
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    const _user = authService.get_stored_user()

    console.log(
      "isUserPresent - Token check:",
      accessToken ? "access exists" : "access missing",
      refreshToken ? "refresh exists" : "refresh missing",
    )

    if ((!accessToken && !refreshToken) || !_user?.id) {
      return { success: false }
    }

    return { success: true, data: { userId: _user.id } }
  },

  init: async () => {
    const { success, ResponseData } = get().isUserPresent()

    if (!success || !ResponseData?.userId) {
      set({ isLoggedIn: false, isAuthLoading: false })
      return { success: false }
    }

    set({ isAuthLoading: true })

    try {
      const responseData = await authService.refresh(ResponseData?.userId)
      if (!responseData?.data) {
        throw new Error("Error validating user")
      }

      const { refresh_token, access_token } = responseData.data
      authService.setTokens({ refreshToken: refresh_token, accessToken: access_token })

      set({ isLoggedIn: true, isAuthLoading: false })

      return { success: true, message: responseData.message }
    } catch (error) {
      console.error("Token refresh failed:", error)
      // TODO:: state error should probably be the full errors for telemetry purposes
      const _errorMessage = error instanceof Error ? error.message : "Auth Error"
      set({ isLoggedIn: false, isAuthLoading: false, authError: _errorMessage })
      return { success: false, message: _errorMessage }
    }
  },
})
