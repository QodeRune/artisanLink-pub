// src/core/feature/popup/popupProvider.tsx
import { createContext, useContext, useState, useCallback, useEffect, type FC, type ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"
import { ToastNotification } from "./notification"
import {
  type IToastContext,
  type TToastState,
  type IModalContext,
  defaultToastContext,
  defaultModalContext,
} from "@/types"

const ToastContext = createContext<IToastContext>(defaultToastContext)
const ModalContext = createContext<IModalContext>(defaultModalContext)

export const useToast = () => useContext(ToastContext)
export const useModal = () => useContext(ModalContext)

export const PopupProvider: FC<{ children: ReactNode; maxToasts?: number }> = ({ children, maxToasts = 3 }) => {
  // ------------------ TOAST STATE ------------------
  const [toasts, setToasts] = useState<TToastState[]>([])
  const [queue, setQueue] = useState<TToastState[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (toast: Omit<TToastState, "id" | "createdAt">) => {
      const newToast: TToastState = {
        ...toast,
        id: uuidv4(),
        createdAt: Date.now(),
      }

      setToasts((prev) => {
        if (prev.length >= maxToasts) {
          setQueue((q) => [...q, newToast])
          return prev
        } else {
          return [...prev, newToast]
        }
      })
    },
    [maxToasts],
  )

  const clearToasts = useCallback(() => {
    setToasts([])
    setQueue([])
  }, [])

  useEffect(() => {
    if (toasts.length < maxToasts && queue.length > 0) {
      const [next, ...rest] = queue
      setQueue(rest)
      setToasts((prev) => [...prev, next])
    }
  }, [toasts, queue, maxToasts])

  useEffect(() => {
    const timers = toasts.map((toast) => {
      if (!toast.duration) return null
      return setTimeout(() => removeToast(toast.id), toast.duration)
    })

    return () => {
      timers.forEach((timer) => timer && clearTimeout(timer))
    }
  }, [toasts, removeToast])

  // ------------------ MODAL STATE (SIMPLIFIED) ------------------
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [onBeforeClose, setOnBeforeClose] = useState<(() => boolean | Promise<boolean>) | null>(null)

  // Simple: isOpen is just based on whether we have content
  const isOpen = !!modalContent

  const closeModal = useCallback(() => {
    setModalContent(null)
    setOnBeforeClose(null)
  }, [])

  const requestClose = useCallback(async () => {
    if (onBeforeClose) {
      const result = await onBeforeClose()
      if (!result) return
    }
    closeModal()
  }, [onBeforeClose, closeModal])

  const openModal = useCallback(
    (component: ReactNode, options?: { onBeforeClose?: () => boolean | Promise<boolean> }) => {
      setModalContent(component)
      setOnBeforeClose(() => options?.onBeforeClose ?? null)
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts, maxToasts }}>
      <ModalContext.Provider
        value={{
          openModal,
          closeModal,
          requestClose,
          modalContent,
          isOpen,
        }}
      >
        {children}

        {/* Toast Area */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <ToastNotification key={toast.id} {...toast} />
          ))}
        </div>

        {/* Modal Overlay - Simple: Just show when we have content */}
        {modalContent && (
          <div className="full-page-modal-overlay" onClick={requestClose}>
            <div className="full-page-modal-content" onClick={(e) => e.stopPropagation()}>
              {modalContent}
            </div>
          </div>
        )}
      </ModalContext.Provider>
    </ToastContext.Provider>
  )
}
