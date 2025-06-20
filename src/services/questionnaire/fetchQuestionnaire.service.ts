// src/services/questionnaire/fetchQuestionnaireService.ts
import { api, QuestionnaireEndpoints } from "@/services"
import type { IResponseDTO, IQuestionnaireListItem, IQuestionsData, ICalculateProgress } from "@/types"
export interface IFetchQuestionnaireList {
  tag?: string
}
export const fetchQuestionnaireList = async ({
  tag = "initial_assessment",
}: IFetchQuestionnaireList): Promise<IQuestionnaireListItem[]> => {
  try {
    const questionnaireList = await api.authenticatedGet<IResponseDTO<IQuestionnaireListItem[]>>({
      endpoint: `${QuestionnaireEndpoints.QUESTIONNAIRE_LIST}?tag_name=${tag}`,
      config: {},
    })

    if (!questionnaireList["success"] || !questionnaireList.data) {
      throw new Error("Error fetching questionnaire list")
    }

    return questionnaireList.data
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch questionnaire list")
  }
}

export const fetchQuestionnaireQuestions = async ({ questionnaire_id }: { questionnaire_id: string }) => {
  try {
    const questions = await api.authenticatedGet<IResponseDTO<IQuestionsData>>({
      endpoint: `${QuestionnaireEndpoints.QUESTIONNAIRE_QUESTIONS}/${questionnaire_id}`,
      config: {},
    })
    if (!questions["success"]) {
      throw new Error("error fetching resource")
    }
    const { data } = questions
    return data
  } catch (error) {
    throw error
  }
}

export const submitResponses = async ({
  questionnaire_id,
  responseData,
}: {
  questionnaire_id: string
  responseData: any
}) => {
  try {
    const submitResponse = await api.put<IResponseDTO>({
      endpoint: `${QuestionnaireEndpoints.SUBMIT_QUESTIONNAIRE_RESPONSE}/${questionnaire_id}`,
      body: { questionnaire_id: questionnaire_id, response_data: responseData },
      config: {},
    })
    if (!submitResponse["success"]) {
      throw new Error("error fetching resource")
    }
    console.log(submitResponse)
    return submitResponse["success"]
  } catch (error) {
    throw error
  }
}

export const questionnaireTrackingHandler = async ({ total, completed }: ICalculateProgress) => {
  const leftOver = total - completed
  const percentage = total > 0 ? (completed / total) * 100 : 0
  return { leftOver, percentage }
}
