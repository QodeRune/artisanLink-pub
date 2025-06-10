// src/core/feature/theme/theme.context.ts
import { createContext, useContext } from "react"
import type { IThemeContext, TTheme } from "@/types"

export const themeOptions: Array<{ value: TTheme; label: string }> = [
  { value: "light", label: "light" },
  { value: "dark", label: "dark" },
  { value: "system", label: "system" },
]

export const ThemeContext = createContext<IThemeContext | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used withing a ThemeProvider")
  }

  return context
}
