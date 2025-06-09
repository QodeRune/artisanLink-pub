import type { FC } from "react"
import { ArticleItemCard } from "@/components"

export const AssessmentList: FC = () => {
  return (
    <section className="grid-autofill scroll-y">
      <ArticleItemCard />
      <ArticleItemCard />
      <ArticleItemCard />
      <ArticleItemCard />
    </section>
  )
}
