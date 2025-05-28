// src/pages/onboarding/onboarding.tsx
import type { FC } from "react"
import { DashBoardLayout } from "@/layouts/Dashboard"
import { onBoardingNavItems } from "./onboardingNavList"
import { Nav, SideBar } from "@/components"

export const OnBoarding: FC = () => {
  const _leftSidebar = (
    <SideBar
      topEl={<p>Evolve with tech</p>}
      centerEl={<Nav navItems={onBoardingNavItems} />}
      bottomEl={<p>Profile</p>}
    />
  )
  const _mainContent = <main className="mainContent">"main content"</main>
  return <DashBoardLayout leftSidebar={_leftSidebar} mainContent={_mainContent} />
}
