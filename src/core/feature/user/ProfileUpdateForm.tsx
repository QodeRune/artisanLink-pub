// src/core/feature/user/ProfileUpdateForm.tsx
import { DynamicForm } from "@/core/feature/dynamicForm"
import type { IFormField, IProfileUpdateForm } from "@/types"
import type { FC } from "react"

export const ProfileUpdateForm: FC<IProfileUpdateForm> = ({ title, formFieldList, onSubmit, postSubmit }) => {
  const handleSubmit = async (data: any) => {
    if (onSubmit) {
      const isSubmitted = await onSubmit(data)
      if (postSubmit) {
        const { success } = isSubmitted
        return postSubmit({ success })
      }
    }
    return { success: true }
  }

  const _formFieldList = formFieldList.map((field) => {
    const { name, value, type, readonly } = field

    const formField: IFormField = {
      id: name,
      name: name,
      readOnly: readonly || false,
      labelText: "",
      type: type || "text",
      placeholder: value,
    }
    return formField
  })

  return (
    <section className="update-form">
      <DynamicForm fields={_formFieldList} title={title} onSubmit={handleSubmit} />
    </section>
  )
}
