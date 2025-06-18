// src/navigation/routes.ts
import { Navigate, type RouteObject } from "react-router-dom"
import { OnBoarding, NotFoundPage } from "@/pages"
import { AssessmentList, ProductPayment, TermsAndConditions, WatchVideo, PaymentResponse } from "@/views"
import { AuthForm, AuthPage } from "@/core"
import { RoutePaths } from "./routePaths"
import { ProtectedRoute } from "@/navigation/ProtectedRoute"
import { Logout } from "@/components"
import { Initializer } from "./AppInit"
// TODO:: Remove test toast
// import { TestToast } from "@/core"
import { ProductDetails } from "../views/payment/ProductDetails"

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <Initializer />,
    children: [
      {
        path: "",
        element: <Navigate to={RoutePaths.AUTH} replace />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
        children: [
          { path: "login", element: <AuthForm login={true} /> },
          { path: "signup", element: <AuthForm login={false} /> },
          { path: "verify-email", element: <div>Email verification</div> },
        ],
      },
      {
        path: "/log-out",
        element: <Logout />,
      },
      {
        path: "onboarding",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <OnBoarding />,
            children: [
              { path: "", element: <WatchVideo /> },
              { path: "watch-video", element: <WatchVideo /> },
              { path: "terms-and-conditions", element: <TermsAndConditions /> },
              {
                path: "payment",
                element: <ProductPayment />,
                children: [
                  { path: "success", element: <ProductDetails /> },
                  { path: "cancel", element: <ProductPayment /> },
                  { path: "error", element: <ProductPayment /> },
                ],
              },
              { path: "assessments", element: <AssessmentList /> },
              { path: "career-tapestry-snapshot", element: <AssessmentList /> },
              {
                path: "acceptance-status",
                element: (
                  <PaymentResponse status={"success"} onProceed={() => console.log("TODO:: acceptance status")} />
                ),
              },
              { path: "program-terms-and-conditions", element: <TermsAndConditions /> },
              {
                path: "enrollment-payment",
                element: <ProductPayment />,
                children: [
                  { path: "success", element: <ProductPayment /> },
                  { path: "cancel", element: <ProductPayment /> },
                  { path: "error", element: <ProductPayment /> },
                ],
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]
