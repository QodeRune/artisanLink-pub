// src/types/store/auth.slice.types.ts
import type { ITokenStorageParams } from "../coreTypes"
import type { TUserSlice } from "./user.slice.types"

export interface IAuthCredentials {
  email: string
  password: string
}

export interface ISignUpData extends IAuthCredentials {
  first_name: string
  last_name: string
}

export interface IAuthState {
  isLoggedIn: boolean
  isAuthLoading: boolean
  authError: string | null
}

export interface IAuthActions {
  login: (credentials: IAuthCredentials) => Promise<boolean>
  signup: (data: ISignUpData) => Promise<boolean>
  init: () => Promise<boolean>
  logout: () => void
  clearError: () => void
  setAuthState: (state: Partial<IAuthState>) => void
  updateTokens: (params: ITokenStorageParams) => boolean
  isUserPresent: () => string | null
}

export type TAuthSlice = IAuthState & IAuthActions
export type TAuthStore = TAuthSlice & TUserSlice
