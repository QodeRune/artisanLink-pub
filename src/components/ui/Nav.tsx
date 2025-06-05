// src/components/ui/Nav.tsx
import type { FC } from "react"
import { NavLink } from "react-router-dom"
import type { INavProps } from "@/types"

export const Nav: FC<{ navItems: INavProps[] }> = ({ navItems }) => {
  const _content = (
    <>
      {navItems.map((item, index) => {
        const { linkIcon, linkText, ariaLabel, hrefLocation } = item
        const _key = `nav_${index}_${linkText}`

        return (
          <li key={_key} className="nav_link_li">
            <NavLink
              to={hrefLocation}
              aria-label={ariaLabel || linkText}
              className={({ isActive }) => `nav_link_a ${isActive ? "active" : ""}`}
              end
            >
              <span className="nav_link_icon">{linkIcon}</span>
              <p className="nav_link_text">{linkText}</p>
            </NavLink>
          </li>
        )
      })}
    </>
  )

  return <ul className="nav_wrapper">{_content}</ul>
}
