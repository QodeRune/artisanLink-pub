// src/store/hooks/useProduct.hook.ts
import { useAppStore } from "@/store/app.store"
import type { IAppState, ICouponData, IFetchProductArgs } from "@/types"
import { useCallback } from "react"

export const useProductHook = () => {
  const productData = useAppStore((state: IAppState) => state.productData)
  const fetchProduct = useAppStore((state: IAppState) => state.fetchAndUpdateProduct)
  const getProductData = useAppStore((state: IAppState) => state.getProductData)
  const isProductLoading = useAppStore((state: IAppState) => state.isProductLoading)
  const productError = useAppStore((state: IAppState) => state.productError)
  const applyProductCoupon = useAppStore((state: IAppState) => state.applyProductCoupon)

  const handleApplyProductCoupon = useCallback(
    async (args: ICouponData) => {
      return await applyProductCoupon(args)
    },
    [applyProductCoupon],
  )

  const handleFetchProduct = useCallback(
    async (args: IFetchProductArgs) => {
      return fetchProduct(args)
    },
    [fetchProduct],
  )

  const handleGetProductData = useCallback(() => {
    return getProductData()
  }, [getProductData])

  return {
    getProductData,
    handleFetchProduct,
    handleGetProductData,
    handleApplyProductCoupon,
    productData,
    isProductLoading,
    productError,
  }
}
