// src/types/ui/iconText.ts
import type { AriaDecision, IStrictAriaProps } from "@/core"
import type { ElementType, ReactNode } from "react"

export interface IClickableProps<TArgs = void, TReturn = void> {
  clickable: true
  onClick: TArgs extends void ? () => TReturn : (args: TArgs) => TReturn
}

export interface INonClickableProps {
  clickable?: false
  onClick?: never
}

// Base interfaces
export interface IBaseIcon {
  el: ReactNode
  iconClasses?: string
  clickable?: boolean
  onClick?: () => boolean
  id?: string
}

export interface IBaseText {
  textContent: string
  textClasses?: string
  clickable?: boolean
  onClick?: () => boolean
  id?: string
}

// Force developers to think about each ARIA label
export interface IIcon extends IBaseIcon, AriaDecision<"ariaLabel"> {
  /** Must be true if ariaLabel is null (decorative icon) */
  ariaHidden: boolean
}

export interface IText extends IBaseText, AriaDecision<"ariaLabel"> {}

export interface IIconTextProps extends AriaDecision<"ariaLabel"> {
  icon: IIcon
  text: IText
  as?: ElementType
  elClasses?: string
  clickable?: boolean
  onClick?: () => void
}

// !
export interface IStrictIcon extends IBaseIcon, IStrictAriaProps {
  ariaHidden: boolean
}

export interface IStrictText extends IBaseText, IStrictAriaProps {}

// This enforces the thinking without runtime overhead
export interface IStrictIconTextProps extends IStrictAriaProps {
  icon: IStrictIcon
  text: IStrictText
  as?: ElementType
  elClasses?: string
  clickable?: boolean
  onClick?: () => void
}
