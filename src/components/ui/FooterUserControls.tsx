// src/components/ui/FooterUserControls.tsx
import { ThemeToggle } from "@/core"
import { RoutePaths } from "@/navigation"
import { useAuthHook } from "@/store"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"

export const FooterUserControls: FC = () => {
  const navigate = useNavigate()
  const { handleLogout } = useAuthHook()

  const logout = () => {
    handleLogout()
    navigate(RoutePaths.LOG_OUT)
  }

  return (
    <div className="footer-user-controls u-flex u-justify-between u-items-center">
      <button className="logout-button u-btn u-btn-text" onClick={logout}>
        Log Out
      </button>
      <ThemeToggle />
      <button className="get-support u-btn u-btn-text" disabled>
        Get Support
      </button>
    </div>
  )
}
