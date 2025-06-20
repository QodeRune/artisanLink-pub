// src/types/store/app.store.types.ts
import type { TUserSlice } from "./user.slice.types"
import type { TAuthSlice } from "./auth.slice.types"
import type { IProductSlice } from "./product.slice.types"
import type {
  IQuestionnaireListSlice,
  IQuestionnaireQuestionsSlice,
  IQuestionnaireResponseSlice,
} from "./questionnaire.slice.types"

export interface IAppState
  extends TAuthSlice,
    TUserSlice,
    IProductSlice,
    IQuestionnaireResponseSlice,
    IQuestionnaireListSlice,
    IQuestionnaireQuestionsSlice {}
