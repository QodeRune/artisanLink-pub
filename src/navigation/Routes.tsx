// src/navigation/routes.ts
import { Navigate, type RouteObject } from "react-router-dom"
import { OnBoarding, NotFoundPage, EnrolledDashboard } from "@/pages"
import {
  AssessmentList,
  ProductPayment,
  TermsAndConditions,
  WatchVideo,
  PaymentResponse,
  PaymentDetails,
  BioDataForm,
  ProfileReports,
} from "@/views"
import { AuthForm, AuthPage, UserProfile, UserWelcomeBanner } from "@/core"
import { ProtectedRoute } from "@/navigation/ProtectedRoute"
import { Logout } from "@/components"
import { Initializer } from "./AppInit"
import { KPaymentStatus, UserCapabilityKeys } from "@/types"
import { HomeRedirect } from "./HomeRedirect"
// TODO:: Remove test toast
// import { TestToast } from "@/core"

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <Initializer />,
    children: [
      {
        path: "",
        element: <HomeRedirect />,
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
              { index: true, element: <Navigate to="watch-video" replace /> },
              { path: "watch-video", element: <WatchVideo /> },
              { path: "terms-and-conditions", element: <TermsAndConditions /> },
              {
                path: "payment",
                element: <ProductPayment />,
                children: [
                  { index: true, element: <PaymentDetails /> }, // default view
                  {
                    path: "success",
                    element: <PaymentResponse status={KPaymentStatus.success} onProceed={() => console.log("")} />,
                  },
                  {
                    path: "error",
                    element: <PaymentResponse status={KPaymentStatus.error} onProceed={() => console.log("")} />,
                  },
                  {
                    path: "cancel",
                    element: <PaymentResponse status={KPaymentStatus.cancelled} onProceed={() => console.log("")} />,
                  }, // Optional alias
                ],
              },
              { path: "assessments", element: <AssessmentList /> },
              { path: "bio-data", element: <BioDataForm /> },
              { path: "career-tapestry-snapshot", element: <AssessmentList /> },
              {
                path: "acceptance-status",
                element: (
                  <PaymentResponse
                    status={KPaymentStatus.success}
                    onProceed={() => console.log("TODO:: acceptance status")}
                  />
                ),
              },
              { path: "program-terms-and-conditions", element: <TermsAndConditions /> },
              {
                path: "enrollment-payment",
                element: <ProductPayment productName="ENROLLMENT" />,
                children: [
                  { index: true, element: <PaymentDetails /> }, // default view
                  {
                    path: "success",
                    element: <PaymentResponse status={KPaymentStatus.success} onProceed={() => console.log("")} />,
                  },
                  {
                    path: "error",
                    element: <PaymentResponse status={KPaymentStatus.error} onProceed={() => console.log("")} />,
                  },
                  {
                    path: "cancel",
                    element: <PaymentResponse status={KPaymentStatus.cancelled} onProceed={() => console.log("")} />,
                  }, // Optional alias
                ],
              },
            ],
          },
        ],
      },
      {
        path: "dashboard",
        element: <ProtectedRoute requiredCapabilities={[UserCapabilityKeys.hasEnrolledAccess]} />,
        children: [
          {
            path: "",
            element: <EnrolledDashboard />,
            children: [
              { index: true, element: <Navigate to="home" replace /> },
              { path: "home", element: <AssessmentList tag="Enrolled Assessment" pageIntro={<UserWelcomeBanner />} /> },
              { path: "profile", element: <UserProfile /> },
              { path: "reports", element: <ProfileReports /> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]
