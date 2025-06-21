// src/store/slices/questionnaire/questionnaireList.slice.ts
import type { IAppState, IQuestionnaireList, IQuestionnaireListItem, IQuestionnaireListSlice } from "@/types"
import { fetchQuestionnaireList, questionnaireTrackingHandler } from "@/services"
import type { StateCreator } from "zustand"
import { CacheWrapper } from "@/services/storage/cacheWrapper"

const questionnaireCache = new CacheWrapper<IQuestionnaireListItem[]>({
  cacheName: "questionnaire-cache",
  options: {
    merge: (newData, existingData) => {
      if (!existingData) return newData
      const currentListMap = new Map(existingData.map((item) => [item.id, item]))
      return newData.map((newItem) => {
        const existingItem = currentListMap.get(newItem.id)
        return {
          ...newItem,
          progressTracking: newItem.progressTracking ?? existingItem?.progressTracking,
          isSubmitted: newItem.isSubmitted ?? existingItem?.isSubmitted,
        }
      })
    },
  },
})

export const createQuestionnaireListSlice: StateCreator<IAppState, [], [], IQuestionnaireListSlice> = (set, get) => ({
  isQuestionnaireListLoading: false,
  questionnaireListError: null,
  questionnaireList: {},
  questionnaireCategoryProgressTracking: {
    tag: "initial_assessment",
    totalQuestionnaireCount: 0,
    notSubmittedCount: 0,
    submittedCount: 0,
    percentageCompletion: 0,
  },

  setQuestionnaireList: async (questionnaires) => {
    const responses = get().responses || {}
    const questionsData = get().questionsData

    const updated: IQuestionnaireList = {}

    for (const [tag, list] of Object.entries(questionnaires)) {
      if (!list || !Array.isArray(list)) {
        updated[tag] = null
        continue
      }

      const enrichedList = await Promise.all(
        list.map(async (item) => {
          const questionnaireResponses = responses[item.id] || {}
          const completed = Object.values(questionnaireResponses).filter((res) => res.length > 0).length
          const total =
            questionsData?.id === item.id ? questionsData.questions.length : item.progressTracking?.total || 0
          const { leftOver, percentage } = await questionnaireTrackingHandler({ total, completed })

          return {
            ...item,
            progressTracking: { total, completed, leftOver, percentage },
          }
        }),
      )

      updated[tag] = enrichedList
    }

    set({ questionnaireList: updated })
  },

  fetchAndUpdateQuestionnaireList: async ({ tag = "initial assessment" }) => {
    try {
      set({ isQuestionnaireListLoading: true, questionnaireListError: null })

      const updatedList = await questionnaireCache.getOrFetchByTag(tag, () => fetchQuestionnaireList({ tag }))

      if (!updatedList) {
        throw new Error("Error fetching questionnaire list")
      }

      const responses = get().responses || {}
      const questionsData = get().questionsData

      const synchronizedList = await Promise.all(
        updatedList.map(async (item) => {
          const questionnaireResponses = responses[item.id] || {}
          const completed = Object.values(questionnaireResponses).filter((res) => res.length > 0).length
          const total =
            questionsData?.id === item.id ? questionsData.questions.length : item.progressTracking?.total || 0
          const { leftOver, percentage } = await questionnaireTrackingHandler({ total, completed })

          return {
            ...item,
            progressTracking: { total, completed, leftOver, percentage },
          }
        }),
      )

      const submittedCount = synchronizedList.filter((item) => item.isSubmitted).length
      const totalQuestionnaireCount = synchronizedList.length

      set({
        isQuestionnaireListLoading: false,
        questionnaireListError: null,
        questionnaireList: { [tag]: synchronizedList },
        questionnaireCategoryProgressTracking: {
          tag,
          totalQuestionnaireCount,
          notSubmittedCount: totalQuestionnaireCount - submittedCount,
          submittedCount,
          percentageCompletion: totalQuestionnaireCount > 0 ? (submittedCount / totalQuestionnaireCount) * 100 : 0,
        },
      })

      await questionnaireCache.updateByTag(tag, synchronizedList)
      return synchronizedList
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Fetch failed"
      set({ isQuestionnaireListLoading: false, questionnaireListError: errorMessage })
      throw new Error(errorMessage)
    }
  },

  getCurrentQuestionnaireList: ({ tag = "initial assessment" }) => get().questionnaireList[tag],

  updateQuestionnaireProgress: async ({ questionnaireId, total, completed }) => {
    const currentListMap = get().questionnaireList
    const tag = get().questionnaireCategoryProgressTracking.tag
    const currentList = currentListMap[tag]

    if (!currentList) return

    const { leftOver, percentage } = await questionnaireTrackingHandler({ total, completed })

    const updatedList = currentList.map((item) =>
      item.id === questionnaireId
        ? {
            ...item,
            progressTracking: { total, completed, leftOver, percentage },
          }
        : item,
    )

    set((state) => ({
      questionnaireList: {
        ...state.questionnaireList,
        [tag]: updatedList,
      },
    }))

    await questionnaireCache.updateByTag(tag, updatedList)
  },

  markQuestionnaireAsSubmitted: async ({ questionnaireId }) => {
    const currentListMap = get().questionnaireList
    const tag = get().questionnaireCategoryProgressTracking.tag
    const currentList = currentListMap[tag]

    if (!currentList) return

    const updatedList = currentList.map((item) => (item.id === questionnaireId ? { ...item, isSubmitted: true } : item))

    const submittedCount = updatedList.filter((item) => item.isSubmitted).length
    const totalQuestionnaireCount = updatedList.length

    set((state) => ({
      questionnaireList: {
        ...state.questionnaireList,
        [tag]: updatedList,
      },
      questionnaireCategoryProgressTracking: {
        ...state.questionnaireCategoryProgressTracking,
        totalQuestionnaireCount,
        submittedCount,
        notSubmittedCount: totalQuestionnaireCount - submittedCount,
        percentageCompletion: totalQuestionnaireCount > 0 ? (submittedCount / totalQuestionnaireCount) * 100 : 0,
      },
    }))

    get().resetResponses(questionnaireId)
    await questionnaireCache.updateByTag(tag, updatedList)
  },
})
