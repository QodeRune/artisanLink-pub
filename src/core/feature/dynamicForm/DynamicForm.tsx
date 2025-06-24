// src/core/feature/dynamicForm/DynamicForm.tsx
import type { IFormField, FormProps } from "@/types"
import { useState, type FC } from "react"
import clsx from "clsx"

export const DynamicForm: FC<FormProps> = ({
  fields,
  onSubmit,
  className,
  submitButtonText = "Submit",
  title = "Personal Information",
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Style classes using your pattern
  const formClasses = clsx([className, "biodata-form", "u-bg-surface"])

  const formHeaderClasses = clsx(["biodata-form__header", "u-text-heading-md", "u-text-center", "u-padding-block-md"])

  const formBodyClasses = clsx(["biodata-form__body", "u-grid", "u-gap-md"])

  const fieldClasses = clsx(["biodata-form__field", "u-grid", "u-gap-sm"])

  const labelClasses = clsx(["biodata-form__label", "u-text-body-md", "u-bold-text"])

  const inputClasses = clsx(["biodata-form__input"])

  const textareaClasses = clsx(["biodata-form__textarea"])

  const selectClasses = clsx(["biodata-form__select"])

  const helperTextClasses = clsx(["biodata-form__helper-text", "u-text-body-sm", "u-text-muted"])

  const errorTextClasses = clsx(["biodata-form__error-text", "u-text-body-sm"])

  const submitButtonClasses = clsx([
    "biodata-form__submit-button",
    "u-padding-block-sm",
    "u-padding-inline-md",
    "u-text-body-md",
    "u-bold-text",
  ])

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateField = (field: IFormField, value: any): string => {
    if (field.required && (!value || value.toString().trim() === "")) {
      return `${field.labelText || field.name} is required`
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address"
      }
    }

    if (field.type === "url" && value) {
      try {
        new URL(value)
      } catch {
        return "Please enter a valid URL"
      }
    }

    if (field.minLength && value && value.length < field.minLength) {
      return `Minimum length is ${field.minLength} characters`
    }

    if (field.maxLength && value && value.length > field.maxLength) {
      return `Maximum length is ${field.maxLength} characters`
    }

    return ""
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}

    // Validate all fields
    fields.forEach((field) => {
      const error = validateField(field, formData[field.name])
      if (error) {
        newErrors[field.name] = error
      }
    })

    setErrors(newErrors)

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData)
    }
  }

  const renderField = (field: IFormField) => {
    const fieldValue = formData[field.name] || ""
    const fieldError = errors[field.name]

    const fieldWrapperClasses = clsx([fieldClasses, fieldError && "biodata-form__field--error"])

    return (
      <div key={field.id} className={fieldWrapperClasses}>
        {field.labelText && (
          <label htmlFor={field.id} className={labelClasses}>
            {field.labelText}
            {field.required && <span className="biodata-form__required-mark">*</span>}
          </label>
        )}

        {field.type === "textarea" ? (
          <textarea
            id={field.id}
            name={field.name}
            className={textareaClasses}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            readOnly={field.readOnly}
            minLength={field.minLength}
            maxLength={field.maxLength}
            rows={4}
          />
        ) : field.type === "select" ? (
          <select
            id={field.id}
            name={field.name}
            className={selectClasses}
            value={fieldValue}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            disabled={field.readOnly}
          >
            <option value="">Choose an option...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.labelText}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={field.id}
            name={field.name}
            type={field.type || "text"}
            className={inputClasses}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            readOnly={field.readOnly}
            min={field.min}
            max={field.max}
            minLength={field.minLength}
            maxLength={field.maxLength}
            pattern={field.pattern}
            autoComplete={field.autoComplete}
          />
        )}

        {fieldError && <span className={errorTextClasses}>{fieldError}</span>}

        {field.helperText && !fieldError && <span className={helperTextClasses}>{field.helperText}</span>}
      </div>
    )
  }

  return (
    <div className={formClasses}>
      {title && <header className={formHeaderClasses}>{title}</header>}

      <div className={formBodyClasses}>{fields.map(renderField)}</div>

      <div className="biodata-form__actions u-padding-block-start-md">
        <button type="button" className={submitButtonClasses} onClick={handleSubmit}>
          {submitButtonText}
        </button>
      </div>
    </div>
  )
}
