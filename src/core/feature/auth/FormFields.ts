// src/core/feature/auth/FormFields.ts
import type { FormField } from "@/types/ui"

export const signInFields: FormField[] = [
  {
    id: "email",
    name: "email",
    autoComplete: "email",
    labelText: "Email Address",
    type: "email",
    placeholder: "your@email.com",
    required: true,
    helperText: "",
    readOnly: false,
  },
  {
    id: "password",
    name: "password",
    autoComplete: "current-password",
    labelText: "Password",
    type: "password",
    placeholder: "Choose a strong password",
    required: true,
    minLength: 8,
    helperText: "Password should be at least 8 characters",
    readOnly: false,
  },
]

export const signUpFields: FormField[] = [
  {
    id: "first_name",
    name: "first_name",
    autoComplete: "given-name",
    labelText: "First Name",
    type: "text",
    readOnly: false,
    placeholder: "First Name",
    required: true,
    minLength: 3,
    helperText: "Please enter your first name",
    iconLeft: { url: "/svg/firstName.svg", alt: "first name" },
  },
  {
    id: "last_name",
    name: "last_name",
    autoComplete: "family-name",
    labelText: "Last Name",
    type: "text",
    readOnly: false,
    placeholder: "Last Name",
    required: true,
    minLength: 3,
    helperText: "Please enter your last name",
    iconLeft: { url: "/svg/firstName.svg", alt: "last name" },
  },
  {
    id: "email",
    name: "email",
    autoComplete: "email",
    labelText: "Email",
    type: "email",
    placeholder: "email",
    required: true,
    helperText: "your-email@email.com",
    readOnly: false,
    iconLeft: { url: "/svg/email.svg", alt: "email" },
  },
  {
    id: "password",
    name: "password",
    autoComplete: "new-password",
    labelText: "Password",
    type: "password",
    placeholder: "Password",
    required: true,
    minLength: 8,
    helperText: "Password should be at least 8 characters",
    readOnly: false,
    iconLeft: { url: "/svg/passwordClosed.svg", alt: "password" },
    iconRight: {
      url: "/svg/eyeVisible.svg",
      alt: "toggle hide password",
      onClick: () => {
        console.log("password")
        return true
      },
    },
  },
  {
    id: "confirm-password",
    name: "confirmPassword",
    autoComplete: "new-password",
    labelText: "Confirm Password",
    type: "password",
    placeholder: "Confirm password",
    required: true,
    readOnly: false,
    iconLeft: { url: "/svg/passwordClosed.svg", alt: "confirm password" },
    iconRight: {
      url: "/svg/eyeVisible.svg",
      alt: "toggle hide password",
      onClick: () => {
        console.log("password")
        return true
      },
    },
  },
]
