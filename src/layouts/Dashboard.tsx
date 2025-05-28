// src/layouts/Dashboard.tsx
import type { FC, ReactNode } from "react"

export interface IDashboardLayoutProps {
  leftSidebar?: ReactNode
  rightSidebar?: ReactNode
  mainContent: ReactNode
}
export const DashBoardLayout: FC<IDashboardLayoutProps> = ({ leftSidebar, mainContent, rightSidebar }) => {
  return (
    <section className="dashboard">
      {leftSidebar}
      {mainContent}
      {rightSidebar}
    </section>
  )
}
