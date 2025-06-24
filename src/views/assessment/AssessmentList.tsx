import { useEffect, useRef, type FC } from "react"
import { ArticleItemCard } from "@/components"
import { useQuestionnaireListStore, useQuestionnaireQuestions } from "@/store"
import type { IQuestionnaireListTag } from "@/types"
import { useToast, useModal } from "@/core"
import { Assessment } from "./Assessment"
// import { useAppStore } from "@/store" // Import useAppStore for fetch

export const AssessmentList: FC<IQuestionnaireListTag> = ({ tag = "Initial Assessment", pageIntro }) => {
  const { openModal } = useModal()
  const { questionsData, handleFetchAndUpdateQuestionsData, handleGetQuestionsData } = useQuestionnaireQuestions()

  const {
    handleFetchAndUpdateQuestionnaireList,
    questionnaireList: _questionnaireList,
    questionnaireListError,
  } = useQuestionnaireListStore()

  const questionnaireList = _questionnaireList[tag]
  const { addToast } = useToast()
  const hasFetchedRef = useRef(false)
  // const fetchAndUpdateQuestionsData = useAppStore((state) => state.fetchAndUpdateQuestionsData) // Get fetch function

  const getQuestionList = async () => {
    try {
      await handleFetchAndUpdateQuestionnaireList({ tag })
      addToast({
        title: "",
        message: "Questionnaire Fetch Success!",
        type: "success",
        size: "md",
        position: "top-right",
        duration: 3000,
      })
    } catch (err) {
      addToast({
        title: "",
        message: `${err}`,
        type: "error",
        size: "md",
        position: "top-right",
        duration: 3000,
      })
    }
  }

  useEffect(() => {
    if (!hasFetchedRef.current && !questionnaireList?.length) {
      hasFetchedRef.current = true
      getQuestionList()
    }
  }, [handleFetchAndUpdateQuestionnaireList, tag])

  const openAssessment = async (id: string) => {
    try {
      const fetchQuestionnaire = await handleFetchAndUpdateQuestionsData({ questionnaire_id: id })
      if (fetchQuestionnaire) {
        console.log("Fetched questionsData for id:", id, questionsData)
        const _questionsData = await handleGetQuestionsData()
        openModal(<Assessment questionnaireId={id} questionsData={_questionsData} />)
      }
    } catch (error) {
      addToast({
        title: "",
        message: "Failed to fetch questions",
        type: "error",
        size: "md",
        position: "top-right",
        duration: 3000,
      })
    }
  }

  const AssessmentIntro: FC = () => {
    return (
      <div className="u-text-center article-page-intro padding-inline-lg padding-block-md">
        <h1 className="u-text-heading-lg">Ready when you are! Take these Assessment</h1>
        <p className="u-text-body-lg">These assessments help reveal your best fit and behavior style</p>
      </div>
    )
  }

  const Questionnaires: FC = () => {
    if (questionnaireListError) {
      return (
        <div className="u-text-center u-padding-block-md">
          <p className="u-text-body-md u-text-danger">Error: {questionnaireListError}</p>
          <button onClick={getQuestionList} className="retry-button">
            Retry
          </button>
        </div>
      )
    }

    if (!questionnaireList || questionnaireList.length === 0) {
      return (
        <div className="u-text-center ">
          <p className="u-text-body-md">No assessments available at the moment.</p>
        </div>
      )
    }

    return (
      <section className="grid-autofill u-padding-block-xs padding-inline-lg scroll-y">
        {questionnaireList.map((item) => (
          <ArticleItemCard
            onClick={() => {
              console.log(item.id)
              openAssessment(item.id)
            }}
            key={item.id}
            title={item.title}
            subTitle={item.tag_questionnaire_order || item.tag}
            metaList={[
              { title: "Access date", body: item.access_date || "N/A" },
              { title: "Due date", body: item.due_date || "N/A" },
              { title: "Estimated time", body: item.allotted_time || "N/A" },
            ]}
          />
        ))}
      </section>
    )
  }

  const PageIntro = () => pageIntro ?? <AssessmentIntro />

  return (
    <section className="grid-section scroll-y u-padding-block-end-sm .u-padding-bottom-sm article-card-item-list-page">
      <PageIntro />
      <Questionnaires />
    </section>
  )
}
