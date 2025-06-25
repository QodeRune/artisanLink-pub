// src/components/ui/SiteBanner.tsx
import type { FC, ReactNode } from "react"
import clsx from "clsx"

interface BannerItem {
  name: string
  component: ReactNode
  isMobileVisible: boolean
}

interface HamburgerConfig {
  showOnMobile: boolean
  icon?: ReactNode
  onClick: () => void
}

export interface SiteBannerProps {
  left?: BannerItem
  center?: BannerItem
  right?: BannerItem
  hamburger?: HamburgerConfig
  className?: string
}

export const SiteBanner: FC<SiteBannerProps> = ({ left, center, right, hamburger, className = "" }) => {
  const bannerClasses = clsx(["site-banner", className])

  // Default hamburger icon if none provided
  const defaultHamburgerIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )

  return (
    <header className={bannerClasses}>
      {/* Left Section */}
      <div className="banner-section banner-section--left">
        {/* Left content */}
        {left && (
          <div
            className={clsx("banner-item", {
              "banner-item--mobile-hidden": !left.isMobileVisible,
            })}
            aria-label={left.name}
          >
            {left.component}
          </div>
        )}
      </div>

      {/* Center Section */}
      <div className="banner-section banner-section--center">
        {center && (
          <div
            className={clsx("banner-item", {
              "banner-item--mobile-hidden": !center.isMobileVisible,
            })}
            aria-label={center.name}
          >
            {center.component}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="banner-section banner-section--right">
        {right && (
          <div
            className={clsx("banner-item", {
              "banner-item--mobile-hidden": !right.isMobileVisible,
            })}
            aria-label={right.name}
          >
            {right.component}
          </div>
        )}

        {/* Hamburger menu - only shows on mobile when configured */}
        {hamburger?.showOnMobile && (
          <button
            className="banner-hamburger"
            onClick={hamburger.onClick}
            aria-label="Toggle navigation menu"
            type="button"
          >
            {hamburger.icon || defaultHamburgerIcon}
          </button>
        )}
      </div>
    </header>
  )
}
