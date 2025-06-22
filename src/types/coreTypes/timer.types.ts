// src/types/coreTypes/timer.types.ts
export interface TimerProps {
  initialSeconds: number | string
  onTimeUp: () => void
}
