/**
 * Utility functions for currency formatting, numbers, and data parsing
 */

/**
 * Format a number or string into standard USD currency ($XX.XX)
 * @param {number|string} amount - The numeric value or string with $
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return "$0.00";
  
  // If already formatted like "$50.00", clean it first
  const numeric = typeof amount === "number" 
    ? amount 
    : parseFloat(String(amount).replace(/[^0-9.-]+/g, "")) || 0;
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(numeric);
}

/**
 * Parses any price string (e.g. "$50.00", "50", "$ 1,200.50") into a clean float
 * @param {string|number} price - The raw price value
 * @returns {number} Numeric price value
 */
export function parsePrice(price) {
  if (typeof price === "number") return price;
  if (!price) return 0;
  const cleaned = String(price).replace(/[^0-9.-]+/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

