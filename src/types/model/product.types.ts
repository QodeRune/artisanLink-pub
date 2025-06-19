// src/types/model/product.types.ts
import type { IUser } from "./user.model.types"

export interface ICouponResponse {
  price: string
  discount: string
  total_cost: string
  coupon_code: string
  message: string
}

export interface IProductData extends Omit<ICouponResponse, "message"> {
  product_name: string
  currency: string
  stripe_product_id: string
  product_description: string
  id: string
  [key: string]: unknown
}

export interface IProductPaymentResponse {
  access_token: string
  refresh_token: string
  updated_user: IUser
}
