// src/views/payment/paymentDetails.tsx
import { FormInput } from "@/components"
import { stripePaymentService } from "@/services"
import { useProductHook, useUserHook } from "@/store"
import { KPaymentStatus, type TPaymentStatus } from "@/types"
import { OrderSummary } from "@/views/payment/OrderSummary"
import { type FC } from "react"
const _promo = {
  id: "prom_code",
  name: "prom_code",
  labelText: "Have a promo code?",
  type: "text",
  readOnly: false,
  placeholder: "Referrer's code",
  required: true,
  minLength: 3,
  helperText: "Please enter your Promo Code",
}

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
      {/* Apply Promo Code */}
      <div className="promo-section">
        <form action="" className="promo-input">
          <FormInput {..._promo} containerClassName="enter-promo" />
          <button type="submit" className="form_input submit_button">
            Apply Code
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <OrderSummary currency={currency} price={price} discount={discount} totalCost={total} quantity={1} />

      <button type="button" className="form_input submit_button" onClick={handleSubmit} disabled={!canPay}>
        {paymentStatus}
      </button>
    </div>
  )

  return _paymentDetails
}
