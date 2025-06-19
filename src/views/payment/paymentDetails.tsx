// src/views/payment/paymentDetails.tsx
import { stripePaymentService } from "@/services"
import { useProductHook, useUserHook } from "@/store"
import { KPaymentStatus, type TPaymentStatus } from "@/types"
import { ApplyCoupon } from "@/views/payment/ApplyCoupon"
import { OrderSummary } from "@/views/payment/OrderSummary"
import { type FC } from "react"

export const PaymentDetails: FC<{
  currency?: string
  price?: string
  discount?: string
  paymentStatus?: TPaymentStatus
  handlePayment?: () => void
}> = ({ currency, price, discount, paymentStatus = KPaymentStatus.checkout, handlePayment }) => {
  // user
  const { user: _user } = useUserHook()
  const user = Array.isArray(_user) ? _user[0] : _user

  // product
  const { getProductData } = useProductHook()
  const productData = getProductData()

  console.log(productData)

  const _price = parseFloat(price || productData?.price || "0")
  const _discount = parseFloat(discount || productData?.discount || "0")

  const total = (_price - _discount).toFixed(2)
  const canPay = paymentStatus !== KPaymentStatus.success

  const pay = () => {
    if (!canPay) {
      // TODO:: add toast here
      return
    }

    try {
      if (!productData || !user) {
        throw new Error("Product data or user information is missing")
      }

      if (!productData.id || !user.id || !user.email) {
        throw new Error("Required fields missing in product or user data")
      }

      stripePaymentService({
        product_id: productData.id,
        user: {
          id: user.id,
          email: user.email,
        },
      })
    } catch (error) {
      throw error
    }
  }

  const handleSubmit = handlePayment || pay

  const _paymentDetails = (
    <div className="payment-details">
      <ApplyCoupon productId={productData?.id} />
      <OrderSummary currency={currency} price={_price} discount={_discount} totalCost={total} quantity={1} />
      <button type="button" className="form_input submit_button" onClick={handleSubmit} disabled={!canPay}>
        {paymentStatus}
      </button>
    </div>
  )

  return _paymentDetails
}
