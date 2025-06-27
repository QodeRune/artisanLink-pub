// src/types/store/user.slice.types.ts
import type { IComponentFetchResponse } from "../service"
import type { IUser } from "../model"

export interface IUserState {
  user: IUser | null
}

export interface IUserActions {
  setUser: (user: IUser) => Boolean
  clearUser: () => Boolean
  updateUser: (updates?: Partial<IUser>) => Promise<IComponentFetchResponse>
  updateBioData: (updates?: Partial<IUser>) => Promise<IComponentFetchResponse>
  getUserData: () => IUser | null
  getBioDataField: (key: string) => string | undefined
}

export type TUserSlice = IUserState & IUserActions
