// src/types/service/product.service.types.ts
import type { ReactNode } from "react"
export const KPaymentStatus = {
  checkout: "Make Payment",
  success: "Payment Successful",
  cancelled: "Cancelled",
  error: "Error Confirming Payment",
} as const

export type TPaymentStatus = (typeof KPaymentStatus)[keyof typeof KPaymentStatus]
export interface IFetchProductArgs {
  productName?: string
}

export interface IPaymentResponse {
  paymentStatus?: TPaymentStatus
  responseComponent?: ReactNode
}

export interface IStripePaymentArgs {
  product_id: string
  quantity?: number
  user: {
    id: string
    email: string
  }
}

export interface IStripeSessionDetails {
  isRecovered?: boolean
  sessionId?: string
  sessionUrl: string
}
