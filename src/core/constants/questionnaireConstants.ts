// src/core/constants/questionnaireConstants.ts
export const OPTION_SELECT_TYPE = {
  MULTI_SELECT: "MULTI_SELECT",
  SINGLE_SELECT: "SINGLE_SELECT",
} as const

export const OPTION_TYPE = {
  PREDEFINED: "PREDEFINED",
  USER_TEXT_INPUT: "USER_TEXT_INPUT",
  NESTED: "NESTED",
} as const

// Question
export const QUESTION_TYPE = {
  MULTI_CHOICE: "MULTI_CHOICE",
  NESTED_MULTI_CHOICE: "NESTED_MULTI_CHOICE",
  USER_TEXT_INPUT: "USER_TEXT_INPUT",
} as const
