import { QUESTION_TYPE } from "@/core"
import type { IProcessedQuestion } from "@/types"
import { RenderOptions } from "./RenderOptions"

export const RenderQuestionBlock = ({
  questionnaireId,
  isRequired = false,
  id,
  question,
  label,
  type,
  options,
}: IProcessedQuestion & { questionnaireId: string }) => {
  return (
    <div className="questionCard" key={id}>
      <label className="questionLabel" htmlFor={`question-${id}`}>
        <span className="labelNumber">
          {label}
          {isRequired && <span className="requiredMark">*</span>}
        </span>
        <span className="questionText">{question}</span>
      </label>

      {type === QUESTION_TYPE.USER_TEXT_INPUT && (
        <input id={`question-${id}`} name={`question-${id}`} required={isRequired} className="inputField" />
      )}
      {options && (
        <RenderOptions questionnaireId={questionnaireId} questionId={id} options={options} isRequired={isRequired} />
      )}
    </div>
  )
}
