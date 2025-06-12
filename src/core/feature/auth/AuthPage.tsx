// src/core/feature/auth/AuthPage.tsx
import type { FC } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { AuthForm } from "./AuthForm"
import { SideBar } from "@/components"
import { ThemeToggle } from "@/core/feature/theme"

export const AuthPage: FC<{ userLogin?: boolean }> = ({ userLogin = true }) => {
  const location = useLocation()
  const showForm = location.pathname === "/auth" // Only show form on exact /auth path

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

  const _mainContent = <main className="main-content">{showForm ? <AuthForm login={userLogin} /> : <Outlet />}</main>

  return (
    <section className="dashboard">
      {_leftSidebar} {_mainContent}
    </section>
  )
}
