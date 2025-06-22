// src/core/utils/timezone.utils.ts
import { DateTime } from "luxon"
import timezones from "timezones-list"

/**
 * A single timezone option object used for dropdowns or selection inputs.
 */
export interface ITimezoneOption {
  label: string
  value: string
  offset: number // Offset in minutes
  rawOffset: string // Original offset string
}

/**
 * Date formatting styles for displaying dates and times.
 *
 * - DATETIME: Full date and time
 * - DATE_ONLY: Only the date (yyyy-MM-dd)
 * - TIME_ONLY: Only the time (HH:mm:ss)
 * - FULL: Human-friendly full format (e.g., Friday, April 16, 2025 at 3:00 PM)
 * - RELATIVE: Relative time from now (e.g., "3 hours ago")
 * - ISO: ISO 8601 format
 * - CUSTOM: Supply your own format using Luxon tokens
 */
export enum DateFormat {
  DATETIME = "yyyy-MM-dd HH:mm:ss",
  DATE_ONLY = "yyyy-MM-dd",
  TIME_ONLY = "HH:mm:ss",
  FULL = "EEEE, MMMM d, yyyy 'at' h:mm a",
  RELATIVE = "relative",
  ISO = "iso",
  CUSTOM = "custom",
}

/**
 * Various label styles used when displaying timezones in a dropdown.
 *
 * - CLEAN: GMT+1 — Africa/Lagos
 * - STANDARD: GMT+01:00 — Africa/Lagos
 * - CODE_ONLY: Africa/Lagos only
 * - WITH_CITY: Lagos (GMT+1)
 * - DETAILED: Africa/Lagos (GMT+01:00) - Lagos
 */
export enum TimezoneFormat {
  CLEAN = "clean",
  STANDARD = "standard",
  CODE_ONLY = "code",
  WITH_CITY = "with_city",
  DETAILED = "detailed",
}

/**
 * Gets the system's local timezone (e.g., 'Africa/Lagos').
 */
export const localZone = DateTime.local().zoneName

/**
 * Generates a list of timezone options based on the provided label format.
 *
 * @param format The display format for the timezone labels.
 * @returns A list of TimezoneOption objects.
 * @example
 * getTimezoneOptions(TimezoneFormat.WITH_CITY)
 */
export const getTimezoneOptions = (format: TimezoneFormat = TimezoneFormat.CLEAN): ITimezoneOption[] => {
  return timezones.map((tz) => {
    const gmtMatch = tz.label.match(/\(GMT([+-]\d+:\d+)\)/)
    const rawOffset = gmtMatch ? gmtMatch[1] : ""

    const hoursPart = parseInt(rawOffset.slice(0, 3))
    const minutesPart = parseInt(rawOffset.slice(4, 6) || "0")
    const offsetMinutes = hoursPart * 60 + (hoursPart >= 0 ? minutesPart : -minutesPart)

    const cleanOffset = rawOffset.replace(":00", "").replace(/([+-])0(\d)/, "$1$2")

    const cityMatch = tz.tzCode.split("/")
    const city = cityMatch.length > 1 ? cityMatch[cityMatch.length - 1].replace(/_/g, " ") : tz.tzCode

    let label: string
    switch (format) {
      case TimezoneFormat.STANDARD:
        label = `GMT${rawOffset} — ${tz.tzCode}`
        break
      case TimezoneFormat.CODE_ONLY:
        label = tz.tzCode
        break
      case TimezoneFormat.WITH_CITY:
        label = `${city} (GMT${cleanOffset})`
        break
      case TimezoneFormat.DETAILED:
        label = `${tz.tzCode} (GMT${rawOffset}) - ${city}`
        break
      case TimezoneFormat.CLEAN:
      default:
        label = `GMT${cleanOffset} — ${tz.tzCode}`
        break
    }

    return {
      label,
      value: tz.tzCode,
      offset: offsetMinutes,
      rawOffset,
    }
  })
}

/**
 * Default timezone options using the CLEAN format.
 */
export const timezoneOptions = getTimezoneOptions(TimezoneFormat.CLEAN)

