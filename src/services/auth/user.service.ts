// src/services/auth/user.service.ts

import { api, UserEndpoints } from "../api"
import type { IResponseDTO, IUpdateUserProps } from "@/types"

export const userService = {
  updateMe: async (userData: IUpdateUserProps) => {
    return await api.put<IResponseDTO>({
      endpoint: `${UserEndpoints.UPDATE_ME}/${userData.user_id}`,
      body: userData.userUpdates,
    })
  },
  upDateBioData: async (bioData: IUpdateUserProps) => {
    return await api.put<IResponseDTO>({
      endpoint: `${UserEndpoints.BIO_DATA}/${bioData.user_id}`,
      body: bioData.userUpdates,
    })
  },
}
