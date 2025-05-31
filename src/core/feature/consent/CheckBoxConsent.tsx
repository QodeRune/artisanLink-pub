// src/core/feature/consent/CheckBoxConsent.tsx
import { FormInput } from "@/components"
import type { FC } from "react"

export const CheckBoxConsent: FC = () => {
  return (
    <span className="checkbox_consent">
      <FormInput
        id={"watch_video_confirmation"}
        name={"watch_video_confirmation"}
        labelText={"Yes I have completed and understood the video content"}
        type={"checkbox"}
        readOnly={false}
        required={true}
      />
      <a className="consent_text">Proceed</a>
    </span>
  )
}
