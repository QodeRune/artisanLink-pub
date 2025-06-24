// src/pages/enrolled/EnrolledDashboard.tsx
import type { FC } from "react"
import { Outlet } from "react-router-dom"
import { FooterUserControls, Nav, SideBar } from "@/components"
import { DashBoardLayout } from "@/layouts"
import { enrolledNavItems } from "./enrolledNavList"

export const EnrolledDashboard: FC = () => {
  const _leftSidebar = (
    <SideBar
      topEl={<p>Evolve with tech</p>}
      centerEl={<Nav navItems={enrolledNavItems} />}
      bottomEl={<FooterUserControls />}
    />
  )
  const _mainContent = (
    <main className="main-content">
      <Outlet />
    </main>
  )

  return <DashBoardLayout leftSidebar={_leftSidebar} mainContent={_mainContent} />
}
