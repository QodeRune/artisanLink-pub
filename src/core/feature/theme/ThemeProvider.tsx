// src/core/feature/theme/ThemeProvider.tsx
import type { IThemeProviderProps, TTheme, TThemeMode } from "@/types"
import { useEffect, useState, type FC } from "react"
import { ThemeContext } from "./theme.context"

export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
  // state to track theme state
  const [theme, setTheme] = useState<TTheme>(() => {
    const savedTheme = localStorage.getItem("theme") as TTheme
    return savedTheme && ["light", "dark", "system"].includes(savedTheme) ? savedTheme : "system"
  })

  const [systemTheme, setSystemTheme] = useState<TThemeMode>(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  const effectiveTheme = theme === "system" ? systemTheme : (theme as TThemeMode)

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return mediaQuery.removeEventListener("change", handleChange)
    }

    return undefined
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", effectiveTheme)
  }, [effectiveTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemTheme, effectiveTheme }}>{children}</ThemeContext.Provider>
  )
}
