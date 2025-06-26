// src/pages/onboarding/enrolledNavList.ts
import { RoutePaths } from "@/navigation/routePaths"
import { VideoIcon, TermsIcon } from "@/components"

export const enrolledNavItems = [
  {
    linkIcon: VideoIcon,
    linkText: "Dashboard",
    hrefLocation: RoutePaths.DASHBOARD,
  },
  {
    linkIcon: TermsIcon,
    linkText: "Profile",
    hrefLocation: RoutePaths.DASHBOARD_PROFILE,
  },
  {
    linkIcon: TermsIcon,
    linkText: "Reports",
    hrefLocation: RoutePaths.PROFILE_REPORTS,
  },
]
