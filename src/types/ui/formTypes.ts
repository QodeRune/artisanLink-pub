// import type { IInputProps } from "@/types/ui"

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

export interface IFormFieldOption {
  labelText: string
  value: string
}

export interface IImageProperties {
  alt: string
  url: string
  onClick?: () => boolean
}

export interface IFormField {
  id: string
  name: string
  type?: string
  labelText?: string
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  helperText?: string
  readOnly?: boolean
  autoComplete?: string
  iconLeft?: {
    url: string
    alt?: string
    onClick?: () => void
  }
  iconRight?: {
    url: string
    alt?: string
    onClick?: () => void
  }
}

export interface FormProps<T = Record<string, unknown>>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  title?: string
  instructions?: string
  fields: IFormField[]
  isEditable?: boolean
  onSubmit: (data: T) => boolean
  submitButtonText?: string
  cancelButtonText?: string
  onCancel?: () => boolean
  className?: string
  loading?: boolean
  initialFormData?: Partial<T>
}
