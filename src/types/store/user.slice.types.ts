// src/types/store/user.slice.types.ts
import type { IUser } from "../model"
export interface IUserState {
  user: IUser | null
}

export interface IUserActions {
  setUser: (user: IUser) => Boolean
  clearUser: () => Boolean
  updateUser: (updates: Partial<IUser>) => Promise<Boolean>
  updateBioData: (updates: Partial<IUser>) => Promise<Boolean>
  getUserData: () => IUser | null
  getBioDataField: (key: string) => string | undefined
}

export type TUserSlice = IUserState & IUserActions
