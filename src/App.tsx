// src/App.tsx
import type { FC } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Routes } from "@/navigation"
import { ThemeProvider } from "@/core"

const router = createBrowserRouter(Routes)

export const App: FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
