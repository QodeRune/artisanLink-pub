// src/types/ui/nav.type.ts
import type { ReactNode } from "react"

export interface INavProps {
  linkIcon?: ReactNode
  linkText: string
  ariaLabel?: string
  hrefLocation: string
}
