// src/core/feature/popups/ToastProvider.tsx
import { createContext, useContext, useState, useCallback, useEffect, type FC, type ReactNode } from "react"
import { defaultToastContext, type IToastContext, type TToastState } from "@/types"
import { ToastNotification } from "./ToastNotification"
import { v4 as uuidv4 } from "uuid"

const ToastContext = createContext<IToastContext>(defaultToastContext)

export const useToast = () => useContext(ToastContext)

export const ToastProvider: FC<{ children: ReactNode; maxToasts?: number }> = ({ children, maxToasts = 3 }) => {
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

  // handle queue when toasts are removed
  useEffect(() => {
    if (toasts.length < maxToasts && queue.length > 0) {
      const [next, ...rest] = queue
      setQueue(rest)
      setToasts((prev) => [...prev, next])
    }
  }, [toasts, queue, maxToasts])

  // auto-dismiss logic
  useEffect(() => {
    const timers = toasts.map((toast) => {
      if (!toast.duration) return null

      return setTimeout(() => {
        removeToast(toast.id)
      }, toast.duration)
    })

    return () => {
      timers.forEach((timer) => timer && clearTimeout(timer))
    }
  }, [toasts, removeToast])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts, maxToasts }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastNotification key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
