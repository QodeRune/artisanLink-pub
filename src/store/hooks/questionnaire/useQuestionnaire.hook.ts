// src/store/hooks/questionnaire/useQuestionnaire.hook.ts
import { useCallback } from "react"
import { useAppStore } from "../../app.store"
import type {
  IIsOptionSelected,
  ISetUserTextInput,
  IUpdateProgressTracking,
  IUpdateResponseArgs,
  IQuestionnaireListTag,
  ISubmittedQuestionnaire,
  IQuestionnaireList,
} from "@/types"

export const useQuestionnaireStore = () => {
  const responses = useAppStore((state) => state.responses)
  const updateResponse = useAppStore((state) => state.updateResponse)
  const setUserTextInput = useAppStore((state) => state.setUserTextInput)
  const isOptionSelected = useAppStore((state) => state.isOptionSelected)
  const getResponses = useAppStore((state) => state.getResponses)
  const resetResponses = useAppStore((state) => state.resetResponses)

  const handleUpdateResponse = useCallback(
    async (params: IUpdateResponseArgs) => {
      return updateResponse(params)
    },
    [updateResponse],
  )
  const handleSetUserTextInput = useCallback(
    async (params: ISetUserTextInput) => {
      return setUserTextInput(params)
    },
    [setUserTextInput],
  )
  const handleIsOptionSelected = useCallback(
    async (params: IIsOptionSelected) => {
      return isOptionSelected(params)
    },
    [isOptionSelected],
  )
  const handleGetResponses = useCallback(
    async (params: string) => {
      return getResponses(params)
    },
    [getResponses],
  )
  const handleResetResponses = useCallback(
    async (params: string) => {
      return resetResponses(params)
    },
    [resetResponses],
  )

  return {
    responses,
    handleUpdateResponse,
    handleSetUserTextInput,
    handleIsOptionSelected,
    handleGetResponses,
    handleResetResponses,
  }
}

// Specific selector for components
export const useQuestionnaireResponses = (questionnaireId: string, questionId?: string) => {
  return useAppStore((state) =>
    questionId ? state.responses[questionnaireId]?.[questionId] : state.responses[questionnaireId],
  )
}

// questionnaire list
export const useQuestionnaireListStore = () => {
  const questionnaireCategoryProgressTracking = useAppStore((state) => state.questionnaireCategoryProgressTracking)
  const isQuestionnaireListLoading = useAppStore((state) => state.isQuestionnaireListLoading)
  const questionnaireListError = useAppStore((state) => state.questionnaireListError)
  const questionnaireList = useAppStore((state) => state.questionnaireList)

  const setQuestionnaireList = useAppStore((state) => state.setQuestionnaireList)
  const fetchAndUpdateQuestionnaireList = useAppStore((state) => state.fetchAndUpdateQuestionnaireList)
  const getQuestionnaireList = useAppStore((state) => state.getCurrentQuestionnaireList)
  const updateQuestionnaireProgress = useAppStore((state) => state.updateQuestionnaireProgress)
  const markQuestionnaireAsSubmitted = useAppStore((state) => state.markQuestionnaireAsSubmitted)

  const handleSetQuestionnaireList = useCallback(
    async (param: IQuestionnaireList) => {
      return await setQuestionnaireList(param)
    },
    [setQuestionnaireList],
  )

  const handleFetchAndUpdateQuestionnaireList = useCallback(
    async ({ tag }: IQuestionnaireListTag) => {
      return await fetchAndUpdateQuestionnaireList({ tag })
    },
    [fetchAndUpdateQuestionnaireList],
  )

  const handleGetQuestionnaireList = useCallback(
    (param: { tag?: string }) => {
      return getQuestionnaireList(param)
    },
    [getQuestionnaireList],
  )

  const handleUpdateQuestionnaireProgress = useCallback(
    async (param: IUpdateProgressTracking) => {
      return await updateQuestionnaireProgress(param)
    },
    [updateQuestionnaireProgress],
  )

  const handleMarkQuestionnaireAsSubmitted = useCallback(
    async (questionnaireId: ISubmittedQuestionnaire) => {
      return markQuestionnaireAsSubmitted(questionnaireId)
    },
    [markQuestionnaireAsSubmitted],
  )

  return {
    questionnaireCategoryProgressTracking,
    isQuestionnaireListLoading,
    questionnaireListError,
    questionnaireList,
    handleSetQuestionnaireList,
    handleFetchAndUpdateQuestionnaireList,
    handleGetQuestionnaireList,
    handleUpdateQuestionnaireProgress,
    handleMarkQuestionnaireAsSubmitted,
  }
}

export const useQuestionnaireQuestions = () => {
  const fetchAndUpdateQuestionsData = useAppStore((state) => state.fetchAndUpdateQuestionsData)
  const getQuestionsData = useAppStore((state) => state.getQuestionsData)
  const questionsData = useAppStore((state) => state.questionsData)
  const questionsDataError = useAppStore((state) => state.questionsDataError)
  const isQuestionsDataLoading = useAppStore((state) => state.isQuestionsDataLoading)

  const handleFetchAndUpdateQuestionsData = useCallback(
    async (params: { questionnaire_id: string }) => {
      return fetchAndUpdateQuestionsData(params)
    },
    [fetchAndUpdateQuestionsData],
  )

  const handleGetQuestionsData = useCallback(async () => {
    return getQuestionsData()
  }, [getQuestionsData])

  return {
    questionsData,
    questionsDataError,
    isQuestionsDataLoading,
    handleFetchAndUpdateQuestionsData,
    handleGetQuestionsData,
  }
}
