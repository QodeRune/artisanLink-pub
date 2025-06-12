// src/pages/onboarding/onboarding.tsx
import type { FC } from "react"
import { Outlet } from "react-router-dom"
import { onBoardingNavItems } from "./onboardingNavList"
import { FooterUserControls, Nav, SideBar } from "@/components"

export const OnBoarding: FC = () => {
  const _leftSidebar = (
    <SideBar
      topEl={<p>Evolve with tech</p>}
      centerEl={<Nav navItems={onBoardingNavItems} />}
      bottomEl={<FooterUserControls />}
    />
  )
  const _mainContent = (
    <main className="main-content">
      <Outlet />
    </main>
  )

  return (
    <section className="dashboard">
      {_leftSidebar} {_mainContent}
    </section>
  )
}
