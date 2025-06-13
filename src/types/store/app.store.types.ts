// src/types/store/app.store.types.ts
import type { TUserSlice } from "./user.slice.types"
import type { TAuthSlice } from "./auth.slice.types"

export interface IAppState extends TAuthSlice, TUserSlice {}
