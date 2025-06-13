// src/store/app.store.ts
import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"
import { createAuthSlice, createUserSlice } from "./slices"
import type { IAppState } from "@/types"

export const useAppStore = create<IAppState>()(
  devtools(
    persist(
      (...args) => {
        return { ...createUserSlice(...args), ...createAuthSlice(...args) }
      },
      {
        name: "app-store",
        partialize: (state) => {
          const { ...rest } = state
          return rest
        },
      },
    ),
  ),
)
