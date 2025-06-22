// src/core/utils/sortByLabel.ts
// Helper function to convert Roman numerals to integers
export const romanToInt = (roman: string): number => {
  const romanValues: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }

  let result = 0
  let prevValue = 0

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanValues[roman[i].toUpperCase()]

    if (currentValue >= prevValue) {
      result += currentValue
    } else {
      result -= currentValue
    }

    prevValue = currentValue
  }

  return result
}

// Custom sorting function for labels
export const sortByLabel = (a: { label?: string | number }, b: { label?: string | number }): number => {
  // Handle cases where label is undefined
  if (a.label === undefined) return 1
  if (b.label === undefined) return -1

  // Convert to string to handle both string and number inputs
  const labelA = a.label.toString().trim()
  const labelB = b.label.toString().trim()

  // Check if labels are Roman numerals
  const isRomanA = /^[IVXLCDM]+$/i.test(labelA)
  const isRomanB = /^[IVXLCDM]+$/i.test(labelB)

  if (isRomanA && isRomanB) {
    return romanToInt(labelA) - romanToInt(labelB)
  }

  // Check if labels are purely numeric
  const numA = parseFloat(labelA)
  const numB = parseFloat(labelB)

  if (!isNaN(numA) && !isNaN(numB)) {
    return numA - numB
  }

  // If not numeric or Roman, do alphabetical comparison
  return labelA.localeCompare(labelB, undefined, { numeric: true, sensitivity: "base" })
}
