// src/types/service/index.ts
export type {
  THttpMethod,
  TResponseType,
  IResponseDTO,
  IRequestConfig,
  IAuthenticatedRequestConfig,
  IApiResponse,
  IApiError,
  IGetRequestArgs,
  IPostRequestArgs,
  IAuthenticatedGetArgs,
  IAuthenticatedPostArgs,
  IComponentFetchResponse,
} from "./api.types"
export type { NestedEnvStructure, MixedEnvStructure } from "./env.types"
export type { IAuthResponseBody } from "./auth.service.types"
export type { IUpdateUserProps } from "./user.service.types"
export type { TPaymentStatus, IFetchProductArgs } from "./product.service.types"
export { KPaymentStatus } from "./product.service.types"
