// src/store/slices/user.slice.ts
import type { StateCreator } from "zustand"
import type { TUserSlice, TAuthStore, IUser } from "@/types"
import { userService } from "@/services"

export const createUserSlice: StateCreator<TAuthStore, [], [], TUserSlice> = (set, get) => ({
  user: null,

  setUser: (userUpdates: IUser) => {
    const _user = get().user
    try {
      set({ user: { ..._user, ...userUpdates } })
      return true
    } catch (error) {
      throw error
    }
  },
  clearUser: () => {
    try {
      set({ user: null })
      return true
    } catch (error) {
      throw error
    }
  },
  updateUser: async (updates) => {
    try {
      const currentUser = get().user
      if (currentUser) {
        const user_id = currentUser.id
        const updatedUser = await userService.updateMe({ user_id: user_id, userUpdates: { id: user_id, ...updates } })
        if (!updatedUser) {
          return { success: false }
        }
        set({ user: { ...currentUser, ...updates } })
        return { success: true }
      } else {
        return { success: false }
      }
    } catch (error) {
      // TODO::  use custom Error handling and class
      throw error
    }
  },
  updateBioData: async (updates) => {
    try {
      const currentUser = get().user
      if (currentUser) {
        const user_id = currentUser.id
        const updatedUser = await userService.upDateBioData({
          user_id: user_id,
          userUpdates: { id: user_id, ...updates },
        })
        if (!updatedUser) {
          return { success: false }
        }
        set({ user: { ...currentUser, ...updates } })
        return { success: true }
      } else {
        return { success: false }
      }
    } catch (error) {
      // TODO::  use custom Error handling and class
      throw error
    }
  },
  getUserData: () => get().user,
  getBioDataField: (key: string): string | undefined => {
    const user = get().user
    const value = user?.bio_data?.[key]
    return typeof value === "string" ? value : undefined
  },
})
