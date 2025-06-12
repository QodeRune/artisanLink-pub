// src/components/ui/SideBar.tsx
import type { FC, ReactNode } from "react"
import { IconText } from "@/components/ui/IconText"

export const SideBar: FC<{ topEl: ReactNode; centerEl?: ReactNode; bottomEl?: ReactNode }> = ({
  topEl,
  centerEl,
  bottomEl,
}) => {
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
    <aside className="sideBar">
      {_brand} {centerEl} {bottomEl}
    </aside>
  )
}
