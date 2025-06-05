// src/App.tsx
import type { FC } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Routes } from "@/navigation"

const router = createBrowserRouter(Routes)

export const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
