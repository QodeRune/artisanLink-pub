// src/types/coreTypes/user.feature.types.ts
import type { IComponentFetchResponse } from "../service"
import type { TFormFieldType } from "../ui"

export interface IUpdateProfile {
  name: string
  value: string
  type?: TFormFieldType
  readonly?: boolean
}

export interface IProfileUpdateForm<T = any> {
  title: string
  formFieldList: IUpdateProfile[]
  onSubmit: (data?: T) => Promise<IComponentFetchResponse>
}
