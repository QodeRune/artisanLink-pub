// src/store/slices/questionnaire.slice.ts
import type { StateCreator } from "zustand"
import type { IQuestionnaireResponseSlice, IAppState, IUpdateResponseArgs } from "@/types"
import { OPTION_TYPE } from "@/core"

export const createQuestionnaireResponseSlice: StateCreator<IAppState, [], [], IQuestionnaireResponseSlice> = (
  set,
  get,
) => ({
  responses: {},

  // Updated updateResponse method
  updateResponse: ({ questionnaireId, questionId, optionType, response, selectType }: IUpdateResponseArgs) => {
    set((state) => {
      const currentResponses = state.responses[questionnaireId]?.[questionId] || []
      let newResponses = [...currentResponses]

      const { option_id, sub_option_list, parent_select_type } = response
      console.log(
        "Processing response:",
        { option_id, sub_option_list, parent_select_type },
        { questionnaireId, questionId, optionType, selectType },
      )

      // Check if this option already exists in responses
      const existingResponseIndex = currentResponses.findIndex((r) => r.option_id === option_id)

      // Handle different option scenarios
      if (optionType === OPTION_TYPE.NESTED) {
        // For NESTED type, we want to remove the option if it exists
        if (existingResponseIndex > -1) {
          newResponses = currentResponses.filter((_, idx) => idx !== existingResponseIndex)
        }
      } else if (parent_select_type) {
        // This is a sub-option selection (the parent_select_type indicates we're dealing with sub-options)
        const targetOption = existingResponseIndex > -1 ? { ...currentResponses[existingResponseIndex] } : { option_id }

        const currentSubOptions = targetOption.sub_option_list || []

        // Handle sub-option selection based on select type (single or multi)
        if (selectType === "SINGLE_SELECT") {
          targetOption.sub_option_list = sub_option_list
        } else {
          // For multi-select, toggle the selected sub-option
          targetOption.sub_option_list = currentSubOptions.includes(sub_option_list![0])
            ? currentSubOptions.filter((id) => id !== sub_option_list![0])
            : [...currentSubOptions, ...sub_option_list!]
        }

        // Handle parent options based on their select type
        if (parent_select_type === "SINGLE_SELECT") {
          // If parent is single select, it replaces all other options
          newResponses = [targetOption]
        } else {
          // If parent is multi-select, update or add this option
          if (existingResponseIndex > -1) {
            newResponses[existingResponseIndex] = targetOption
          } else {
            newResponses.push(targetOption)
          }
        }
      } else {
        // This is a top-level option selection
        if (selectType === "SINGLE_SELECT") {
          // For single select, replace all existing options
          newResponses = [{ option_id, sub_option_list }]
        } else {
          // For multi-select, toggle the selected option
          if (existingResponseIndex > -1) {
            newResponses = newResponses.filter((_, idx) => idx !== existingResponseIndex)
          } else {
            newResponses.push({ option_id, sub_option_list })
          }
        }
      }

      return {
        responses: {
          ...state.responses,
          [questionnaireId]: {
            ...state.responses[questionnaireId],
            [questionId]: newResponses,
          },
        },
      }
    })
  },

  // Updated setUserTextInput method to handle integration with multi-select options
  setUserTextInput: ({ questionnaire_id, question_id, text, option_id = undefined }) => {
    set((state) => {
      const currentResponses = state.responses[questionnaire_id]?.[question_id] || []

      // If option_id is provided, we're dealing with a hybrid case (option with text input)
      if (option_id) {
        const optionIndex = currentResponses.findIndex((r) => r.option_id === option_id)

        if (optionIndex > -1) {
          // Update existing option with text input
          const updatedResponses = [...currentResponses]
          updatedResponses[optionIndex] = {
            ...updatedResponses[optionIndex],
            user_input_text: text,
          }
          return {
            responses: {
              ...state.responses,
              [questionnaire_id]: {
                ...state.responses[questionnaire_id],
                [question_id]: updatedResponses,
              },
            },
          }
        } else {
          // Add new option with text input
          return {
            responses: {
              ...state.responses,
              [questionnaire_id]: {
                ...state.responses[questionnaire_id],
                [question_id]: [...currentResponses, { option_id, user_input_text: text }],
              },
            },
          }
        }
      } else {
        // Standard text input handling (no associated option)
        const textResponseIndex = currentResponses.findIndex((r) => r.user_input_text !== undefined && !r.option_id)

        const newResponses =
          textResponseIndex > -1
            ? currentResponses.map((r, idx) => (idx === textResponseIndex ? { ...r, user_input_text: text } : r))
            : [...currentResponses, { user_input_text: text }]

        return {
          responses: {
            ...state.responses,
            [questionnaire_id]: {
              ...state.responses[questionnaire_id],
              [question_id]: newResponses,
            },
          },
        }
      }
    })
  },

  isOptionSelected: (questionnaireId, questionId, optionId) => {
    const responses = get().responses[questionnaireId]?.[questionId] || []
    return responses.some((r) => r.option_id === optionId || (r.sub_option_list || []).includes(optionId))
  },

  getResponses: (questionnaireId) => {
    return get().responses[questionnaireId]
  },

  resetResponses: (questionnaireId?: string) => {
    set((state) => {
      if (questionnaireId) {
        const { [questionnaireId]: _, ...rest } = state.responses
        return { responses: rest }
      }
      return { responses: {} }
    })
  },
})
