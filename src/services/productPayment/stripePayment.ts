// src/services/productPayment/stripePayment.ts
import type { IProductPaymentResponse, IResponseDTO, IStripePaymentArgs, IStripeSessionDetails } from "@/types"
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
