// src/navigation/routes.ts
import type { RouteObject } from "react-router-dom"
import { OnBoarding } from "../pages/onboarding/onboarding"
import { AssessmentList, ProductPayment, TermsAndConditions, WatchVideo, PaymentResponse } from "@/views"

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
      { path: "assessments", element: <AssessmentList /> },
      {
        path: "career-tapestry-snapshot",
        element: <AssessmentList />,
      },
      {
        path: "acceptance-status",
        element: <PaymentResponse status={"success"} onProceed={() => console.log("TODO:: acceptance status")} />,
      },
      { path: "program-terms-and-conditions", element: <TermsAndConditions /> },
      {
        path: "enrollment-payment",
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
