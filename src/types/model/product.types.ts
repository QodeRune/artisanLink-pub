// src/types/model/product.types.ts
import type { IUser } from "./user.model.types"

export interface IProductData {
  product_name: string
  currency: string
  price: string
  stripe_product_id: string
  product_description: string
  id: string
  discount: string
  [key: string]: unknown
}

export interface IProductPaymentResponse {
  access_token: string
  refresh_token: string
  updated_user: IUser
}
