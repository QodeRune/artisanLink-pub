// src/components/ui/IconText.tsx
import type { FC } from "react"
import clsx from "clsx"
import type { IIconTextProps } from "@/types/ui"
import { addAriaHidden, addAriaLabel } from "@/core"

export const IconText: FC<IIconTextProps> = ({
  icon,
  text,
  as: Tag = "div",
  clickable = false,
  onClick,
  elClasses,
  ariaLabel,
}) => {
  // Validation at runtime (could also be done with more complex types)
  if (clickable && !ariaLabel) {
    throw new Error("Clickable IconText components must have an ariaLabel")
  }

  if (!icon.ariaHidden && !icon.ariaLabel) {
    throw new Error("Non-decorative icons must have an ariaLabel")
  }

  // Class composition with your preferred underscore naming
  const _iconClasses = clsx("iconText_icon", icon.iconClasses)
  const _textClasses = clsx("iconText_text", text.textClasses)
  const _elClasses = clsx("iconText_el", elClasses, clickable && "clickable")

  // Content composition - only adds ARIA when meaningful
  const _content = (
    <>
      <span className={_iconClasses} {...addAriaHidden(icon.ariaHidden)} {...addAriaLabel(icon.ariaLabel)}>
        {icon.el}
      </span>
      <span className={_textClasses} {...addAriaLabel(text.ariaLabel)}>
        {text.textContent}
      </span>
    </>
  )

  const Element = clickable ? "button" : Tag

  return (
    <Element
      className={_elClasses}
      {...(clickable && {
        onClick,
        type: Element === "button" ? "button" : undefined,
      })}
      {...addAriaLabel(ariaLabel)}
    >
      {_content}
    </Element>
  )
}
