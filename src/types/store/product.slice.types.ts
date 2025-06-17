// src/types/store/product.slice.ts
import type { IProductData } from "../model"
import type { IFetchProductArgs } from "../service"
export interface IProductSlice {
  productData: IProductData | null
  isProductLoading: boolean
  productError: string | null
  getProductData: () => IProductData | null
  fetchAndUpdateProduct: (productArgs: IFetchProductArgs) => Promise<boolean>
}
