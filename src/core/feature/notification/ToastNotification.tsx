// src/core/feature/popups/PopupNotificationItem.tsx
import { useState, type FC } from "react"
import type { IPopupNotificationItemProps } from "@/types"
import { getIconForType, CloseIcon } from "./NotificationIcons"
import clsx from "clsx"

export const ToastNotification: FC<IPopupNotificationItemProps> = ({
  id,
  position = "top-right",
  message,
  type,
  size,
  title = "This is the toast Title",
  onClose = "This is the toast body. can be success, info, warning, caution message etc",
  className = "",
  overlayClass = "",
  actionButtons,
}) => {
  const [isCLosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      console.log("might setup id tracking")
      if (onClose) onClose
    }, 300)
  }

  const closingAnimationClass = (isCLosing && "popup-closing-animation") || ""
  const toastClasses = clsx([
    "toast-notification",
    className,
    size,
    position,
    overlayClass,
    closingAnimationClass,
    overlayClass,
  ])

  const toastIcon = type && getIconForType(type)
  const toastContent = (
    <div className="toast-info-wrapper">
      {title && <h1 className="toast-title">{title} </h1>}
      {message && <p className="toast-body">{message}</p>}
      {actionButtons && <div className="toast-actions">{actionButtons}</div>}
    </div>
  )
  const closeIcon = (
    <span onClick={handleClose} className="close-toast">
      {CloseIcon()}
    </span>
  )
  return (
    <article id={id} className={toastClasses}>
      {toastIcon} {toastContent} {closeIcon}
    </article>
  )
}
