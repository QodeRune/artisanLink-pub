// src/views/assessment/AssessmentQuestion.tsx
import { useState, useEffect } from "react"
import { QUESTION_TYPE } from "@/core"
import type { IProcessedQuestion } from "@/types"
import { RenderOptions } from "./RenderOptions"
import { useQuestionnaireStore } from "@/store"
import { useQuestionnaireResponses } from "@/store"

export const RenderQuestionBlock = ({
  questionnaireId,
  isRequired = false,
  id,
  question,
  label,
  type,
  options,
}: IProcessedQuestion & { questionnaireId: string }) => {
  const { handleSetUserTextInput } = useQuestionnaireStore()

  // Get the current responses for this question
  const responses = useQuestionnaireResponses(questionnaireId, id)

  // Find the text input value from responses - ensure responses is an array
  const storedTextValue =
    (Array.isArray(responses) ? responses : []).find((r) => r.user_input_text !== undefined && !r.option_id)
      ?.user_input_text || ""

  // Local state for input value to prevent re-render issues
  const [localTextValue, setLocalTextValue] = useState(storedTextValue)

  // Sync local state with store value when store changes (e.g., when loading saved data)
  useEffect(() => {
    setLocalTextValue(storedTextValue)
  }, [storedTextValue])

  return (
    <div className="questionCard" key={id}>
      <label htmlFor={`question-${id}`}>
        <span className="labelNumber">
          {label}
          {isRequired && <span className="requiredMark">*</span>}
        </span>
        <p className="u-inline u-margin-inline-sm">{question}</p>
      </label>

      {type === QUESTION_TYPE.USER_TEXT_INPUT && (
        <input
          id={`question-${id}`}
          name={`question-${id}`}
          required={isRequired}
          className="inputField"
          value={localTextValue}
          onChange={(e) => setLocalTextValue(e.target.value)}
          onBlur={(e) => {
            // Update store when input loses focus
            handleSetUserTextInput({
              questionnaire_id: questionnaireId,
              question_id: id,
              text: e.target.value,
            })
          }}
          onKeyDown={(e) => {
            // Also update store on Enter key
            if (e.key === "Enter") {
              handleSetUserTextInput({
                questionnaire_id: questionnaireId,
                question_id: id,
                text: e.currentTarget.value,
              })
            }
          }}
        />
      )}
      {options && (
        <RenderOptions questionnaireId={questionnaireId} questionId={id} options={options} isRequired={isRequired} />
      )}
    </div>
  )
}
