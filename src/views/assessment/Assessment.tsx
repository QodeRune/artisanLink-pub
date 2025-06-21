// src/views/assessment/Assessment.tsx
import { useEffect, type FC } from "react"
import { useQuestionnaireQuestions } from "@/store/hooks/questionnaire/useQuestionnaire.hook"

export const Assessment: FC<{ questionnaireId?: string }> = ({
  questionnaireId = "4a1936c0-5e04-4384-b909-32ed124610bc",
}) => {
  const { handleFetchAndUpdateQuestionsData, questionsData } = useQuestionnaireQuestions()

  const fetchQuestions = async () => {
    await handleFetchAndUpdateQuestionsData({ questionnaire_id: questionnaireId })
  }

  useEffect(() => {
    fetchQuestions()
    console.log(questionsData)
  }, [questionnaireId])
  return <section className="assessment"> Assessment </section>
}
