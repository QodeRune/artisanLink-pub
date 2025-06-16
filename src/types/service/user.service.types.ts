import type { IUser } from "../model"

// src/types/service/user.service.types.ts
export interface IUpdateUserProps {
  user_id: string
  userUpdates: Partial<IUser>
}
