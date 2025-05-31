// src/pages/onboarding/onboarding.tsx
import type { FC } from "react"
import { onBoardingNavItems } from "./onboardingNavList"
import { Nav, SideBar } from "@/components"
import { WatchVideo } from "@/views"

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
      <WatchVideo />
    </main>
  )
  return (
    <section className="dashboard">
      {_leftSidebar} {_mainContent}
    </section>
  )
}
