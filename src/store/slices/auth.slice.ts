// src/store/auth.slice.ts
import type { StateCreator } from "zustand"
import type { IAuthCredentials, TAuthSlice, TAuthStore } from "@/types"
import { authService } from "@/services"
import { getAccessToken, getRefreshToken } from "@/core/utils"

export const createAuthSlice: StateCreator<TAuthStore, [], [], TAuthSlice> = (set, get) => ({
  isLoggedIn: true,
  isAuthLoading: true,
  authError: null,

  // Modify your login function to ensure tokens are set before updating state
  login: async (credentials: IAuthCredentials) => {
    try {
      set({ isAuthLoading: true })
      const responseData = await authService.login(credentials)
      if (!responseData?.data) {
        throw new Error("Login failed")
      }

      const { user, access_token, refresh_token } = responseData.data ?? {}
      authService.setTokens({ accessToken: access_token, refreshToken: refresh_token })

      set({
        isLoggedIn: true,
        isAuthLoading: false,
        authError: null,
        user,
      })
      return true
    } catch (error) {
      set({ isAuthLoading: false, authError: error instanceof Error ? error.message : "Login failed" })
      return false
    }
  },

  signup: async (data) => {
    try {
      set({ isAuthLoading: true, authError: null }) // Initial loading state
      const responseData = await authService.signup(data)

      // TODO:: use generic error handling
      if (!responseData) {
        throw new Error("Error processing signup")
      }

      const { user, access_token, refresh_token } = responseData.data ?? {}

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

      return true
    } catch (error) {
      set({
        isAuthLoading: false,
        authError: error instanceof Error ? error.message : "Signup failed",
      })
      return false
    }
  },

  logout: () => {
    set({
      isLoggedIn: false,
      user: null,
    })
    authService.clearTokens() // Ensure tokens are cleared
  },

  updateTokens: ({ refresh_token, access_token, useSessionStorage = true }) => {
    try {
      authService.setTokens({
        refreshToken: refresh_token,
        accessToken: access_token,
        useSessionStorage,
      })
      return true
    } catch (error) {
      // TODO:: log or handle error
      // TODO:: also look into update storage utils to return boolean instead of void
      return false
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
      "Token check:",
      accessToken ? "access exists" : "access missing",
      refreshToken ? "refresh exists" : "refresh missing",
    )

    if ((!accessToken && !refreshToken) || !_user?.id) {
      return null
    }

    return _user.id
  },

  init: async () => {
    const userId = get().isUserPresent()

    if (!userId) {
      set({ isLoggedIn: false, isAuthLoading: false })
      return false
    }

    set({ isAuthLoading: true })

    try {
      const responseData = await authService.refresh(userId)
      if (!responseData?.data) {
        throw new Error("Error validating user")
      }

      const { refresh_token, access_token } = responseData.data
      authService.setTokens({ refreshToken: refresh_token, accessToken: access_token })

      set({ isLoggedIn: true, isAuthLoading: false })

      return true
    } catch (error) {
      console.error("Token refresh failed:", error)
      set({ isLoggedIn: false, isAuthLoading: false, authError: "Auth Error" })
      return false
    }
  },
})
