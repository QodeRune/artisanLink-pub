// src/core/feature/user/UserWelcome.tsx
import type { FC } from "react"

export const UserWelcomeBanner: FC = () => {
  const welcomeText = (
    <p className="u-section-text">
      Lorem ipsum dolor sit amat, consectetur advising elia. Edam eu turps moleskin, dictum est a, mathis tellus. Sed
      diagnosis, metes nec frangible acumen, risus sem solicitude Laius, ut interim tellus eliz sed risus.
    </p>
  )
  return (
    <div className="user-welcome-banner">
      <h1 className="heading-text">Hi User, Welcome Back!</h1>
      {welcomeText}
    </div>
  )
}
