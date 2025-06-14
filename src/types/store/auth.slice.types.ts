// src/types/store/auth.slice.types.ts
import type { IComponentFetchResponse } from "@/types/service"
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
  login: (credentials: IAuthCredentials) => Promise<IComponentFetchResponse>
  signup: (data: ISignUpData) => Promise<IComponentFetchResponse>
  init: () => Promise<IComponentFetchResponse>
  logout: () => IComponentFetchResponse
  clearError: () => void
  setAuthState: (state: Partial<IAuthState>) => void
  updateTokens: (params: ITokenStorageParams) => IComponentFetchResponse
  isUserPresent: () => IComponentFetchResponse<{ userId: string }>
}

export type TAuthSlice = IAuthState & IAuthActions
export type TAuthStore = TAuthSlice & TUserSlice
