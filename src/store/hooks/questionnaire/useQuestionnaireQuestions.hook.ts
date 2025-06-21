// src/store/hooks/questionnaire/useQuestionnaireQuestions.hook.ts
import { useCallback } from "react"
import { useAppStore } from "../../app.store"

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
