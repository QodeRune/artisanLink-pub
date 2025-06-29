// src/components/user/UserProfileMenu.tsx
import { RoutePaths } from "@/navigation"
import { useAuthHook } from "@/store"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"

interface UserProfileMenuProps {
  onClose: () => void
}

export const UserProfileMenu: FC<UserProfileMenuProps> = ({ onClose }) => {
  const navigate = useNavigate()
  const { handleLogout } = useAuthHook()

  const logout = () => {
    handleLogout()
    navigate(RoutePaths.LOG_OUT)
    onClose()
  }

  const settings = () => {
    navigate(RoutePaths.DASHBOARD_PROFILE)
    onClose()
  }
  return (
    <div className="user-menu-popup u-soft-shadow">
      {/* TODO:: Remove the disabled when support is enabled */}
      <button className="user-menu-item btn-is-disabled" onClick={onClose}>
        Get Support
      </button>{" "}
      <button className="user-menu-item" onClick={settings}>
        Profile & Settings
      </button>
      <button className="user-menu-item" onClick={logout}>
        Log out
      </button>
    </div>
  )
}
