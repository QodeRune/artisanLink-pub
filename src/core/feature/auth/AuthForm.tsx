// src/core/feature/auth/authForm.tsx
import { type FC } from "react"
import { FormInput } from "@/components/ui"
import { signUpFields } from "./FormFields"
import type { FormField } from "@/types/ui"

export const AuthForm: FC<{ formFields?: FormField[] }> = ({ formFields = signUpFields }) => {
  return (
    <form action="" className="auth_form">
      <h1 className="form_">Sign Up</h1>
      {formFields.map((field) => {
        const { id, iconRight: _rightIcon, iconLeft: _leftIcon, ...rest } = field
        const r_icon = _rightIcon && (
          <img src={_rightIcon.url} alt={_rightIcon.alt || ""} onClick={_rightIcon.onClick} />
        )
        const l_icon = _leftIcon && <img src={_leftIcon?.url} alt={_leftIcon?.alt || ""} />

        return (
          <FormInput
            key={id}
            id={id}
            {...rest}
            rightIcon={r_icon}
            leftIcon={l_icon}
            onLeftIconClick={_leftIcon?.onClick}
            onRightIconClick={_rightIcon?.onClick}
          />
        )
      })}
      <input type="button" value="submit" className="form_input submit_button" />
    </form>
  )
}

export const AuthPage: FC = () => {
  return (
    <div className="auth_page">
      <AuthForm />
    </div>
  )
}
