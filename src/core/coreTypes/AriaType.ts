// src/core/coreTypes/AriaType.ts
// Helper type to force explicit ARIA decisions
export type AriaDecision<T extends string> = {
  [K in T]: string | null // null = "I consciously decided this doesn't need ARIA"
}

export interface IStrictAriaProps {
  /**
   * REQUIRED: Provide ARIA label or explicit null
   * - string: Meaningful label for assistive technology
   * - null: "I consciously decided this doesn't need ARIA"
   */
  ariaLabel: string | null
}
