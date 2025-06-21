// src/store/hooks/questionnaire/useQuestionnaire.hook.ts
import { useCallback } from "react"
import { useAppStore } from "../../app.store"
import type { IIsOptionSelected, ISetUserTextInput, IUpdateResponseArgs } from "@/types"

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
    (params: IIsOptionSelected) => {
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
