import type { FC } from "react"
import { ArticleItemCard } from "@/components"

export const AssessmentList: FC = () => {
  const PageIntro = () => {
    return (
      <div className="u-text-center article-page-intro padding-inline-lg padding-block-md">
        <h1 className="u-text-heading-lg">Ready when you are! Take these Assessment</h1>
        <p className="u-text-body-lg">These assessments help reveal your best fit and behavior style</p>
      </div>
    )
  }
  return (
    <section className="grid-section scroll-y u-padding-block-start-sm .u-padding-bottom-sm article-card-item-list-page">
      <PageIntro />
      <section className="grid-autofill u-padding-block-md padding-inline-lg scroll-y">
        <ArticleItemCard />
        <ArticleItemCard />
        <ArticleItemCard />
        <ArticleItemCard />
      </section>
    </section>
  )
}
