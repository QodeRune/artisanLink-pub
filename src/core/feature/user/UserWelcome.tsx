// src/core/feature/user/UserWelcome.tsx
import { useUserHook } from "@/store"
import type { FC } from "react"

export const UserWelcomeBanner: FC = () => {
  const { user: _user } = useUserHook()
  const user = Array.isArray(_user) ? _user[0] : _user
  const _name = `${user?.first_name} ${user?.last_name}` || "User"

  const welcomeText = (
    <p className="u-section-text">
      Lorem ipsum dolor sit amat, consectetur advising elia. Edam eu turps moleskin, dictum est a, mathis tellus. Sed
      diagnosis, metes nec frangible acumen, risus sem solicitude Laius, ut interim tellus eliz sed risus.
    </p>
  )
  return (
    <div className="user-welcome-banner u-soft-shadow u-padding-inline-md u-padding-block-md u-margin-inline-lg u-bg-surface">
      <h1 className="heading-text">Hi {_name}, Welcome Back!</h1>
      {welcomeText}
    </div>
  )
}
