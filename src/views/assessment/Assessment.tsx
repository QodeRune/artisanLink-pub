// src/views/assessment/Assessment.tsx
import { useEffect, useMemo, useState, type FC, type FormEvent } from "react"
import { useQuestionnaireListStore, useQuestionnaireStore } from "@/store"
import { processedQuestionsList } from "./processQuestionList"
import { submitResponses } from "@/services"
import { Timer } from "./Timer"
import { RenderQuestionBlock } from "./AssessmentQuestion"
import { FormButton } from "@/components"
import { CheckBoxConsent, useToast } from "@/core"
import type { IQuestionsData } from "@/types"
import type { TCloseAssessmentFn } from "@/types" // 🆕

export const Assessment: FC<{
  questionnaireId: string
  questionsData: IQuestionsData | null
  QUESTIONS_PER_BATCH?: number
  closeAssessment?: TCloseAssessmentFn
}> = ({ questionnaireId, questionsData, QUESTIONS_PER_BATCH = 10, closeAssessment }) => {
  const { addToast } = useToast()
  const { handleUpdateQuestionnaireProgress, handleMarkQuestionnaireAsSubmitted } = useQuestionnaireListStore()
  const { responses } = useQuestionnaireStore()
  const [currentBatch, setCurrentBatch] = useState(0)
  const [confirmSubmitChecked, setConfirmSubmitChecked] = useState(false)

  const _questions = questionsData
    ? processedQuestionsList({ questionsList: questionsData.questions, storageName: questionnaireId })
    : []
  const totalQuestions = questionsData?.questions.length || 0
  const batchStartIndex = currentBatch * QUESTIONS_PER_BATCH
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_BATCH)
  const batchQuestions = _questions.slice(batchStartIndex, batchStartIndex + QUESTIONS_PER_BATCH)

  const answeredCount = useMemo(() => {
    if (!questionsData) return 0
    return questionsData.questions.filter((q) => (responses[questionnaireId]?.[q.id] || []).length > 0).length
  }, [responses, questionnaireId, questionsData])

  useEffect(() => {
    if (questionnaireId && totalQuestions > 0) {
      handleUpdateQuestionnaireProgress({
        total: totalQuestions,
        completed: answeredCount,
        questionnaireId,
      })
    }
  }, [answeredCount, totalQuestions, questionnaireId, handleUpdateQuestionnaireProgress])

  if (!questionsData) return <div>No questions data available</div>

  const { title, allotted_time } = questionsData

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

    if (!confirmSubmitChecked) {
      addToast({
        title: "",
        message: "Submit blocked: Confirm not checked",
        type: "warning",
        size: "md",
        position: "top-right",
        duration: 3000,
      })
      return
    }

    try {
      const isSubmitted = await submitResponses({
        questionnaire_id: questionnaireId,
        responseData: responses[questionnaireId],
      })

      if (isSubmitted && questionnaireId) {
        handleMarkQuestionnaireAsSubmitted({ questionnaireId })
        closeAssessment?.({ success: true })
      } else {
        closeAssessment?.({ success: false })
      }
    } catch (error) {
      console.error("Submit failed:", error)
      closeAssessment?.({ success: false })
    }
  }

  const handleTimeUp = () => {
    console.log("Time up!")
    // Auto-submit or prompt if needed
  }

  const BatchNav: FC = () => (
    <div className="u-flex u-place-items-center u-gap-sm">
      <button onClick={handlePrevious} disabled={currentBatch === 0}>
        Previous
      </button>
      <span className="progress">
        Page {currentBatch + 1}/{totalPages}
      </span>
      <button onClick={handleNext} disabled={(currentBatch + 1) * QUESTIONS_PER_BATCH >= totalQuestions}>
        Next →
      </button>
    </div>
  )

  const ConfirmSubmit: FC = () => (
    <div className="nav-submit u-flex u-place-items-center u-gap-sm">
      <CheckBoxConsent
        toggleCheckbox={() => setConfirmSubmitChecked((prev) => !prev)}
        id="terms-and-conditions"
        name="terms-and-conditions"
        labelText="Confirm Submit Action"
        checked={confirmSubmitChecked}
      />
      <FormButton buttonClassName="button-text" disabled={!confirmSubmitChecked} type="submit" />
    </div>
  )

  const QuestionnaireForm: FC = () => (
    <form action="" className="assessment-form u-grid u-gap-md" onSubmit={handleSubmit}>
      {batchQuestions.map((_question) => (
        <RenderQuestionBlock
          key={_question.id}
          isRequired={_question.isRequired}
          id={_question.id}
          questionnaireId={questionsData.id}
          question={_question.question}
          label={_question.label}
          type={_question.type}
          options={_question.options}
        />
      ))}
      <BatchNav />
      <ConfirmSubmit />
    </form>
  )

  return (
    <section className="assessment padding-block-md u-padding-inline-md">
      <h1 className="u-section-title">{title}</h1>
      {allotted_time && <Timer initialSeconds={allotted_time} onTimeUp={handleTimeUp} />}
      <QuestionnaireForm />
    </section>
  )
}
