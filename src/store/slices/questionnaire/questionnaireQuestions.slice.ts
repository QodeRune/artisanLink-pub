// src/store/slices/questionnaire/questionnaireQuestions.slice.ts
import type { StateCreator } from "zustand"
import type { IAppState, IQuestionnaireQuestionsSlice } from "@/types"
import { fetchQuestionnaireQuestions } from "@/services"

export const createQuestionnaireQuestionsSlice: StateCreator<IAppState, [], [], IQuestionnaireQuestionsSlice> = (
  set,
  get,
) => ({
  questionsData: null,
  isQuestionsDataLoading: false,
  questionsDataError: null,

  fetchAndUpdateQuestionsData: async ({ questionnaire_id }: { questionnaire_id: string }) => {
    try {
      set({ isQuestionsDataLoading: true, questionsDataError: null })

      const _questionsData = await fetchQuestionnaireQuestions({ questionnaire_id })
      if (!_questionsData) {
        throw new Error("Error fetching questions Data")
      }

      set({
        isQuestionsDataLoading: false,
        questionsDataError: null,
        questionsData: _questionsData,
      })

      return true
    } catch (error) {
      console.error(error)
      set({
        isQuestionsDataLoading: false,
        questionsDataError: error instanceof Error ? error.message : "Unknown error",
      })
      return false
    }
  },

  getQuestionsData: () => get().questionsData,
  // processQuestionsList: (questionListArgs: IProcessQuestionsList) => processedQuestionsList(questionListArgs),
})
