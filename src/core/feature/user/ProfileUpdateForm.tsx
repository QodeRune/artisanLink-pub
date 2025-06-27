// src/core/feature/user/userProfileFields.tsx
import { DynamicForm } from "@/core/feature/dynamicForm"
import type { IFormField } from "@/types"
import type { FC } from "react"

export interface IProfileUpdateForm {
  title: string
  formFieldList: IFormField[]
  onSubmit: () => boolean
}

export const ProfileUpdateForm: FC<IProfileUpdateForm> = ({ title, formFieldList }) => {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    return { success: true }
  }
  return (
    <section className="update-form">
      <DynamicForm fields={formFieldList} title={title} onSubmit={(e) => handleSubmit(e)} />
    </section>
  )
}
