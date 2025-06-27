// src/core/feature/user/ProfileUpdateForm.tsx
import { DynamicForm } from "@/core/feature/dynamicForm"
import type { IFormField, IProfileUpdateForm } from "@/types"
import type { FC } from "react"

export const ProfileUpdateForm: FC<IProfileUpdateForm> = ({ title, formFieldList, onSubmit }) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Extract form data if needed
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    // Call the provided onSubmit function
    if (onSubmit) {
      return await onSubmit(data)
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
