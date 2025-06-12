// src/navigation/routes.ts
import { Navigate, type RouteObject } from "react-router-dom"
import { OnBoarding } from "../pages/onboarding/onboarding"
import { AssessmentList, ProductPayment, TermsAndConditions, WatchVideo, PaymentResponse } from "@/views"
import { AuthForm, AuthPage } from "@/core"
// TODO:: Remove test toast
// import { TestToast } from "@/core"

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="auth" replace />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "login",
        element: <AuthForm login={true} />,
      },
      {
        path: "signup",
        element: <AuthForm login={false} />,
      },
      {
        path: "verify-email",
        element: <div>Email verification</div>,
      },
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
      { path: "", element: <WatchVideo /> },
      { path: "watch-video", element: <WatchVideo /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },
      // { path: "test-toast", element: <TestToast /> },

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
