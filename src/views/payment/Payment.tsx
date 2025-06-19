// src/views/payment/Payment.tsx
import { useEffect, type FC } from "react"
import { useProductHook } from "@/store"
import type { IFetchProductArgs } from "@/types"
import { ProductDetails } from "./ProductDetails"
import clsx from "clsx"
import { Outlet } from "react-router-dom"

export const ProductPayment: FC<IFetchProductArgs> = ({ productName = "CAREER_TAPESTRY_SNAPSHOT" }) => {
  const { fetchProduct, isProductLoading } = useProductHook()

  useEffect(() => {
    void fetchProduct({ productName })
  }, [productName])

  const invoiceClasses = clsx("invoice", { "u-loading": isProductLoading })

  return (
    <section className={invoiceClasses}>
      <h1 className="u-text-heading-lg">Invoice</h1>
      <ProductDetails />
      <Outlet />
    </section>
  )
}
