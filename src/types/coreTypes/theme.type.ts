// src/types/coreTypes/theme.type.ts
export type TThemeMode = "light" | "dark"
export type TTheme = TThemeMode | "system"

export interface IThemeContext {
  theme: TTheme
  setTheme: (theme: TTheme) => void
  systemTheme: TThemeMode
  effectiveTheme: TThemeMode
}

export interface IThemeProviderProps {
  children: React.ReactNode
}

export interface IToggleThemeProps {
  className?: string
}

export interface IThemeDropDownProps {
  className?: string
}
