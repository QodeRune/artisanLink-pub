// src/services/auth/auth.service.ts
import { clearAllTokens, setTokens, storageUtils } from "@/core"
import { AuthEndpoints } from "@/services/api/apiGroups"
import { api } from "@/services/api/apiRequest"
import { useAppStore } from "@/store"
import type {
  IAuthCredentials,
  IAuthResponseBody,
  IResponseDTO,
  ISignUpData,
  ITokenStorageParams,
  IUser,
} from "@/types"

export const authService = {
  login: async (credentials: IAuthCredentials) => {
    // console.log("authService.login called with:", credentials)
    return await api.authenticatedPost<IResponseDTO<IAuthResponseBody>>({
      endpoint: AuthEndpoints.USER_LOGIN,
      body: credentials,
    })
  },
  signup: async (data: ISignUpData) =>
    await api.post<IResponseDTO<IAuthResponseBody>>({
      endpoint: AuthEndpoints.USER_SIGN_UP,
      body: data,
    }),
  refresh: async (user_id: string) =>
    await api.authenticatedPost<IResponseDTO<IAuthResponseBody>>({
      endpoint: AuthEndpoints.REFRESH_TOKEN,
      body: { user_id },
    }),
  setTokens: (params: ITokenStorageParams) => setTokens(params),

  // In your auth service
  get_stored_user: (): IUser | null => {
    // Check Zustand store first (if it's available in this context)
    try {
      const storeUser = useAppStore.getState().getUserData()
      const storedUser = Array.isArray(storeUser) ? storeUser[0] : storeUser
      if (storedUser) return storedUser
    } catch (e) {
      // If accessing the store fails, continue to check storage
    }

    // Then fall back to storage
    let user = null

    // Try direct user storage
    const directUser = storageUtils.get<IUser>({ key: "user", useSessionStorage: false })
    if (directUser) {
      user = directUser
    }

    // Try app-store
    if (!user) {
      const appStore = storageUtils.get<any>({ key: "app-store", useSessionStorage: false })
      if (appStore?.state?.user) {
        user = appStore.state.user
      }
    }

    // Handle array case
    if (Array.isArray(user) && user.length > 0) {
      user = user[0]
    }

    return user
  },
  clearTokens: () => clearAllTokens(),
}
