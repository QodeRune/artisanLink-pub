// src/components/user/UserProfileMenu.tsx
import type { FC } from "react"

interface UserProfileMenuProps {
  onClose: () => void
}

export const UserProfileMenu: FC<UserProfileMenuProps> = ({ onClose }) => {
  return (
    <div className="user-menu-popup u-soft-shadow">
      <button className="user-menu-item" onClick={onClose}>
        Settings
      </button>
      <button className="user-menu-item" onClick={onClose}>
        Help
      </button>
      <button className="user-menu-item" onClick={onClose}>
        Log out
      </button>
    </div>
  )
}
