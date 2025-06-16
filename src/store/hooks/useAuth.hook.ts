// src/store/hooks/use-auth.hook.ts
import { useCallback } from "react"
import { useAppStore } from "@/store/app.store"
import type { IAppState, ITokenStorageParams, IAuthCredentials, ISignUpData } from "@/types"

export const useAuthHook = () => {
  const isLoggedIn = useAppStore((state: IAppState) => state.isLoggedIn)
  const isAuthLoading = useAppStore((state: IAppState) => state.isAuthLoading)
  const login = useAppStore((state: IAppState) => state.login)
  const logout = useAppStore((state: IAppState) => state.logout)
  const signup = useAppStore((state: IAppState) => state.signup)
  const isLoading = useAppStore((state: IAppState) => state.isAuthLoading)
  const authError = useAppStore((state: IAppState) => state.authError)
  const init = useAppStore((state: IAppState) => state.init)
  const setAuthState = useAppStore((state: IAppState) => state.setAuthState)
  const isUserPresent = useAppStore((state: IAppState) => state.isUserPresent)
  const updateTokens = useAppStore((state: IAppState) => state.updateTokens)
  const authUpdateUserData = useAppStore((state: IAppState) => state.authUpdateUserData)

  const handleLogin = useCallback(
    async (credentials: IAuthCredentials) => {
      return await login(credentials)
    },
    [login],
  )

  const handleLogout = useCallback(() => {
    return logout()
  }, [logout])

  const handleSignup = useCallback(
    async (data: ISignUpData) => {
      return await signup(data)
    },
    [signup],
  )

  const handleInit = useCallback(async () => {
    return await init()
  }, [init])

  const handleUserPresent = useCallback(() => {
    return isUserPresent()
  }, [isUserPresent])

  const handleUpdateTokens = useCallback(
    async (params: ITokenStorageParams) => {
      return updateTokens(params)
    },
    [updateTokens],
  )
  const handleAuthUpdateUserData = useCallback(
    async (params: { userId: string }) => {
      return authUpdateUserData(params)
    },
    [authUpdateUserData],
  )

  return {
    handleInit,
    handleLogin,
    handleSignup,
    handleUserPresent,
    handleUpdateTokens,
    handleLogout,
    setAuthState,
    isUserPresent,
    handleAuthUpdateUserData,
    isLoggedIn,
    isAuthLoading,
    isLoading,
    authError,
  }
}
