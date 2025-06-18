// src/store/hooks/useProduct.hook.ts
import { useAppStore } from "@/store/app.store"
import type { IAppState } from "@/types"

export const useProductHook = () => {
  const productData = useAppStore((state: IAppState) => state.productData)
  const fetchProduct = useAppStore((state: IAppState) => state.fetchAndUpdateProduct)
  const getProductData = useAppStore((state: IAppState) => state.getProductData)
  const isProductLoading = useAppStore((state: IAppState) => state.isProductLoading)
  const productError = useAppStore((state: IAppState) => state.productError)

  return {
    productData,
    fetchProduct,
    getProductData,
    isProductLoading,
    productError,
  }
}
