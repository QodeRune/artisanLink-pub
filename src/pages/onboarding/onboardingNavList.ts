// src/pages/onboarding/onboardingNavList.tsx
import { RoutePaths } from "../../navigation/routePaths"

import {
  VideoIcon,
  TermsIcon,
  PaymentIcon,
  QuestionnaireIcon,
  AcceptIcon,
  ProgramIcon,
  ProgramPaymentIcon,
} from "@/components"

export const onBoardingNavItems = [
  {
    linkIcon: VideoIcon,
    linkText: "Watch video",
    hrefLocation: RoutePaths.ONBOARDING_WATCH_VIDEO,
  },
  {
    linkIcon: TermsIcon,
    linkText: "Terms & conditions",
    hrefLocation: RoutePaths.ONBOARDING_TERMS_AND_CONDITIONS,
  },
  {
    linkIcon: PaymentIcon,
    linkText: "Payment",
    hrefLocation: RoutePaths.ONBOARDING_PAYMENT,
  },
  {
    linkIcon: QuestionnaireIcon,
    linkText: "Assessments",
    hrefLocation: RoutePaths.ONBOARDING_ASSESSMENTS,
  },
  {
    linkIcon: ProgramIcon,
    linkText: "Bio data",
    hrefLocation: RoutePaths.ONBOARDING_BIO_DATA,
  },
  {
    linkIcon: TermsIcon,
    linkText: "Career Tapestry Snapshot",
    hrefLocation: RoutePaths.CAREER_SNAP_SHOT,
  },
  {
    linkIcon: AcceptIcon,
    linkText: "Acceptance decision",
    hrefLocation: RoutePaths.ONBOARDING_ACCEPTANCE_STATUS,
  },
  {
    linkIcon: ProgramIcon,
    linkText: "Program terms & conditions",
    hrefLocation: RoutePaths.ONBOARDING_PROGRAM_TERMS,
  },
  {
    linkIcon: ProgramPaymentIcon,
    linkText: "Enrollment payment",
    hrefLocation: RoutePaths.ONBOARDING_ENROLLMENT_PAYMENT,
  },
]
