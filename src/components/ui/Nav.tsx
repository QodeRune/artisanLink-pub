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

        // const isParentActive = location.pathname.startsWith(hrefLocation)

        return (
          <li key={_key} className="nav_link_li">
            <NavLink
              to={hrefLocation}
              aria-label={ariaLabel || linkText}
              className={({ isActive }) => `nav_link_a ${isActive ? "active" : ""}`}
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
