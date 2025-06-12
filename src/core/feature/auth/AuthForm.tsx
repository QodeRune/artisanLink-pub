// src/core/feature/auth/authForm.tsx
import { type FC, useState, useEffect } from "react" // Import useState and useEffect
import { FormInput } from "@/components/ui"
import { signUpFields, signInFields } from "./FormFields"
import type { FormField } from "@/types/ui"

export const AuthForm: FC<{ formFields?: FormField[]; login?: boolean }> = ({
  formFields,
  login: propLogin = true,
}) => {
  // Use useState for the 'login' state
  const [isLogin, setIsLogin] = useState(propLogin)

  // Use useEffect to update isLogin when the propLogin changes
  useEffect(() => {
    setIsLogin(propLogin)
  }, [propLogin])

  // Derive values from the 'isLogin' state
  const actionText = isLogin ? "Log In" : "Sign Up"
  const promptText = isLogin ? "Not Registered? " : "Already Signed up? "
  const promptLinkText = isLogin ? "Sign-up " : "Login "
  const _formFields = formFields || (isLogin ? signInFields : signUpFields)

  // Function to toggle between login and signup
  const toggleAuthMode = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent default link behavior
    setIsLogin((prevIsLogin) => !prevIsLogin)
  }

  return (
    <form action="" className="auth_form">
      <h1 className="u-text-heading-md">{actionText}</h1>
      {_formFields.map((field) => {
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
      <p className="body-text u-text-center">
        {promptText}
        <a href="" onClick={toggleAuthMode} className="text-link">
          {promptLinkText}
        </a>{" "}
      </p>
    </form>
  )
}
