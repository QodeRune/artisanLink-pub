// src/components/ui/FormInput.tsx
import { forwardRef } from "react"
import type { IInputProps } from "@/types/ui"
import clsx from "clsx"

export const FormInput = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      id,
      autoComplete,
      type = "text",
      inputClassName,
      containerClassName,
      leftIcon,
      rightIcon,
      labelText = "",
      displayLabel = true,
      error,
      helperText,
      isLoading,
      isSuccess,
      fullWidth,
      containerSizeVariant = "md",
      labelClassName = "inputLabel",
      onLeftIconClick,
      onRightIconClick,
      ...rest
    },
    ref,
  ) => {
    const containerClasses = clsx(
      "input-container",
      `${containerSizeVariant}`,
      `${fullWidth ? "full-width" : ""}`,
      `${containerClassName || ""}`,
    )

    const labelClasses = clsx("user-entry-input-classes", `${labelClassName}`)

    const inputClasses = clsx(
      "form_input",
      `${inputClassName || ""}`,
      `${error ? "input-error" : ""}`,
      `${isLoading ? "input-loading" : ""}`,
      `${isSuccess ? "input-success" : ""}`,
      `${leftIcon ? "has_left_icon" : ""}`,
      `${rightIcon ? "has_right_icon" : ""}`,
    )

    const leftIconClasses = clsx("icon_left", "input_icon", `${onLeftIconClick ? "clickable" : ""}`)

    const rightIconClasses = clsx("icon_right", "input_icon", `${onRightIconClick ? "clickable" : ""}`)

    // Enhanced event handlers that work for both mouse and touch
    const handleLeftIconInteraction = (e: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (onLeftIconClick) {
        onLeftIconClick(e as React.MouseEvent<HTMLSpanElement>)
      }
    }

    const handleRightIconInteraction = (e: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (onRightIconClick) {
        onRightIconClick(e as React.MouseEvent<HTMLSpanElement>)
      }
    }

    return (
      <div className={containerClasses}>
        <label htmlFor={id} className={labelClasses}>
          <p className={displayLabel ? "" : "sr-only"}>{labelText}</p>
        </label>
        <div className="input_wrapper">
          {leftIcon && (
            <span
              onClick={handleLeftIconInteraction}
              onTouchEnd={handleLeftIconInteraction}
              className={leftIconClasses}
              role={onLeftIconClick ? "button" : undefined}
              tabIndex={onLeftIconClick ? 0 : undefined}
              aria-label={onLeftIconClick ? "Left icon action" : undefined}
            >
              {leftIcon}
            </span>
          )}

          <input
            id={id}
            ref={ref}
            type={type}
            className={inputClasses}
            {...rest}
            autoComplete={autoComplete || "off"}
          />

          {rightIcon && (
            <span
              onClick={handleRightIconInteraction}
              onTouchEnd={handleRightIconInteraction}
              className={rightIconClasses}
              role={onRightIconClick ? "button" : undefined}
              tabIndex={onRightIconClick ? 0 : undefined}
              aria-label={onRightIconClick ? "Right icon action" : undefined}
            >
              {rightIcon}
            </span>
          )}

          {isLoading && <span className="loading_spinner"></span>}
          {isSuccess && <span className="input_success_icon"></span>}
        </div>

        {helperText && <div className="helper_text">{helperText}</div>}
        {error && <div className="error_text">{error}</div>}
      </div>
    )
  },
)
