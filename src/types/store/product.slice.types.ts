// src/types/store/product.slice.ts
import type { IProductData } from "../model"
import type { IComponentFetchResponse, ICouponData, IFetchProductArgs } from "../service"
export interface IProductSlice {
  productData: IProductData | null
  isProductLoading: boolean
  productError: string | null
  getProductData: () => IProductData | null
  fetchAndUpdateProduct: (productArgs: IFetchProductArgs) => Promise<boolean>
  applyProductCoupon: (applyCouponArgs: ICouponData) => Promise<IComponentFetchResponse>
}
