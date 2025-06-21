// src/store/hooks/questionnaire/useQuestionnaireListStore.hook.ts
import { useCallback } from "react"
import { useAppStore } from "../../app.store"
import type {
  IUpdateProgressTracking,
  IQuestionnaireListTag,
  ISubmittedQuestionnaire,
  IQuestionnaireList,
} from "@/types"

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
