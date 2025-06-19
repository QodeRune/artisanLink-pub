// src/store/slices/product.slice.tsx
import type { IAppState, ICouponData, IFetchProductArgs, IProductSlice } from "@/types"
import type { StateCreator } from "zustand"
import { applyCoupon, fetchProduct } from "@/services"

export const createProductSlice: StateCreator<IAppState, [], [], IProductSlice> = (set, get) => ({
  productData: null,
  isProductLoading: false,
  productError: null,

  fetchAndUpdateProduct: async (productArgs: IFetchProductArgs) => {
    try {
      set({ isProductLoading: true, productError: null })

      const _productData = await fetchProduct(productArgs)
      if (!_productData) {
        throw new Error("Error fetching product data")
      }

      set({
        isProductLoading: false,
        productError: null,
        productData: _productData,
      })
      return true
    } catch (error) {
      console.error(error)
      set({ isProductLoading: false, productError: error instanceof Error ? error.message : "Unknown error" })
    }
    return false
  },
  getProductData: () => get().productData,
  applyProductCoupon: async (couponData: ICouponData) => {
    const response = await applyCoupon(couponData)
    if (!response) {
      throw new Error("Error applying coupon")
    }
    const { message, coupon_code, ...rest } = response

    const existingProductData = get().productData
    if (!existingProductData) {
      throw new Error("Product data is not loaded yet")
    }

    const _productData = {
      ...existingProductData,
      ...rest,
    }

    set({ productData: _productData })
    return { success: true, feedbackMessage: message }
  },
})
