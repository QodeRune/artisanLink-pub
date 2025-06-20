// src/types/model/questionnaire.model.types.ts
import type { OPTION_SELECT_TYPE, OPTION_TYPE, QUESTION_TYPE } from "@/core"

export type TOptionSelectType = (typeof OPTION_SELECT_TYPE)[keyof typeof OPTION_SELECT_TYPE]
export type TOptionType = (typeof OPTION_TYPE)[keyof typeof OPTION_TYPE]

export interface IOptionResponse {
  option_id?: string
  sub_option_list?: string[]
  user_input_text?: string
  parent_select_type?: TOptionSelectType
}

export type TQuestionResponses = {
  [questionId: string]: IOptionResponse[] // Updated to use IOptionResponse
}

export type TQuestionnaireResponses = {
  [questionnaireId: string]: TQuestionResponses
}

export interface IOption {
  id: string
  label: string
  option_value: string
  select_type: TOptionSelectType
  option_type: TOptionType
  sub_options?: IOption[]
}

export interface IProgressTracking {
  total?: number
  completed?: number
  leftOver?: number
  percentage?: number
}

export interface IQuestionnaireListItem {
  id: string
  title: string
  due_date?: string
  allotted_time?: string
  tag?: string
  access_date?: string
  tag_questionnaire_order?: string
  progressTracking?: IProgressTracking
  isSubmitted?: boolean
  [key: string]: unknown
}

export type TQuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE]

export interface IQuestionnaireQuestion {
  id: string
  questionnaire_id: string
  label: number | string
  question: string
  type: TQuestionType
  due_date?: string | null
  access_date?: string | null
  tag?: string | null
  category_tag?: string | null
  is_required: boolean
  options?: IOption[]
  [key: string]: any
}

export interface IQuestionsData extends IQuestionnaireListItem {
  questions: IQuestionnaireQuestion[]
}

// !process types
export interface IProcessQuestionsList {
  questionsList: IQuestionnaireQuestion[]
  storageName?: string
}

export interface IProcessOptionsList {
  storageName?: string
  optionList: IOption[]
  question_id: string
  questionnaire_id: string
  parentOption_id?: string
  parentSelectType?: TOptionSelectType
}

export type SubmitDetails = {
  questionnaireId: string
  questionId: string
  parentOptionId?: string
  optionType: TOptionType
  id: string
  selectType: TOptionSelectType
  parentSelectType?: TOptionSelectType
}

export interface ISubmitUserInputDetails {
  questionnaireId: string
  questionId: string
  optionId?: string
  text: string
}

// !process methods types
export interface IProcessedOption {
  id: string
  label: string
  optionValue: string
  selectType: TOptionSelectType
  optionType: TOptionType

  level: "top" | "sub"
  parentOption_id?: string
  questionId: string
  questionnaireId: string
  subOptions?: IProcessedOption[]
  handleSelect: (details: SubmitDetails) => void
  handleTextInput: (details: ISubmitUserInputDetails) => void
  parentSelectType?: TOptionSelectType
}

export interface IProcessedQuestion {
  id: string
  isRequired?: boolean
  question: string
  label: string | number
  type: TQuestionType
  options?: IProcessedOption[]
}
