import { create } from 'zustand';

/**
 * @typedef {Object} OrderReceipt
 * @property {string} orderId
 * @property {Array<{ productId: number, name: string, price: number, quantity: number }>} lines
 * @property {number} totalQuantity
 * @property {number} totalPrice
 */

export const useOrderStore = create((set) => ({
  /** Most recent successful order, shown in the success dialog until dismissed. */
  /** @type {OrderReceipt | null} */
  lastOrder: null,
  setLastOrder: (order) => set({ lastOrder: order }),
  dismissLastOrder: () => set({ lastOrder: null }),
}));
