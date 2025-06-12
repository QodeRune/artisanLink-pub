// src/core/feature/theme/ThemeToggle.tsx
import type { FC } from "react"
import { useTheme } from "./theme.context"
import type { IToggleThemeProps } from "@/types"
import clsx from "clsx"

export const ThemeToggle: FC<IToggleThemeProps> = () => {
  const { effectiveTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(effectiveTheme === "light" ? "dark" : "light")
  }

  const lightThemeIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="theme-icon">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )

  const darkThemeIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="theme-icon">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )

  const themeToggleButton = (
    <>
      <input
        className="theme-toggle-checkbox"
        type="checkbox"
        id="theme-toggle"
        onChange={toggleTheme}
        checked={effectiveTheme === "dark"}
        aria-label={`Toggle theme to ${effectiveTheme === "light" ? "dark" : "light"} mode`}
      />
      <label className="theme-toggle-label" htmlFor="theme-toggle">
        <span className="sr-only">Toggle theme</span>
        <span className="theme-toggle-thumb">
          <span className={clsx("theme-icon-wrapper", { show: effectiveTheme === "light" })}>{lightThemeIcon}</span>
          <span className={clsx("theme-icon-wrapper", { show: effectiveTheme === "dark" })}>{darkThemeIcon}</span>
        </span>
      </label>
    </>
  )

  return themeToggleButton
}
