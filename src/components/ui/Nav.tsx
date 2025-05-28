// src/components/ui/Nav.tsx
import type { FC } from "react"
import type { INavProps } from "@/types"

export const Nav: FC<{ navItems: INavProps[] }> = ({ navItems }) => {
  const _content = (
    <>
      {navItems.map((item, index) => {
        // track items for active state

        const { linkIcon, linkText, ariaLabel, hrefLocation } = item
        const _key = `nav_${index}_${linkText}`

        return (
          <li key={_key} id={_key} aria-label={ariaLabel || linkText} className="nav_link_li">
            <a href={hrefLocation} className="nav_link_a">
              <span className="nav_link_icon">{linkIcon}</span>
              <p className="nav_link_text">{linkText}</p>
            </a>
          </li>
        )
      })}
    </>
  )
  return <ul className="nav_wrapper">{_content}</ul>
}
