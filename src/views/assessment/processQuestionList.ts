// src/core/utils/process-questionnaire-questions.utils.ts
import { OPTION_SELECT_TYPE, sortByLabel } from "@/core"
import { useQuestionnaireStore } from "@/store/hooks"
import type {
  IProcessQuestionsList,
  IProcessOptionsList,
  IOption,
  SubmitDetails,
  TOptionSelectType,
  IOptionResponse,
  IProcessedOption,
  IProcessedQuestion,
} from "@/types"

export const processedOptionsList = ({
  // storageName,
  optionList,
  question_id,
  questionnaire_id,
  parentOption_id,
  parentSelectType = OPTION_SELECT_TYPE.SINGLE_SELECT,
}: IProcessOptionsList): IProcessedOption[] => {
  const { handleUpdateResponse, handleSetUserTextInput } = useQuestionnaireStore()

  // Handle option selection
  const handleSelect = (submitDetails: SubmitDetails) => {
    const { id, selectType, parentOptionId, questionId, questionnaireId, parentSelectType, optionType } = submitDetails

    // Determine the correct response structure based on whether this is a parent or child option
    let response: IOptionResponse

    if (parentOptionId && parentOptionId !== id) {
      // This is a sub-option selection
      response = {
        option_id: parentOptionId,
        parent_select_type: parentSelectType,
        sub_option_list: [id],
      }
    } else {
      // This is a top-level option selection
      response = {
        option_id: id,
      }
    }

    handleUpdateResponse({ questionnaireId, questionId, optionType, response, selectType })
  }

  // Handle text input for options that include user input
  const handleTextInput = (details: {
    questionnaireId: string
    questionId: string
    optionId?: string
    text: string
  }) => {
    handleSetUserTextInput({
      questionnaire_id: details.questionnaireId,
      question_id: details.questionId,
      text: details.text,
      option_id: details.optionId,
    })
  }

  const process = (
    options: IOption[],
    level: "top" | "sub",
    parentOption_id?: string,
    inheritedParentSelectType?: TOptionSelectType,
  ): IProcessedOption[] =>
    options.flatMap((option) => {
      const { id, label, option_value, option_type, select_type, sub_options = [] } = option

      const current: IProcessedOption = {
        id,
        label,
        level,
        parentOption_id,
        questionId: question_id,
        questionnaireId: questionnaire_id,
        selectType: select_type,
        optionType: option_type,
        optionValue: option_value,
        handleSelect,
        handleTextInput, // Add text input handler
        parentSelectType: inheritedParentSelectType,
      }

      const nested = option_type === "NESTED" && sub_options.length ? process(sub_options, "sub", id, select_type) : []

      return [current, ...nested]
    })

  return process(optionList, parentOption_id ? "sub" : "top", parentOption_id, parentSelectType)
}

export const processedQuestionsList = ({
  questionsList,
  storageName = "",
}: IProcessQuestionsList): IProcessedQuestion[] => {
  return questionsList
    .slice()
    .sort(sortByLabel)
    .map((question) => {
      const { id, is_required: isRequired, questionnaire_id, label, question: qText, type, options = [] } = question
      // console.log(id)

      const processedOptions =
        options.length > 0
          ? processedOptionsList({
              storageName,
              optionList: options,
              question_id: id,
              questionnaire_id,
            })
          : undefined

      return {
        id,
        isRequired,
        label,
        question: qText,
        type,
        options: processedOptions,
      }
    })
}
