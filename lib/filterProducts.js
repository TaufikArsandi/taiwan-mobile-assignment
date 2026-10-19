/**
 * Case-insensitive substring match on product name.
 * @template {{ name: string }} T
 * @param {ReadonlyArray<T>} products
 * @param {string} query
 * @returns {T[]}
 */
export function filterProducts(products, query) {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return [...products];
  return products.filter((product) => product.name.toLowerCase().includes(keyword));
}
