// src/components/ui/FormInput.tsx
import { forwardRef } from "react"
import type { IInputProps } from "@/types/ui"
import clsx from "clsx"

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

    // Fixed: Correct class names for left and right icons
    const leftIconClasses = clsx("icon_left", "input_icon", `${onLeftIconClick ? "clickable" : ""}`)

    const rightIconClasses = clsx("icon_right", "input_icon", `${onRightIconClick ? "clickable" : ""}`)

    return (
      <div className={containerClasses}>
        <label htmlFor={id} className={labelClasses}>
          {labelText}
        </label>
        <div className="input_wrapper">
          {leftIcon && (
            <span onClick={onLeftIconClick} className={leftIconClasses}>
              {leftIcon}
            </span>
          )}

          <input id={id} ref={ref} type={type} className={inputClasses} {...rest} autoComplete="" />

          {rightIcon && (
            <span onClick={onRightIconClick} className={rightIconClasses}>
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
