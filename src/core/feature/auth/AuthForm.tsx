// src/core/feature/auth/authForm.tsx
import { type FC } from "react"
import { FormInput } from "@/components/ui"
import { signUpFields } from "./FormFields"
import type { FormField } from "@/types/ui"

export const AuthForm: FC<{ formFields?: FormField[] }> = ({ formFields = signUpFields }) => {
  return (
    <form action="" className="auth_form">
      {formFields.map((field) => {
        const { id, ...rest } = field
        return <FormInput key={id} id={id} {...rest} />
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
