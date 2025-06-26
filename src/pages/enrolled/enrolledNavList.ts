// src/pages/onboarding/enrolledNavList.ts
import { RoutePaths } from "@/navigation/routePaths"
import { VideoIcon, TermsIcon } from "@/components"

export const enrolledNavItems = [
  {
    linkIcon: VideoIcon,
    linkText: "Home",
    hrefLocation: RoutePaths.DASHBOARD_HOME,
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
