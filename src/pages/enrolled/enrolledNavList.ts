// src/pages/onboarding/enrolledNavList.ts
import { RoutePaths } from "@/navigation/routePaths"
import { VideoIcon, TermsIcon, PaymentIcon } from "@/components"

export const enrolledNavItems = [
  {
    linkIcon: VideoIcon,
    linkText: "Home",
    hrefLocation: RoutePaths.DASHBOARD,
  },
  {
    linkIcon: TermsIcon,
    linkText: "Terms & conditions",
    hrefLocation: RoutePaths.DASHBOARD_PROFILE,
  },
  {
    linkIcon: PaymentIcon,
    linkText: "Payment",
    hrefLocation: RoutePaths.PROFILE_REPORTS,
  },
]