/**
 * Format a date or ISO string in a specific timezone.
 *
 * @param isoDate The ISO string or Date object
 * @param timeZone IANA timezone string (e.g., "Africa/Lagos")
 * @param format Format style (see DateFormat)
 * @param customFormat Optional Luxon format string
 * @returns Formatted date string
 * @example
 * formatDateInZone("2025-04-16T12:00:00Z", "Asia/Tokyo")
 */
export const formatDateInZone = (
  isoDate: string | Date,
  timeZone: string = localZone,
  format: DateFormat = DateFormat.DATETIME,
  customFormat?: string,
): string => {
  const dateTime =
    typeof isoDate === "string"
      ? DateTime.fromISO(isoDate).setZone(timeZone)
      : DateTime.fromJSDate(isoDate).setZone(timeZone)

  if (!dateTime.isValid) {
    return "Invalid date"
  }

  switch (format) {
    case DateFormat.DATE_ONLY:
      return dateTime.toFormat("yyyy-MM-dd")
    case DateFormat.TIME_ONLY:
      return dateTime.toFormat("HH:mm:ss")
    case DateFormat.FULL:
      return dateTime.toFormat("EEEE, MMMM d, yyyy 'at' h:mm a")
    case DateFormat.RELATIVE:
      return dateTime.toRelative() || "Unknown time"
    case DateFormat.ISO:
      return dateTime.toISO()
    case DateFormat.CUSTOM:
      return customFormat ? dateTime.toFormat(customFormat) : dateTime.toFormat("yyyy-MM-dd HH:mm:ss")
    case DateFormat.DATETIME:
    default:
      return dateTime.toFormat("yyyy-MM-dd HH:mm:ss")
  }
}

/**
 * Get timezone options sorted by UTC offset.
 */
export const getSortedTimezoneOptions = (format: TimezoneFormat = TimezoneFormat.CLEAN): ITimezoneOption[] => {
  return getTimezoneOptions(format).sort((a, b) => a.offset - b.offset)
}

/**
 * Group timezone options by continent (e.g., Africa, Europe).
 */
export const getGroupedTimezoneOptions = (
  format: TimezoneFormat = TimezoneFormat.CLEAN,
): Record<string, ITimezoneOption[]> => {
  const options = getTimezoneOptions(format)
  const grouped: Record<string, ITimezoneOption[]> = {}

  options.forEach((option) => {
    const parts = option.value.split("/")
    const continent = parts[0] || "Other"
    if (!grouped[continent]) grouped[continent] = []
    grouped[continent].push(option)
  })

  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => a.offset - b.offset)
  })

  return grouped
}

/**
 * Find a timezone option by IANA zone name.
 */
export const findTimezoneOption = (
  zoneName: string,
  format: TimezoneFormat = TimezoneFormat.CLEAN,
): ITimezoneOption | undefined => {
  return getTimezoneOptions(format).find((tz) => tz.value === zoneName)
}

/**
 * Get the current time in a given timezone.
 */
export const getCurrentTimeIn = (
  timeZone: string,
  format: DateFormat = DateFormat.DATETIME,
  customFormat?: string,
): string => {
  return formatDateInZone(new Date(), timeZone, format, customFormat)
}

/**
 * Compute the hour difference between two timezones.
 */
export const getTimezoneDifference = (zone1: string, zone2: string = localZone): number => {
  const now = DateTime.now()
  const time1 = now.setZone(zone1)
  const time2 = now.setZone(zone2)

  if (!time1.isValid || !time2.isValid) {
    return NaN
  }

  const diffMinutes = time1.offset - time2.offset
  return diffMinutes / 60
}

/**
 * Example usage results (used for dev reference, can be removed in prod)
 */
export const localTime = getCurrentTimeIn(localZone, DateFormat.FULL)
export const customFormat = formatDateInZone(new Date(), "America/New_York", DateFormat.CUSTOM, "h:mm a 'on' MMMM d")
export const sortedByOffset = getSortedTimezoneOptions()
export const groupedByContinent = getGroupedTimezoneOptions()
export const hoursDiff = getTimezoneDifference("America/New_York", "Asia/Tokyo")
