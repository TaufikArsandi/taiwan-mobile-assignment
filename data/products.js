/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price  Price in NT$ (integer).
 */

/** @type {ReadonlyArray<Product>} */
export const PRODUCTS = Object.freeze([
  { id: 1, name: '無線藍牙耳機', price: 2999 },
  { id: 2, name: '智慧手錶', price: 8999 },
  { id: 3, name: '便攜式充電器', price: 1299 },
  { id: 4, name: '無線滑鼠', price: 899 },
  { id: 5, name: '機械鍵盤', price: 3999 },
  { id: 6, name: '網路攝影機', price: 2199 },
  { id: 7, name: 'USB隨身碟', price: 599 },
  { id: 8, name: '桌面擴音器', price: 1599 },
]);
