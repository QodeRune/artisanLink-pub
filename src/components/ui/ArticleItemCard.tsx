// src/components/ui/ArticleItemCard.tsx
import type { FC } from "react"

export const ArticleItemCard: FC = () => {
  return (
    <article className="article_item_card">
      <div className="card_highlight">
        <span className="header">
          <span>
            <h2 className="card_heading">Questionnaire 1</h2>
            <em className="card_heading_tag">Locked</em>
          </span>
          <span className="header_icon">
            <p className="icon_placeholder">I</p>
          </span>
        </span>
        <p className="header_description">
          This is a short info about the header
          {/* short highlight text */}
        </p>
        {/* react node - can be img or text etc */}
      </div>
      <div className="article-meta">
        <ul className="article-meta-list">
          {/* more than 4 and it should scroll */}
          <li className="article-meta-description">
            <p>Access date</p>
            <time>July 1st</time>
          </li>
          <li className="article-meta-description">
            <p>Due date</p>
            <time>July 31st</time>
          </li>
          <li className="article-meta-description">
            <p>Estimated time</p>
            <time>1hr 30mins</time>
          </li>
        </ul>
      </div>
    </article>
  )
}
