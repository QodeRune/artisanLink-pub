// src/views/biodata/Biodata.tsx
import { DynamicForm } from "@/core"
import { bioDataFields } from "./bioDataFields"

export const BioDataForm = () => {
  const handleSubmit = (data: Record<string, any>) => {
    console.log("Form data:", data)
    // Handle form submission
    return { success: true }
  }

  return (
    <DynamicForm
      fields={bioDataFields}
      onSubmit={handleSubmit}
      title="Personal Information"
      submitButtonText="Save Information"
    />
  )
}
