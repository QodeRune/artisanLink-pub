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
    (params: IUpdateResponseArgs) => {
      // Remove async
      return updateResponse(params)
    },
    [updateResponse],
  )

  const handleSetUserTextInput = useCallback(
    (params: ISetUserTextInput) => {
      // Remove async
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
    (params: string) => {
      // Remove async
      return getResponses(params)
    },
    [getResponses],
  )

  const handleResetResponses = useCallback(
    (params: string) => {
      // Remove async
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
