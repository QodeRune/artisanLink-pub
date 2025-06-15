// src/pages/NotFound.tsx
import { Link } from "react-router-dom"
import { RoutePaths } from "@/navigation"

import { useLocation } from "react-router-dom"
// ...
export function NotFoundPage() {
  const { pathname } = useLocation()
  return (
    <div className={"not-found-page"}>
      <main>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, "{pathname}" doesn’t exist.</p>
        <Link to={RoutePaths.HOME}>Return to Home</Link>
      </main>
    </div>
  )
}
