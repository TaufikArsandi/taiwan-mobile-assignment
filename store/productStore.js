import { create } from 'zustand';
import { fetchProducts } from '@/services/productService';

/** @typedef {'idle' | 'loading' | 'success' | 'error'} LoadStatus */

export const useProductStore = create((set, get) => ({
  /** @type {import('@/data/products').Product[]} */
  products: [],
  /** @type {LoadStatus} */
  status: 'idle',
  /** @type {string | null} */
  error: null,

  loadProducts: async () => {
    const { status } = get();
    if (status === 'loading' || status === 'success') return;

    set({ status: 'loading', error: null });
    try {
      const products = await fetchProducts();
      set({ products, status: 'success' });
    } catch (error) {
      set({ status: 'error', error: error instanceof Error ? error.message : '無法載入商品' });
    }
  },

  /** Forces a fresh load, e.g. from a "retry" button. */
  reloadProducts: async () => {
    set({ status: 'idle' });
    await get().loadProducts();
  },
}));
