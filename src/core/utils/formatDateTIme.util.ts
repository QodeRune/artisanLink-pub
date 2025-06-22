import { Duration } from "luxon"

// DurationFormat definition (resolves erasableSyntaxOnly issue)
export const DurationFormat = {
  LONG: "long", // e.g., "1 hour 30 minutes"
  SHORT: "short", // e.g., "1hr 30min"
  COLON: "colon", // e.g., "1:30"
  COMPACT: "compact", // e.g., "1h 30m"
} as const

type DurationFormat = (typeof DurationFormat)[keyof typeof DurationFormat]

// Parse colon format (HH:MM:SS or MM:SS)
export function parseColonFormat(timeString: string): number {
  const parts = timeString
    .trim()
    .split(":")
    .map((part) => parseInt(part, 10))
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  if (parts.length === 1 && !isNaN(parts[0])) return parts[0]
  return 0
}

// Parse unit format (e.g., "2h 30m 15s")
export function parseUnitFormat(timeString: string): number {
  let totalSeconds = 0
  const hourMatch = timeString.match(/(\d+)\s*(?:h|hr|hrs|hour|hours)/i)
  if (hourMatch) totalSeconds += parseInt(hourMatch[1], 10) * 3600
  const minuteMatch = timeString.match(/(\d+)\s*(?:m|min|mins|minute|minutes)/i)
  if (minuteMatch) totalSeconds += parseInt(minuteMatch[1], 10) * 60
  const secondMatch = timeString.match(/(\d+)\s*(?:s|sec|secs|second|seconds)/i)
  if (secondMatch) totalSeconds += parseInt(secondMatch[1], 10)
  return totalSeconds
}

// Check if string is colon format
export function isColonFormat(timeString: string): boolean {
  return /^\d+:(?:\d+)(?::\d+)?$/.test(timeString.trim())
}

// Check if string is unit format
export function isUnitFormat(timeString: string): boolean {
  return /(?:h|hr|hrs|hour|hours|m|min|mins|minute|minutes|s|sec|secs|second|seconds)/i.test(timeString)
}

// Check if string is ISO 8601 duration
export function isISODuration(timeString: string): boolean {
  return /^P(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+S)?)?$/.test(timeString.trim())
}

// Convert any supported time format to seconds
export function convertToSeconds(timeInput: string | number): number {
  if (typeof timeInput === "number") return timeInput

  const trimmedInput = timeInput.trim()
  const directNumber = Number(trimmedInput)
  if (!isNaN(directNumber)) return directNumber

  if (isISODuration(trimmedInput)) {
    const duration = Duration.fromISO(trimmedInput)
    return duration.isValid ? duration.as("seconds") : 0
  }

  if (isColonFormat(trimmedInput)) return parseColonFormat(trimmedInput)
  if (isUnitFormat(trimmedInput)) return parseUnitFormat(trimmedInput)

  return 0
}

// Format ISO 8601 duration
export function formatDuration(isoDuration: string, format: DurationFormat = DurationFormat.SHORT): string {
  const duration = Duration.fromISO(isoDuration)
  if (!duration.isValid) return "Invalid duration"

  const hours = Math.floor(duration.as("hours"))
  const minutes = Math.floor(duration.as("minutes") % 60)

  switch (format) {
    case DurationFormat.LONG:
      const parts: string[] = []
      if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`)
      if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`)
      return parts.length > 0 ? parts.join(" ") : "0 minutes"

    case DurationFormat.SHORT:
      const shortParts: string[] = []
      if (hours > 0) shortParts.push(`${hours}hr`)
      if (minutes > 0) shortParts.push(`${minutes}min`)
      return shortParts.length > 0 ? shortParts.join(" ") : "0min"

    case DurationFormat.COLON:
      return `${hours}:${minutes.toString().padStart(2, "0")}`

    case DurationFormat.COMPACT:
      const compactParts: string[] = []
      if (hours > 0) compactParts.push(`${hours}h`)
      if (minutes > 0) compactParts.push(`${minutes}m`)
      return compactParts.length > 0 ? compactParts.join(" ") : "0m"

    default:
      return duration.toHuman()
  }
}
