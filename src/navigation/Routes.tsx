// src/navigation/routes.ts
import type { RouteObject } from "react-router-dom"
// import { WatchVideo } from "../views"
import { OnBoarding } from "../pages/onboarding/onboarding"
import { ProductPayment, TermsAndConditions, WatchVideo } from "@/views"

export const Routes: RouteObject[] = [
  {
    path: "/auth",
    element: "",
    children: [
      { path: "signin", element: "" },
      { path: "signup", element: "" },
      { path: "verify-email", element: "" },
      { path: "", element: "" },
    ],
  },
  {
    path: "/log-out",
    element: "",
  },
  {
    path: "onboarding",
    element: <OnBoarding />,
    children: [
      { path: "watch-video", element: <WatchVideo /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },

      // protected routes
      {
        path: "payment",
        element: <ProductPayment />,
        children: [
          // TODO:: will take props
          { path: "success", element: <ProductPayment /> },
          { path: "cancel", element: <ProductPayment /> },
          { path: "error", element: <ProductPayment /> },
        ],
      },
      // TODO:: Questionnaire
      { path: "assessment", element: "" },
      { path: "program-terms-and-conditions", element: <TermsAndConditions /> },
      {
        path: "enrollment",
        element: <ProductPayment />,
        children: [
          // TODO:: will take props
          { path: "success", element: <ProductPayment /> },
          { path: "cancel", element: <ProductPayment /> },
          { path: "error", element: <ProductPayment /> },
        ],
      },
    ],
  },
]
