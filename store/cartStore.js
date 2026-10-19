import { create } from 'zustand';
import { clampQuantity } from '@/lib/quantity';

/**
 * @typedef {import('@/data/products').Product} Product
 * @typedef {{ product: Product, quantity: number }} CartItem
 */

const initialState = {
  /** @type {CartItem[]} */
  items: [],
};

export const useCartStore = create((set) => ({
  ...initialState,

  /** Adds `quantity` units, merging with an existing line for the same product. */
  addItem: (product, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);
      if (!existing) {
        return { items: [...state.items, { product, quantity: clampQuantity(quantity) }] };
      }
      return {
        items: state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
            : item,
        ),
      };
    }),

  /** Sets an absolute quantity, so the user can jump straight to any amount. */
  setQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity: clampQuantity(quantity) } : item,
      ),
    })),

  /** Applies a relative change against the latest state, so rapid clicks all count. */
  changeQuantity: (productId, delta) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: clampQuantity(item.quantity + delta) }
          : item,
      ),
    })),

  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),

  clear: () => set(initialState),
}));

export const selectCartItems = (state) => state.items;

export const selectTotalQuantity = (state) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
