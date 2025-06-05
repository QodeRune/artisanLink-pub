import type { FC } from "react"
import { ArticleItemCard } from "@/components"

export const AssessmentList: FC = () => {
  return (
    <section className="row-flex">
      <ArticleItemCard />
      <ArticleItemCard />
    </section>
  )
}
