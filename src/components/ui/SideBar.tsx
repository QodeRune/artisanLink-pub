// src/components/ui/SideBar.tsx
import type { FC, ReactNode } from "react"
import { IconText } from "@/components/ui/IconText"
import clsx from "clsx"

export const SideBar: FC<{ topEl: ReactNode; centerEl?: ReactNode; bottomEl?: ReactNode; className?: string }> = ({
  topEl,
  centerEl,
  bottomEl,
  className = "",
}) => {
  const sidebarClasses = clsx(["sideBar", className])
  const _brand = topEl || (
    <IconText
      icon={{
        el: <p>E.W.T</p>,
        ariaHidden: true,
        ariaLabel: "evolve with tech logo",
      }}
      text={{
        textContent: "EvolveWithTech",
        ariaLabel: null,
      }}
      ariaLabel={"brand"}
    />
  )
  return (
    <aside className={sidebarClasses}>
      {_brand} {centerEl} {bottomEl}
    </aside>
  )
}
