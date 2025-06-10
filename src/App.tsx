// src/App.tsx
import type { FC } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Routes } from "@/navigation"
import { ThemeProvider, ToastProvider } from "@/core"

const router = createBrowserRouter(Routes)

export const App: FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
