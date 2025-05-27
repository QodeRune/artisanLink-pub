// src/components/ui/IconText.ui.tsx
import type { FC } from "react"
import { addAriaHidden, addAriaLabel } from "@/core"
import type { IStrictIconTextProps } from "@/types/ui"
import clsx from "clsx"

export const StrictIconText: FC<IStrictIconTextProps> = ({
  icon,
  text,
  as: Tag = "div",
  clickable = false,
  onClick,
  elClasses,
  ariaLabel,
}) => {
  const _iconClasses = clsx("iconText_icon", icon.iconClasses)
  const _textClasses = clsx("iconText_text", text.textClasses)
  const _elClasses = clsx("iconText_el", elClasses, clickable && "clickable")

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
    <Element className={_elClasses} {...(clickable && { onClick })} {...addAriaLabel(ariaLabel)}>
      {_content}
    </Element>
  )
}

/* Usage Examples:

✅ Explicit decisions, clean HTML output
<StrictIconText
  icon={{
    el: <StarIcon />,
    ariaHidden: true,
    ariaLabel: null // "I decided this is decorative"
  }}
  text={{
    textContent: "Favorite",
    ariaLabel: null // "Text is sufficient"
  }}
  ariaLabel={null} // "Container doesn't need extra label"
/>

✅ Results in clean HTML:
<div class="iconText_el">
  <span class="iconText_icon" aria-hidden="true">⭐</span>
  <span class="iconText_text">Favorite</span>
</div>

✅ Clickable with proper ARIA
<StrictIconText
  icon={{
    el: <DeleteIcon />,
    ariaHidden: false,
    ariaLabel: "Delete action"
  }}
  text={{
    textContent: "Delete",
    ariaLabel: null
  }}
  clickable={true}
  onClick={handleDelete}
  ariaLabel="Delete this item permanently"
/>

*/

// ESLint rule suggestion for your team:
// You could create a custom ESLint rule that enforces:
// 1. All components with 'aria' in prop names must not use empty strings
// 2. Must use null for "consciously not needed" cases
// 3. Meaningful strings must be at least N characters long
