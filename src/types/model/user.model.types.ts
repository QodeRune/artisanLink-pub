// src/types/model/user.model.types.ts
// TODO:: consider getting this from the env using existing setup
export const UserCapabilityKeys = {
  hasRegisteredAccess: "hasRegisteredAccess",
  hasPremiumAccess: "hasPremiumAccess",
  hasAcceptedAccess: "hasAcceptedAccess",
  hasEnrolledAccess: "hasEnrolledAccess",
} as const

export type TUserCapabilityKeys = keyof typeof UserCapabilityKeys

export type IUserCapabilities = {
  [K in TUserCapabilityKeys]: boolean
} & { [key: string]: boolean }

export interface IUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
  user_status_id?: string
  user_status?: string
  organization_id?: string
  capabilities: IUserCapabilities
  bio_data?: Record<string, unknown>
}
