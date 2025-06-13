// src/store/hooks/use-user.hook.ts
import { useCallback } from "react"
import { useAppStore } from "@/store/app.store"
import type { IUser, IAppState } from "@/types/"

export const useUserHook = () => {
  const user = useAppStore((state: IAppState) => state.user)
  const setUser = useAppStore((state: IAppState) => state.setUser)
  const clearUser = useAppStore((state: IAppState) => state.clearUser)
  const updateUser = useAppStore((state: IAppState) => state.updateUser)
  const updateBioData = useAppStore((state: IAppState) => state.updateBioData)
  const getUser = useAppStore((state: IAppState) => state.getUserData)
  const getBioDataField = useAppStore((state: IAppState) => state.getBioDataField)

  const handleGetBioDataField = useCallback(
    (key: string) => {
      return getBioDataField(key)
    },
    [getBioDataField],
  )

  // Memoized action to update user
  const handleUpdateUser = useCallback(
    (updates: Partial<IUser>) => {
      return updateUser(updates)
    },
    [updateUser],
  )

  const handleUpdateBioData = useCallback(
    (updates: Partial<IUser>) => {
      return updateBioData(updates)
    },
    [updateUser],
  )

  // Memoized action to get user
  const handleGetUser = useCallback(() => {
    return getUser()
  }, [getUser])

  const handleSetUser = useCallback(
    async (userUpdates: IUser) => {
      return setUser(userUpdates)
    },
    [getUser],
  )

  return {
    user,
    setUser,
    clearUser,
    handleSetUser,
    updateUser: handleUpdateUser,
    updateBioData: handleUpdateBioData,
    getUser: handleGetUser,
    getBioDataField: handleGetBioDataField,
  }
}
