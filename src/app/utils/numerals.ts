/**
 * Converts standard numbers or strings containing digits (e.g., "01", "04", "01 / 04")
 * into their uppercase Roman numeral equivalent (e.g., "I", "IV", "I / IV").
 * 
 * @param num The string or number to convert.
 * @returns The Roman numeral string.
 */
export function toRomanNumerals(num: string | number): string {
  const numStr = String(num).trim();
  
  // If it's a compound slash expression (like slideshow counters "01 / 04"), convert each part
  if (numStr.includes("/")) {
    return numStr.split("/").map(part => toRomanNumerals(part.trim())).join(" / ");
  }

  // Parse digits
  const val = parseInt(numStr.replace(/[^0-9]/g, ""), 10);
  if (isNaN(val) || val <= 0) return numStr;

  const romanMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";
  let remaining = val;
  for (const { value, symbol } of romanMap) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
}
