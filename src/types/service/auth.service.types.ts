// src/types/service/auth.service.types.ts
import type { IUser } from "../model"

export interface IAuthResponseBody {
  user: IUser
  access_token: string
  refresh_token: string
}
