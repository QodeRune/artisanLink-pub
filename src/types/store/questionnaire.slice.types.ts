// src/types/store/questionnaire.slice.types.ts
import type {
  TOptionType,
  TOptionSelectType,
  IOptionResponse,
  TQuestionResponses,
  TQuestionnaireResponses,
  IQuestionnaireListItem,
  IQuestionsData,
  IProgressTracking,
} from "../model"

export type RequireOnly<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export interface IUpdateResponseArgs {
  questionnaireId: string
  questionId: string
  optionType: TOptionType
  response: IOptionResponse
  selectType: TOptionSelectType
}

export interface IQuestionnaireResponseSlice {
  responses: TQuestionnaireResponses
  updateResponse: (updateResponseArgs: IUpdateResponseArgs) => void
  setUserTextInput: (props: { questionnaire_id: string; question_id: string; text: string; option_id?: string }) => void
  isOptionSelected: (questionnaireId: string, questionId: string, optionId: string) => boolean
  getResponses: (questionnaireId: string) => TQuestionResponses | undefined
  resetResponses: (questionnaireId?: string) => void
}

export type ICalculateProgress = RequireOnly<IProgressTracking, "total" | "completed">

export type IUpdateProgressTracking = ICalculateProgress & {
  questionnaireId: string
}

export interface IQuestionnaireCategoryProgressTracking {
  tag: string
  totalQuestionnaireCount: number
  notSubmittedCount: number
  submittedCount: number
  percentageCompletion: number
}

export interface IQuestionnaireListSlice {
  questionnaireList: IQuestionnaireListItem[] | null
  isQuestionnaireListLoading: boolean
  questionnaireListError: string | null
  questionnaireCategoryProgressTracking: IQuestionnaireCategoryProgressTracking
  setQuestionnaireList: (list: IQuestionnaireListItem[]) => Promise<void>
  fetchAndUpdateQuestionnaireList: (tag: string) => Promise<IQuestionnaireListItem[] | null>
  getCurrentQuestionnaireList: () => IQuestionnaireListItem[] | null
  updateQuestionnaireProgress: (arg: IUpdateProgressTracking) => Promise<void>
  markQuestionnaireAsSubmitted: (questionnaireId: string) => Promise<void>
}

export interface IQuestionnaireQuestionsSlice {
  questionsData: IQuestionsData | null
  isQuestionsDataLoading: boolean
  questionsDataError: string | null
  fetchAndUpdateQuestionsData: ({ questionnaire_id }: { questionnaire_id: string }) => Promise<boolean>
  getQuestionsData: () => IQuestionsData | null
}
