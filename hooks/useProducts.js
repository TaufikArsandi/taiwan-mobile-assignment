'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useProductStore } from '@/store/productStore';

export function useProducts() {
  const state = useProductStore(
    useShallow(({ products, status, error, loadProducts, reloadProducts }) => ({
      products,
      status,
      error,
      loadProducts,
      reloadProducts,
    })),
  );
  const { loadProducts } = state;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return state;
}
