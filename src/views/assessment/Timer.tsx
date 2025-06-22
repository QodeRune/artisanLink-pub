import { type FC, useState, useEffect } from "react"
import type { TimerProps } from "@/types"
import { convertToSeconds } from "@/core/utils"

export const Timer: FC<TimerProps> = ({ initialSeconds, onTimeUp }) => {
  const [seconds, setSeconds] = useState(() => convertToSeconds(initialSeconds))

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp()
      return
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds, onTimeUp])

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return (
    <div className="timer">
      {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
    </div>
  )
}
