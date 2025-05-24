// src/core/feature/auth/FormFields.ts
export const signInFields = {
  email: "",
  password: "",
}

export const signUpFields = {
  firstName: "first name",
  lastName: "last name",
  phone: "phone number",
  ...signInFields,
}
