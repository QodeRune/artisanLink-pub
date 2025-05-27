// src/core/utils/ariaUtils.ts
// Utility to only add aria attributes when they have meaningful values
export const addAriaLabel = (ariaLabel: string | null) => (ariaLabel ? { "aria-label": ariaLabel } : {})

export const addAriaHidden = (ariaHidden: boolean) => (ariaHidden ? { "aria-hidden": true } : {})
