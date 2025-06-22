// src/views/assessment/Assessment.tsx
import { useEffect, useMemo, useState, type FC, type FormEvent } from "react"
import { useQuestionnaireListStore, useQuestionnaireQuestions, useQuestionnaireStore } from "@/store"
import { processedQuestionsList } from "./processQuestionList"
import { submitResponses } from "@/services"
import { Timer } from "./Timer"
import { RenderQuestionBlock } from "./AssessmentQuestion"
import { FormInput } from "@/components"
import { CheckBoxConsent } from "@/core"

export const Assessment: FC<{ questionnaireId?: string; QUESTIONS_PER_BATCH?: number }> = ({
  questionnaireId = "4a1936c0-5e04-4384-b909-32ed124610bc",
  QUESTIONS_PER_BATCH = 10,
}) => {
  const { handleFetchAndUpdateQuestionsData, questionsData } = useQuestionnaireQuestions()
  const { handleUpdateQuestionnaireProgress, handleMarkQuestionnaireAsSubmitted } = useQuestionnaireListStore()
  const { responses } = useQuestionnaireStore()

  const fetchQuestions = async () => {
    await handleFetchAndUpdateQuestionsData({ questionnaire_id: questionnaireId })
  }
  if (!questionsData) {
    return <div>No questions data available</div>
  }

  const { questions, title, allotted_time } = questionsData
  const [currentBatch, setCurrentBatch] = useState(0)
  const [confirmSubmitChecked, setConfirmSubmitChecked] = useState(false)

  const _questions = processedQuestionsList({ questionsList: questions })
  const totalQuestions = questions.length
  const batchStartIndex = currentBatch * QUESTIONS_PER_BATCH
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_BATCH)
  const batchQuestions = _questions.slice(batchStartIndex, batchStartIndex + QUESTIONS_PER_BATCH)

  const answeredCount = useMemo(() => {
    return questions.filter((q) => (responses[questionnaireId]?.[q.id] || []).length > 0).length
  }, [responses, questionnaireId, questions])

  const handleNext = () => {
    if ((currentBatch + 1) * QUESTIONS_PER_BATCH < totalQuestions) {
      setCurrentBatch((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentBatch > 0) {
      setCurrentBatch((prev) => prev - 1)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log("Submitting responses", responses[questionnaireId], "\n", answeredCount, "\n", responses)
    try {
      const isSubmitted = await submitResponses({
        questionnaire_id: questionnaireId,
        responseData: responses[questionnaireId],
      })
      if (isSubmitted && questionnaireId) {
        handleMarkQuestionnaireAsSubmitted({ questionnaireId })
      }
      // TODO:: give feedback & maybe redirect to questions list page
    } catch (error) {
      throw new Error("submit failed")
    }
  }

  const handleTimeUp = () => {
    // Handle time up (e.g., auto-submit)
  }

  useEffect(() => {
    fetchQuestions()
    console.log(questionsData)
  }, [questionnaireId])

  useEffect(() => {
    if (questionnaireId && totalQuestions > 0) {
      handleUpdateQuestionnaireProgress({
        total: totalQuestions,
        completed: answeredCount,
        questionnaireId: questionnaireId,
      })
    }
  }, [answeredCount, totalQuestions, questionnaireId, handleUpdateQuestionnaireProgress])

  const QuestionnaireForm = () => {
    return (
      <form action="" className="assessment-form">
        {batchQuestions.map((_question) => (
          <RenderQuestionBlock
            isRequired={_question.isRequired}
            id={_question.id}
            questionnaireId={questionsData.id}
            question={_question.question}
            label={_question.label}
            type={_question.type}
            options={_question.options}
          />
        ))}
      </form>
    )
  }

  const ConfirmSUbmit = () => {
    return (
      <div className="nav-submit">
        <CheckBoxConsent id="terms-and-conditions" name="terms-and-conditions" />
      </div>
    )
  }
  return (
    <section className="assessment">
      <h1 className="u-section-title">{title}</h1>
      {allotted_time && <Timer initialSeconds={allotted_time} onTimeUp={handleTimeUp} />}
      <QuestionnaireForm />
      <ConfirmSUbmit />
    </section>
  )
}
