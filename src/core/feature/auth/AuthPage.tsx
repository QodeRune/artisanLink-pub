// src/core/feature/auth/AuthPage.tsx
import type { FC } from "react"
import { AuthForm } from "./AuthForm"
import { SideBar } from "@/components"
import { ThemeToggle } from "@/core/feature/theme"

export const AuthPage: FC = () => {
  const _leftSidebar = (
    <SideBar
      topEl={<p>Evolve with tech</p>}
      centerEl={<span className="hero-imag"></span>}
      bottomEl={
        <span className="u-flex u-justify-space-around">
          <p>Toggle theme</p>
          <ThemeToggle />
        </span>
      }
    />
  )

  const _mainContent = (
    <main className="main-content">
      <AuthForm />
    </main>
  )
  return (
    <section className="dashboard">
      {_leftSidebar} {_mainContent}
    </section>
  )
}
