// src/store/hooks/questionnaire/useQuestionnaireResponses.hook.ts
import { useAppStore } from "../../app.store"

// Specific selector for components
export const useQuestionnaireResponses = (questionnaireId: string, questionId?: string) => {
  return useAppStore((state) =>
    questionId ? state.responses[questionnaireId]?.[questionId] : state.responses[questionnaireId],
  )
}
