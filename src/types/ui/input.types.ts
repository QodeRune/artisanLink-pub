// src/types/ui/input.types.ts
export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  id: string
  type?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  labelText?: string
  displayLabel?: boolean
  value?: string
  error?: string
  helperText?: string
  isLoading?: boolean
  isSuccess?: boolean
  fullWidth?: boolean
  inputClassName?: string
  labelClassName?: string
  containerSizeVariant?: "sm" | "md" | "lg"
  containerClassName?: string

  onLeftIconClick?: (event: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>) => void
  onRightIconClick?: (event: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>) => void
}
