// src/components/user/UserProfileBadge.tsx
import { useUserHook } from "@/store"
import { useState, type FC } from "react"
import { UserProfileMenu } from "./UserProfileMenu"

export const UserProfileBadge: FC = () => {
  const { user: _user } = useUserHook()
  const user = Array.isArray(_user) ? _user[0] : _user
  const name = `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User"
  const firstInitial = name.charAt(0).toUpperCase()
  const [open, setOpen] = useState(false)

  return (
    <div className="user-profile-wrapper u-relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="user-profile-btn u-flex u-items-center u-gap-sm u-padding-inline-sm u-padding-block-xs u-bg-surface u-soft-shadow"
      >
        <div className="user-avatar u-flex u-items-center u-justify-center">{firstInitial}</div>
        <div className="user-info u-flex u-flex-col">
          <span className="user-name u-text-body-md u-bold-text">{name}</span>
          <span className="user-role u-text-body-sm u-text-muted">{user?.plan || "Free"}</span>
        </div>
      </button>

      {open && <UserProfileMenu onClose={() => setOpen(false)} />}
    </div>
  )
}
