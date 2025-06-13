// src/core/feature/auth/AuthForm.tsx
import { type FC, useState, useEffect, type MouseEvent, useCallback } from "react"
import { FormInput } from "@/components/ui"
import { signUpFields, signInFields } from "./FormFields"
import type { IFormField } from "@/types/ui"
import { useAuthHook } from "@/store"
import type { IAuthCredentials, IFormErrors, IFormState, ISignUpData } from "@/types"

export const AuthForm: FC<{ formFields?: IFormField[]; login?: boolean }> = ({
  formFields,
  login: propLogin = true,
}) => {
  const [isLogin, setIsLogin] = useState(propLogin)
  const [formData, setFormData] = useState<IFormState>({})
  const [formErrors, setFormErrors] = useState<IFormErrors>({})
  const [passwordVisibility, setPasswordVisibility] = useState<{ [key: string]: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleLogin, handleSignup } = useAuthHook()

  useEffect(() => {
    setIsLogin(propLogin)
    // Reset form when switching between login/signup
    setFormData({})
    setFormErrors({})
    setPasswordVisibility({})
  }, [propLogin])

  // Derive values from the 'isLogin' state
  const actionText = isLogin ? "Log In" : "Sign Up"
  const promptText = isLogin ? "Not Registered? " : "Already Signed up? "
  const promptLinkText = isLogin ? "Sign-up " : "Login "
  const _formFields = formFields || (isLogin ? signInFields : signUpFields)

  // Handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))

      // Clear error when user starts typing
      if (formErrors[name]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [formErrors],
  )

  // Toggle password visibility
  const togglePasswordVisibility = useCallback((fieldName: string) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }))
  }, [])

  // Validate form
  const validateForm = useCallback((): boolean => {
    const errors: IFormErrors = {}

    _formFields.forEach((field) => {
      const value = formData[field.name]

      // Required field validation
      if (field.required && (!value || (typeof value === "string" && value.trim() === ""))) {
        errors[field.name] = `${field.labelText} is required`
        return
      }

      // Type-specific validation
      if (value && typeof value === "string") {
        // Email validation
        if (field.type === "email" && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            errors[field.name] = "Please enter a valid email address"
          }
        }

        // Minimum length validation
        if (field.minLength && value.length < field.minLength) {
          errors[field.name] = `${field.labelText} must be at least ${field.minLength} characters`
        }

        // Password confirmation validation
        if (field.name === "confirmPassword" && value !== formData.password) {
          errors[field.name] = "Passwords do not match"
        }
      }
    })

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [_formFields, formData])

  // Function to toggle between login and signup
  const toggleAuthMode = (e: MouseEvent) => {
    e.preventDefault()
    setIsLogin((prev) => !prev)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (isLogin) {
        const credentials: IAuthCredentials = {
          email: formData.email as string,
          password: formData.password as string,
        }
        await handleLogin(credentials)
      } else {
        const signupData: ISignUpData = {
          first_name: formData.first_name as string,
          last_name: formData.last_name as string,
          email: formData.email as string,
          password: formData.password as string,
        }
        await handleSignup(signupData)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      // Handle submission errors here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="auth_form" onSubmit={handleSubmit}>
      <h1 className="u-text-heading-md">{actionText}</h1>

      {_formFields.map((field) => {
        const { id, iconRight: _rightIcon, iconLeft: _leftIcon, ...rest } = field
        const isPasswordField = field.type === "password"
        const isVisible = passwordVisibility[field.name]
        const currentType = isPasswordField && isVisible ? "text" : field.type

        // Handle left icon
        const l_icon = _leftIcon && <img src={_leftIcon.url} alt={_leftIcon.alt || ""} />

        // Handle right icon (with password toggle functionality)
        const r_icon = _rightIcon && (
          <img
            src={isPasswordField ? (isVisible ? "/svg/eyeHidden.svg" : "/svg/eyeVisible.svg") : _rightIcon.url}
            alt={_rightIcon.alt || ""}
          />
        )

        // Right icon click handler
        const handleRightIconClick = () => {
          if (isPasswordField) {
            togglePasswordVisibility(field.name)
          } else if (_rightIcon?.onClick) {
            _rightIcon.onClick()
          }
        }

        return (
          <FormInput
            key={id}
            id={id}
            {...rest}
            type={currentType}
            value={(formData[field.name] as string) || ""}
            error={formErrors[field.name]}
            rightIcon={r_icon}
            leftIcon={l_icon}
            onLeftIconClick={_leftIcon?.onClick}
            onRightIconClick={handleRightIconClick}
            onChange={handleInputChange}
            isLoading={isSubmitting}
          />
        )
      })}

      <button type="submit" className="form_input submit_button" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      <p className="body-text u-text-center">
        {promptText}
        <a href="#" onClick={toggleAuthMode} className="text-link">
          {promptLinkText}
        </a>
      </p>
    </form>
  )
}
