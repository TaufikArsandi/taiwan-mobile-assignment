export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 99;

/**
 * Parses user-entered quantity. Returns an integer clamped to the allowed
 * range, `0` when the user explicitly asks for zero (meaning "remove"),
 * or `null` when the input is not a whole number.
 * @param {string | number} value
 * @returns {number | null}
 */
export function parseQuantity(value) {
  const text = String(value).trim();
  if (!/^\d+$/.test(text)) return null;

  const quantity = Number.parseInt(text, 10);
  if (quantity === 0) return 0;
  return Math.min(Math.max(quantity, MIN_QUANTITY), MAX_QUANTITY);
}

export function clampQuantity(quantity) {
  return Math.min(Math.max(Math.trunc(quantity), MIN_QUANTITY), MAX_QUANTITY);
}
