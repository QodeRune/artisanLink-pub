// src/core/coreTypes/formTypes.ts
export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "date"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"

export interface FormFieldOption {
  label: string
  value: string
}

export interface FormField {
  id: string
  name: string
  label: string
  type: FormFieldType
  placeholder?: string
  value?: string | number | boolean
  options?: FormFieldOption[]
  required?: boolean
  disabled?: boolean
  readonly: boolean
  min?: number | string
  max?: number | string
  minLength?: number
  maxLength?: number
  pattern?: string
  error?: string
  className?: string
}

export interface FormProps<T = Record<string, unknown>>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  title?: string
  instructions?: string
  fields: FormField[]
  isEditable?: boolean
  onSubmit: (data: T) => boolean
  submitButtonText?: string
  cancelButtonText?: string
  onCancel?: () => boolean
  className?: string
  loading?: boolean
  initialFormData?: Partial<T>
}
