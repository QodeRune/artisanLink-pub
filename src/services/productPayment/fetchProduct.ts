// src/services/productPayment/fetchProduct.ts
import { api } from "@/services/api"
import { ProductEndpoints } from "@/services/api"
import { ProductEntities } from "@/services/envManager"
import type { IProductData, IFetchProductArgs, IResponseDTO } from "@/types"

export const fetchProduct = async ({ productName = "CAREER_TAPESTRY_SNAPSHOT" }: IFetchProductArgs) => {
  try {
    const _productName = ProductEntities[productName]
    const productData = await api.authenticatedGet<IResponseDTO<IProductData>>({
      endpoint: `${ProductEndpoints.PRODUCT}?product_name=${_productName}`,
      config: {},
    })

    if (!productData["success"]) {
      throw new Error("error fetching resource")
    }
    const { data } = productData
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
