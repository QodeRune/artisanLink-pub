// src/pages/onboarding/onboarding.tsx
import type { FC } from "react"
import { onBoardingNavItems } from "./onboardingNavList"
import { Nav, SideBar } from "@/components"
// import { AcceptanceDecision } from "@/views"
import { ArticleItemCard } from "@/components"

export const OnBoarding: FC = () => {
  const _leftSidebar = (
    <SideBar
      topEl={<p>Evolve with tech</p>}
      centerEl={<Nav navItems={onBoardingNavItems} />}
      bottomEl={<p>Profile</p>}
    />
  )
  const _mainContent = (
    <main className="main_content watch_video_main">
      {/* <p className="test_container">"main body content"</p> */}
      <section className="row-flex">
        <ArticleItemCard />
        <ArticleItemCard />
      </section>
    </main>
  )
  return (
    <section className="dashboard">
      {_leftSidebar} {_mainContent}
    </section>
  )
}
