// src/navigation/routes.ts
import type { RouteObject } from "react-router-dom"

export const Routes: RouteObject[] = [
  {
    path: "/auth",
    element: "",
    children: [
      { path: "signin", element: "" },
      { path: "signup", element: "" },
      { path: "", element: "" },
    ],
  },
  {
    path: "/log-out",
    element: "",
  },
]
