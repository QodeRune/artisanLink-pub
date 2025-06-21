// Fixed PopupProvider with proper modal animation
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
import clsx from "clsx"

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

  // ------------------ MODAL STATE ------------------
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false) // Add animation state
  const [onBeforeClose, setOnBeforeClose] = useState<(() => boolean | Promise<boolean>) | null>(null)

  const closeModal = useCallback(() => {
    setIsAnimating(false)
    // Delay the actual close to allow exit animation
    setTimeout(() => {
      setModalContent(null)
      setOnBeforeClose(null)
      setIsOpen(false)
    }, 300) // Match your CSS transition duration
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
      setIsOpen(true)
      // Trigger enter animation after a small delay to ensure DOM is ready
      setTimeout(() => setIsAnimating(true), 10)
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

        {/* Modal Overlay */}
        {isOpen && (
          <div className="full-page-modal-overlay" onClick={requestClose}>
            <div
              className={clsx("full-page-modal-content", isAnimating ? "modal-enter" : "modal-exit")}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {modalContent}
            </div>
          </div>
        )}
      </ModalContext.Provider>
    </ToastContext.Provider>
  )
}
