// src/views/assessment/OptionItem.tsx
import { useQuestionnaireStore } from "@/store"
import type { IOptionItemProps } from "@/types"

export const OptionItem = ({ option, subOptions = [], isRequired = false, ...rest }: IOptionItemProps) => {
  const { handleIsOptionSelected } = useQuestionnaireStore()
  const {
    handleSelect,
    id,
    selectType,
    parentOption_id: parentOptionId,
    questionId,
    questionnaireId,
    parentSelectType,
    optionType,
  } = option

  const selected = handleIsOptionSelected({ questionnaireId, questionId, optionId: option.id })
  const _submitDetails = {
    id,
    selectType,
    parentOptionId,
    questionId: rest.questionId ?? questionId,
    questionnaireId: rest.questionnaireId ?? questionnaireId,
    parentSelectType,
    optionType,
  }

  const handleChange = () => handleSelect(_submitDetails)

  return (
    <div className="optionItem u-gap-sm">
      <label />
      <input
        className="u-margin-inline-sm"
        type={option.selectType === "SINGLE_SELECT" ? "radio" : "checkbox"}
        name={_submitDetails.questionId}
        checked={selected}
        onChange={handleChange}
        required={isRequired}
      />
      {option.optionValue}
      {/* </label> */}

      {subOptions.length > 0 && selected && (
        <div className="subOptionGroup">
          {subOptions.map((sub) => (
            <OptionItem key={sub.id} questionnaireId={questionnaireId} questionId={questionId} option={sub} />
          ))}
        </div>
      )}
    </div>
  )
}
