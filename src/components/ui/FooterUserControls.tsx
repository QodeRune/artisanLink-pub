// src/components/ui/FooterUserControls.tsx
import { ThemeToggle } from "@/core"
import type { FC } from "react"

export const FooterUserControls: FC = () => {
  return (
    <div className="footer-user-controls u-flex u-justify-between">
      <p className="logout-button">Log Out</p>
      <ThemeToggle />
      <p className="get-support">Get Support</p>
    </div>
  )
}
