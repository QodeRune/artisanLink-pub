// src/App.tsx
import type { FC } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Routes } from "@/navigation"
import { PopupProvider, ThemeProvider } from "@/core"

const router = createBrowserRouter(Routes)

export const App: FC = () => {
  return (
    <ThemeProvider>
      <PopupProvider>
        <RouterProvider router={router} />
      </PopupProvider>
    </ThemeProvider>
  )
}

export default App
