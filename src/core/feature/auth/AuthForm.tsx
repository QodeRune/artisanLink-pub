// src/core/feature/auth/authForm.tsx
import { type FC } from "react"
import { FormInput } from "@/components/ui"
import { signUpFields } from "./FormFields"
import type { FormField } from "@/types/ui"

export const AuthForm: FC<{ formFields?: FormField[] }> = ({ formFields = signUpFields }) => {
  return (
    <form action="" className="signup_form">
      {formFields.map((field) => {
        const { id, ...rest } = field
        return <FormInput id={id} {...rest} />
      })}
    </form>
  )
}

export const AuthPage: FC = () => {
  return <AuthForm />
}
