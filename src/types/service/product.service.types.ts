// src/types/service/product.service.types.ts
export const KPaymentStatus = {
  checkout: "Make Payment",
  success: "Payment Successful",
  cancelled: "Cancelled",
  error: "Error Confirming Payment",
} as const

export type TPaymentStatus = (typeof KPaymentStatus)[keyof typeof KPaymentStatus]
export interface IFetchProductArgs {
  productName?: string
  paymentStatus?: TPaymentStatus
  disablePayment?: boolean
}
