// src/components/ui/ArticleItemCard.tsx
import type { FC, ReactNode } from "react"
import { useModal } from "@/core"
export interface IArticleItemMeta {
  title: string
  body?: string
}
export interface IArticleItemCard {
  title: string
  subTitle?: string
  headerIcon?: ReactNode
  headerDescription?: string
  metaList?: IArticleItemMeta[]
}

export const ArticleItemCard: FC<IArticleItemCard> = ({ title, subTitle, headerIcon, headerDescription, metaList }) => {
  const { openModal } = useModal()

  const handleClick = () => {
    // TODO:: should receive openModal if needed
    openModal(<p className="modal">Opened Modal</p>)
  }
  return (
    <article className="article_item_card" onClick={handleClick}>
      <div className="card_highlight">
        <span className="header">
          <span>
            <h2 className="card_heading">{title}</h2>
            <em className="card_heading_tag">{subTitle}</em>
          </span>
          <span className="header_icon">
            {headerIcon}
            {/* <p className="icon_placeholder">I</p> */}
          </span>
        </span>
        <p className="header_description">
          {headerDescription}
          {/* short highlight text */}
        </p>
        {/* react node - can be img or text etc */}
      </div>
      <div className="article-meta">
        {metaList?.length ? (
          <ul className="article-meta-list">
            {metaList.map((meta, index) => (
              <li key={index} className="article-meta-description">
                <p>{meta.title}</p>
                <time>{meta.body}</time>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}
