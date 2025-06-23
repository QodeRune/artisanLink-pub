// src/core/feature/consent/CheckBoxConsent.tsx
import { FormInput } from "@/components"
import clsx from "clsx"
import type { FC } from "react"

export interface ICheckBoxConsent {
  id: string
  name: string
  onLinkClick?: (...args: unknown[]) => unknown
  toggleCheckbox?: (...args: unknown[]) => unknown
  linkText?: string
  readonly?: boolean
  required?: boolean
  labelText?: string
  checkboxClassNames?: string
  linkClassNames?: string
}

export const CheckBoxConsent: FC<ICheckBoxConsent> = ({
  id = "watch_video_confirmation",
  name = "watch_video_confirmation",
  onLinkClick,
  toggleCheckbox,
  linkText,
  readonly = false,
  required = true,
  labelText = "Yes I have completed and understood the video content",
  checkboxClassNames,
  linkClassNames,
}) => {
  const checkboxClasses = clsx([checkboxClassNames, "checkbox-consent", "checkbox_consent"])
  const linkClassName = clsx([linkClassNames, "button-text"])

  return (
    <span className={checkboxClasses}>
      <FormInput
        onChange={toggleCheckbox}
        id={id}
        name={name}
        labelText={labelText}
        type={"checkbox"}
        readOnly={readonly}
        required={required}
      />
      {linkText && (
        <a className={linkClassName} onClick={onLinkClick}>
          {linkText}
        </a>
      )}
    </span>
  )
}
