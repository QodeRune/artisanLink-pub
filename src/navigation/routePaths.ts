// src/navigation/routePaths.ts
export const RoutePaths = {
  HOME: "/",
  ONBOARDING_WATCH_VIDEO: "/onboarding/watch-video",
  ONBOARDING_TERMS_AND_CONDITIONS: "/onboarding/terms-and-conditions",
  CAREER_SNAP_SHOT: "/onboarding/career-tapestry-snapshot",
  ONBOARDING_PAYMENT: "/onboarding/payment",
  ONBOARDING_PAYMENT_SUCCESS: "/onboarding/payment/success",
  ONBOARDING_PAYMENT_CANCEL: "/onboarding/payment/cancel",
  ONBOARDING_PAYMENT_ERROR: "/onboarding/payment/error",
  ONBOARDING_BIO_DATA: "/onboarding/bio-data",

  // !ENROLLMENT
  ONBOARDING_ENROLLMENT_PAYMENT: "/onboarding/enrollment-payment",
  ONBOARDING_ENROLLMENT_SUCCESS: "/onboarding/enrollment-payment/success",
  ONBOARDING_ENROLLMENT_CANCEL: "/onboarding/enrollment-payment/cancel",
  ONBOARDING_ENROLLMENT_ERROR: "/onboarding/enrollment-payment/error",

  // !assessments
  ONBOARDING_ASSESSMENTS: "/onboarding/assessments",
  ONBOARDING_ASSESSMENTS_TEST: "/onboarding/assessments/test",
  ONBOARDING_ACCEPTANCE_STATUS: "/onboarding/acceptance-status",
  ONBOARDING_PROGRAM_TERMS: "/onboarding/program-terms-and-conditions",
  ONBOARDING_PROGRAM_PAYMENT: "/onboarding/program-payment",

  // !auth
  AUTH: "/auth",
  AUTH_SIGNIN: "/auth/signin",
  AUTH_SIGNUP: "/auth/signup",
  LOG_OUT: "/log-out",

  // !dashboard
  DASHBOARD: "/dashboard",
  DASHBOARD_HOME: "/dashboard/home",
  DASHBOARD_PROFILE: "/dashboard/profile",
  PROFILE_REPORTS: "/dashboard/reports",
  DASHBOARD_TEST: "/dashboard/test",

  // !catch all
  NOT_FOUND: "*",
} as const

export type TRoutePath = (typeof RoutePaths)[keyof typeof RoutePaths]
