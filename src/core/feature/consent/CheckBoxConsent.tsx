// src/core/feature/consent/CheckBoxConsent.tsx
import { FormInput } from "@/components"
import clsx from "clsx"
import type { FC } from "react"

export interface ICheckBoxConsent {
  id: string
  name: string
  onLinkClick?: () => boolean | void
  toggleCheckbox?: () => void
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
  linkText = "Proceed",
  readonly = false,
  required = true,
  labelText = "Yes I have completed and understood the video content",
  checkboxClassNames,
  linkClassNames,
}) => {
  const checkboxClasses = clsx([checkboxClassNames, "checkbox-consent", "checkbox_consent"])
  const linkClassName = clsx([linkClassNames, "checkbox-consent", "checkbox_consent"])

  return (
    <span className={checkboxClasses}>
      <FormInput id={id} name={name} labelText={labelText} type={"checkbox"} readOnly={readonly} required={required} />
      <a className={linkClassName} onClick={onLinkClick}>
        {linkText}
      </a>
    </span>
  )
}
