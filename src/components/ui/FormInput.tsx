// src/components/ui/FormInput.tsx
import { forwardRef } from "react"
import type { IInputProps } from "@/types/ui"

export const FormInput = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      id,
      type = "text",
      inputClassName,
      containerClassName,
      leftIcon,
      rightIcon,
      labelText = "",
      error,
      helperText,
      isLoading,
      isSuccess,
      fullWidth,
      containerSizeVariant = "md",
      labelClassName = "inputLabel",
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={`form-input-container ${containerClassName || ""} ${containerSizeVariant} ${fullWidth || ""}`}>
        <label htmlFor={id} className={labelClassName}>
          {labelText}
        </label>
        <div className="inputWrapper">
          {leftIcon && <div className="icon-left">{leftIcon}</div>}
          <input id={id} ref={ref} type={type} className={`${inputClassName}`} {...rest} />

          {rightIcon && <div className="input-rightIcon"></div>}
          {isLoading && <div className="loading-spinner"></div>}
          {isSuccess && <div className="input-success"></div>}
        </div>
        {helperText && <div className="input-success"></div>}
        {error && <div className="input-success"></div>}
      </div>
    )
  },
)
