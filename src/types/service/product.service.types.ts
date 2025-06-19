// src/types/service/product.service.types.ts
import type { IComponentFetchResponse } from "./api.types"
import type { ReactNode } from "react"
export const KPaymentStatus = {
  checkout: "Confirm & Checkout",
  success: "Payment Successful",
  cancelled: "Payment Cancelled",
  error: "Error - Retry Payment",
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

export interface IProductDetailsProps {
  productPrice?: string
  productName?: string
  productDescription?: string
  currency?: string
  classNames?: string[]
}

export interface ICouponData {
  couponCode: string
  productId: string
}

export interface IApplyCoupon<T = IComponentFetchResponse> {
  productId?: string
  onSubmit?: ({ couponCode, productId }: ICouponData) => T
}

export interface ICouponResponse {
  price: string
  discount: string
  total_cost: string
  coupon_code: string
  message: string
}
