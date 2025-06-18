// src/views/Payment.tsx
import { useEffect, type FC } from "react"
import { FormInput } from "@/components"
import { useProductHook, useUserHook } from "@/store"
import { KPaymentStatus, type IFetchProductArgs, type IPaymentResponse } from "@/types"
import { stripePaymentService } from "@/services"
import { ProductDetails } from "./ProductDetails"
import clsx from "clsx"
// import { PaymentResponse } from "./PaymentResponse"
// import { Outlet } from "react-router-dom"

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

export const ProductPayment: FC<IFetchProductArgs & IPaymentResponse> = ({
  productName = "CAREER_TAPESTRY_SNAPSHOT",
  paymentStatus = KPaymentStatus.checkout,
  responseComponent,
}) => {
  const { fetchProduct, getProductData, isProductLoading } = useProductHook()
  const { user: _user } = useUserHook()
  const user = Array.isArray(_user) ? _user[0] : _user
  const canPay = paymentStatus !== KPaymentStatus.success

  useEffect(() => {
    const _fetchProduct = async () => {
      await fetchProduct({ productName })
    }

    _fetchProduct()
  }, [productName])

  const productData = getProductData()
  const price = parseFloat(productData?.price ?? "0")
  const discount = typeof productData?.discount === "string" ? parseFloat(productData.discount) : 0
  const total = (price - discount).toFixed(2)
  const currency = (productData?.currency ?? "USD").toUpperCase()

  const pay = () => {
    console.log(canPay)
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

  const invoiceClasses = clsx(["invoice", `${isProductLoading ? "u-loading" : ""}`])

  const _productSection = <ProductDetails />

  const _paymentDetails = (
    <div className="payment-details">
      <div className="promo-section">
        <form action="" className="promo-input">
          {/* FormInput component needs to correctly render label and input with for/id */}
          <FormInput {..._promo} containerClassName="enter-promo" />
          {/* Changed type to "submit" for better form semantics */}
          <button type="submit" className="form_input submit_button">
            Apply Code
          </button>
        </form>
      </div>

      <div className="order-summary-section">
        <h2>Order summary</h2>
        {/* Changed to ul/li for semantic list structure */}
        <ul className="summary-list">
          <li className="summary-list-item">1 item(s)</li>
          <li className="summary-list-item">$100.00</li>
        </ul>
        <ul className="summary-list">
          <li className="summary-list-item">
            <strong>Discount</strong>
          </li>
          <li className="summary-list-item">
            <strong>$10.00</strong>
          </li>
        </ul>
      </div>
      {/* Changed to ul/li for semantic list structure */}
      <ul className="summary-list total-section">
        <li className="summary-list-item">
          <strong>Total</strong>
        </li>
        <li className="summary-list-item">
          <strong>{`${currency} ${total}`}</strong>
        </li>
      </ul>
      {/* Changed to button for better semantic meaning, especially if not directly submitting a form */}
      <button type="button" className="form_input submit_button" onClick={pay} disabled={!canPay}>
        {paymentStatus}
      </button>
    </div>
  )

  const lastEl = responseComponent || _paymentDetails

  return (
    <section className={invoiceClasses}>
      <h1 className="u-text-heading-lg">Invoice</h1>
      {_productSection}
      {lastEl}
    </section>
  )
}
