// src/pages/onboarding/onboarding.tsx
import type { FC } from "react"
import { Outlet } from "react-router-dom"
import { onBoardingNavItems } from "./onboardingNavList"
import { FooterUserControls, Nav, SideBar } from "@/components"
// import { AcceptanceDecision } from "@/views"
// import { ArticleItemCard } from "@/components"

export const OnBoarding: FC = () => {
  const _leftSidebar = (
    <SideBar
      topEl={<p>Evolve with tech</p>}
      centerEl={<Nav navItems={onBoardingNavItems} />}
      bottomEl={<FooterUserControls />}
    />
  )
  const _mainContent = (
    <main className="main_content watch_video_main">
      <Outlet />
    </main>
  )
  return (
    <section className="dashboard">
      {_leftSidebar} {_mainContent}
    </section>
  )
}
