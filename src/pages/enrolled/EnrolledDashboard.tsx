// src/pages/enrolled/EnrolledDashboard.tsx
import { useState, type FC } from "react"
import { Outlet } from "react-router-dom"
import { FooterUserControls, Nav, SideBar } from "@/components"
import { DashBoardLayout } from "@/layouts"
import { enrolledNavItems } from "./enrolledNavList"
import { SiteBanner } from "@/components/ui/SiteBanner"
import { UserProfileBadge } from "@/core"

export const EnrolledDashboard: FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }
  const _leftSidebar = (
    <SideBar
      topEl={<p>Evolve with tech</p>}
      centerEl={<Nav navItems={enrolledNavItems} />}
      bottomEl={
        <>
          <FooterUserControls />
          {/* <UserProfileBadge /> */}
        </>
      }
      className={isSidebarVisible ? "visible" : ""}
    />
  )

  const dashboardBanner = (
    <SiteBanner
      center={{
        name: "Page Title",
        component: <h1 className="banner-title">Career Tapestry</h1>,
        isMobileVisible: true,
      }}
      right={{
        name: "User Actions",
        component: <UserProfileBadge />,
        isMobileVisible: false,
      }}
      hamburger={{
        showOnMobile: true,
        onClick: toggleSidebar,
      }}
    />
  )
  const _mainContent = (
    <main className="main-content u-gap-md ">
      {dashboardBanner}
      <Outlet />
    </main>
  )

  return <DashBoardLayout leftSidebar={_leftSidebar} mainContent={_mainContent} />
}
