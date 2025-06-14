// src/types/coreTypes/popup.type.ts
import type { ReactNode } from "react"

export type TNotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export type TNotificationType = "success" | "error" | "info" | "warning" | "default"

export interface IPopupNotificationItemProps {
  id: string
  position?: TNotificationPosition
  message: string | ReactNode
  type?: TNotificationType
  size: string
  title?: string
  onClose?: () => boolean | void
  className?: string
  overlayClass?: string
  actionButtons?: ReactNode
}

export type TToastState = IPopupNotificationItemProps & {
  duration?: number
  createdAt?: number
}

export interface IToastContext {
  toasts: TToastState[]
  addToast: (toast: Omit<TToastState, "id" | "createdAt">) => void
  removeToast: (id: string) => void
  clearToasts: () => void
  maxToasts?: number
}

export const defaultToastContext: IToastContext = {
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  clearToasts: () => {},
  maxToasts: 3, // default
}
