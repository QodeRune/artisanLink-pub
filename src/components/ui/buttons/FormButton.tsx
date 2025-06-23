// src/components/ui/FormButton.tsx
import { forwardRef } from "react"
import type { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

export interface IFormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  isSuccess?: boolean
  buttonClassName?: string
  containerClassName?: string
  fullWidth?: boolean
  size?: "sm" | "md" | "lg"
}

export const FormButton = forwardRef<HTMLButtonElement, IFormButtonProps>(
  (
    {
      type = "submit",
      label = "submit",
      leftIcon,
      rightIcon,
      isLoading,
      isSuccess,
      buttonClassName,
      containerClassName,
      fullWidth,
      size = "md",
      ...rest
    },
    ref,
  ) => {
    const containerClasses = clsx("button-container", size, fullWidth && "full-width", containerClassName)

    const buttonClasses = clsx("form-button", buttonClassName, {
      "button-loading": isLoading,
      "button-success": isSuccess,
    })

    return (
      <div className={containerClasses}>
        <button ref={ref} type={type} className={buttonClasses} {...rest}>
          {isLoading ? (
            <span className="loading_spinner" aria-hidden />
          ) : (
            <>
              {leftIcon && <span className="icon_left">{leftIcon}</span>}
              <span className="button-label">{label}</span>
              {rightIcon && <span className="icon_right">{rightIcon}</span>}
            </>
          )}
        </button>
      </div>
    )
  },
)
