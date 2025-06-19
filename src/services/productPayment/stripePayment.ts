// src/services/productPayment/stripePayment.ts
import type {
  IProductPaymentResponse,
  IResponseDTO,
  IStripePaymentArgs,
  IStripeSessionDetails,
  ICouponData,
} from "@/types"
import { api, PaymentEndpoints } from "../api"

export const stripePaymentService = async ({ product_id, quantity = 1, user }: IStripePaymentArgs) => {
  try {
    if (!user) {
      throw new Error("User not logged in")
    }

    const checkoutResponse = await api.authenticatedPost<IResponseDTO<IStripeSessionDetails>>({
      endpoint: PaymentEndpoints.CHECKOUT_SESSION,
      body: {
        product_id,
        quantity,
        user_id: user.id,
        email: user.email,
      },
    })

    if (checkoutResponse.data) {
      window.location.href = checkoutResponse.data.sessionUrl
    }

    return checkoutResponse
  } catch (error) {
    throw error
  }
}

export const confirmPayment = async ({ sessionId }: { sessionId: string }) => {
  const paymentComplete = await api.authenticatedGet<IResponseDTO<IProductPaymentResponse>>({
    endpoint: `${PaymentEndpoints.CONFIRM_PAYMENT}?session_id=${sessionId}`,
    config: {},
  })

  console.log(paymentComplete)
  return paymentComplete.data
}

export const applyCoupon = async ({ couponCode, productId }: ICouponData) => {
  console.log(
    "Endpoints",
    PaymentEndpoints.CHECKOUT_SESSION,
    PaymentEndpoints.CONFIRM_PAYMENT,
    PaymentEndpoints.CONFIRM_PAYMENT_SUCCESS,
    PaymentEndpoints.CONFIRM_PAYMENT_ERROR,
    PaymentEndpoints.CONFIRM_PAYMENT_CANCEL,
    PaymentEndpoints.APPLY_COUPON,
  )
  const _endpoint = "http://localhost:5002/v1/api/payment/apply-coupon" //PaymentEndpoints.APPLY_COUPON
  // const _endpoint = PaymentEndpoints.APPLY_COUPON
  try {
    const _applyCoupon = await api.authenticatedPost<IResponseDTO>({
      endpoint: _endpoint,
      body: {
        coupon_code: couponCode,
        product_id: productId,
      },
    })

    if (_applyCoupon.success) {
      // TODO:: update product price details
      console.log(_applyCoupon)
      return true
    }
  } catch (error) {
    throw error
  }
}
