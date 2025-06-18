// src/views/payment/Payment.tsx
import { useEffect, type FC } from "react"
import { FormInput } from "@/components"
import { useProductHook, useUserHook } from "@/store"
import { KPaymentStatus, type IFetchProductArgs, type IPaymentResponse } from "@/types"
import { stripePaymentService } from "@/services"
import { ProductDetails } from "./ProductDetails"
import { PaymentDetails } from "@/views/payment/paymentDetails"
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

  const _paymentDetails = <PaymentDetails />

  const lastEl = responseComponent || _paymentDetails

  return (
    <section className={invoiceClasses}>
      <h1 className="u-text-heading-lg">Invoice</h1>
      {_productSection}
      {lastEl}
    </section>
  )
}
